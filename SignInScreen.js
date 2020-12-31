import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
  Modal,
  StyleSheet,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {  Button,  Icon } from 'native-base';

const SignInScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    check_textInputChange: false,
    check_privInputChange: false
  });


  const [UserName, setUserName] = useState("");
  const [PrivateKey, setPrivateKey] = useState("");
  const [validInputdatastate, setvalidInputdatastate] = useState(false);
    const [dom, setdom] = useState(false);

  const textInputChange = (val) => {
    setUserName(val)
    if (val.length !== 0) {
      setData({
        ...data,
        name: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        check_textInputChange: false,
      });
    }
  };

  
  const privInputChange = (val) => {
    setPrivateKey(val)
    if (val.length !== 0) {
      setData({
        ...data,
        name: val,
        check_privInputChange: true,
      });
    } else {
      setData({
        ...data,
        name: val,
        check_privInputChange: false,
      });
    }
  };
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <Button transparent 
          style={{marginBottom:80, marginLeft:300,}}
          onPress={()=>{setdom(true)}}>
            <Icon name='information-circle-outline' style={{color:'#fff'}} />
          </Button>
        <Text style={styles.text_header}>Greetings!</Text>
      </View>
    
          <Modal 
              transparent={true}
              visible={dom}>
                 <View style={{backgroundColor:'#000000aa', flex:1}}>
                     <View style={{backgroundColor:'#ffffff', margin:50, marginVertical:170, padding:40, borderRadius:10, flex:2}}>
                      <Text  style={{backgroundColor:'#fff' ,fontWeight:'bold', fontSize:28, marginBottom:10}}>Instructions</Text>
                     <Text style={{backgroundColor:'#fff' ,fontWeight:'bold', fontSize:18}}>
                          Do append user name with @pindi.
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
      <Animatable.View animation="fadeInUpBig" style={styles.footer}>
        <Text style={[styles.text_footer, {marginTop: 30}]}>User Name</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#1546e8" size={20} />
          <TextInput
            placeholder="Type User Name"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => {textInputChange(val)}}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>

        <Text style={[styles.text_footer, {marginTop: 30}]}>Private Key</Text>
        <View style={styles.action}>
          <FontAwesome name="key" color="#1546e8" size={20} />
          <TextInput
            placeholder="Enter Private Key"
            placeholderTextColor="#666666"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => {privInputChange(val)}}
          />
          {data.check_privInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>


        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              if(UserName=="")
              {
                Alert.alert("Error", "Please Type the User Name!", [{text:'Okay!'}]);
              }
              else if(!UserName.includes("@"))
              {
                {
                  Alert.alert("Error", "Please add the @ symbol. Click on the above info button", [{text:'Okay!'}]);
                }
              }
              else if(PrivateKey=="")
              {
                Alert.alert("Error", "Please Type the private key!", [{text:'Okay!'}]);
              }
              console.log("sign IN pressed!");
              fetch('http://192.168.1.138:3000/call/', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  fn: "checkCredentials",
                 args: {'sun':UserName, 'skey':PrivateKey},
                  tok: "a85c29bf1f3e07f8d2d81027bd20887d"
                }),

              }).then(res => res.json())
              .then((res)=> {
                if (res.msg != "Valid") {
                  Alert.alert("Error", "Sorry! You have typed the wrong credentials!", [{text:'Okay!'}]);
                  return;
                }
                else if(res.msg =="Valid")

                {
                  fetch('http://192.168.1.138:3000/call/', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      fn: "getAccountAccess",
                      args: {'aid':UserName},
                      tok: "a85c29bf1f3e07f8d2d81027bd20887d"
                    }),
                  }).then(res2 => res2.json())
                  .then((res2)=> {
                    process.env.ACCOUNT_ACCESS = res2.result
                    console.log(res2.result);
                    navigation.navigate('MainTabScreen');
                  });
                }
              });
            }}
            style={styles.signIn}>
            <LinearGradient
              colors={['#1546e8', '#20b5e3']}
              style={styles.signIn}>
              <Text style={[styles.textSign, {color: '#fff'}]}>Sign In</Text>
            </LinearGradient>
          </TouchableOpacity>
            
          {/* <Text style={{marginVertical:2, backgroundColor:'#fff', padding:8 ,fontWeight:'normal'}}>
              If you don't have an existing account, you can create a new account by clicking the below button.
          </Text> */}
          <TouchableOpacity
            onPress={() => navigation.navigate('SignUpScreen')}
            style={[
              styles.signIn,
              {borderColor: '#1546e8', borderWidth: 1, marginTop: 10},
            ]}>
            <Text
              style={
                ([styles.textSign],
                {color: '#1546e8', fontWeight: 'bold', fontSize: 17})
              }>
              Create New Account
            </Text>
          </TouchableOpacity>
        </View>
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
    paddingBottom: 70,
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
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
  button: {
    alignItems: 'center',
    marginTop: 25,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical:20,
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
