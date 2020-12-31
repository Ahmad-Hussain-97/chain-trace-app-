import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {  Button,  Icon } from 'native-base';
import Clipboard from '@react-native-community/clipboard';

var KEY_GENERATED = false;

const SignInScreen = ({navigation}) => {
  const [buttonstate, setbuttonstate] = useState("");
  const [dom, setdom] = useState(false);

  const [data, setData] = React.useState({
    username: '',
    username_check_textInputChange: false,
  });

  const username_textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        username: val,
        username_check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        username_check_textInputChange: false,
      });
    }
  };
  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      <View style={styles.header}>
      <Button transparent 
          style={{marginBottom:80, marginLeft:300,}}
          onPress={()=>{setdom(true)}}>
            <Icon name='information-circle-outline' style={{color:'#fff'}} />
          </Button>
          <Modal 
              transparent={true}
              visible={dom}>
                 <View style={{backgroundColor:'#000000aa', flex:1}}>
                     <View style={{backgroundColor:'#ffffff', margin:50, marginVertical:170, padding:40, borderRadius:10, flex:2}}>
                      <Text  style={{backgroundColor:'#fff' ,fontWeight:'bold', fontSize:28, marginBottom:10}}>Instructions</Text>
                     <Text style={{backgroundColor:'#fff' ,fontWeight:'bold', fontSize:18}}>
                          After your registration, you will be designated with a key pair (Public & Private). 
                          The private key is never shared; it is kept secret and is used only by its owner.
                          Your User Name and Private key will be required, every time you want to login to the system. 
                    </Text>
                    <Button rounded danger 
                        style={{}}
                        onPress={() => {setdom(false)}}
                        style={{marginTop:40}}>
                          <Icon name='arrow-back' style={{color:'#fff'}}/>
                    </Button>
              </View>
           </View>
        </Modal>
        <Text style={styles.text_header}>Register Yourself..!</Text>
      </View>
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <ScrollView>
          <Text style={styles.text_footer}>User Name</Text>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#05375a" size={22} />
            <TextInput
              placeholder="Type Your User Name"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val)=> {setbuttonstate({val}), username_textInputChange(val)}}
            />
            {data.username_check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
        
          <Text style={{marginVertical:2, backgroundColor:'#fff', padding:8 ,fontWeight:'bold'}}>
              By clicking the Generate key Pair, a unique keypair will be generated for you!
          </Text>
          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn}>
              <LinearGradient
                colors={['#1546e8', '#20b5e3']}
                style={styles.signIn}>
                <Text style={[styles.textSign, {color: '#fff'}]}
                onPress={()=>{ 
                  fetch('http://192.168.1.138:3000/call/', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      fn: "keypairgenerate",
                     args: {'acc': buttonstate.val , 'dom':'pindi'},
                      tok: "a85c29bf1f3e07f8d2d81027bd20887d"

                    }),

                  }).then(res => res.json())                  
                  .then((res)=> {
                    if (!res.key) {
                      Alert.alert('Sorry','An error occured while generating your keys.',[{text:'Okay!'}]);
                      return;
                    }
                    Alert.alert('Congratulations!','Successfully generated the key pair.',[{text:'Okay!'}])
                    Clipboard.setString(res.key);
                    Alert.alert('Save the key!','Your private key has been copied to clipboard. Save it in multiple places. This is the ONLY TIME you will get your key!',[{text:'Okay!'}]);
                    KEY_GENERATED = true;//check sahi lgao , directory me se check kr ke btana chaheya
                  });
                }}>Generate Key Pair</Text>
                </LinearGradient>
              </TouchableOpacity>
              
          <Text style={{marginVertical:2, backgroundColor:'#fff', padding:8 ,fontWeight:'bold'}}>
              By clicking the Sign Up, your account will be register in the Ledger!
          </Text>
              <TouchableOpacity style={styles.signIn}>
              <LinearGradient
                colors={['#1546e8', '#20b5e3']}
                style={styles.signIn}>
                <Text style={[styles.textSign, {color: '#fff'}]}
                onPress={()=>{
                  if (!KEY_GENERATED) {
                    Alert.alert("Generated keys", "Please generated account keys first!", [{text:'Okay!'}]);
                    return;
                  }
                  fetch('http://192.168.1.138:3000/call/', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      fn: "createAccount",
                     args: {'acc':buttonstate.val, 'dom':'pindi'},
                      tok: "a85c29bf1f3e07f8d2d81027bd20887d"
                    }),

                  }).then((response)=> {
                    if(response.status==200) {
                      Alert.alert("Account created", "Congratulations! Your account has been created.", [{text:'Okay!'}]);
                    }
                  //  alert(JSON.stringify(response))
                  });
                  
                }}>Sign Up</Text>
              </LinearGradient>
            </TouchableOpacity>
            <Text style={{marginVertical:2, backgroundColor:'#fff', padding:4 ,fontWeight:'bold'}}>
            <Icon name='warning' style={{fontSize:20}}/>
              Please read the instructions, by clicking the information button above. 
          </Text>
            <Button rounded danger 
                style={{}}
                 onPress={() => navigation.navigate('SignInScreen')}
                 style={{marginTop:10}}>
                <Icon name='arrow-back' style={{color:'#fff'}}/>
            </Button>
          </View>
        </ScrollView>
      </Animatable.View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1546e8',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 36,
    paddingBottom:30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 20,
    fontWeight:'bold',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    fontSize:16,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
  },
  signIn: {
    width: '95%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical:10,
  },
  textSign: {
    fontSize: 20,
    fontWeight: 'bold',

  },
});
