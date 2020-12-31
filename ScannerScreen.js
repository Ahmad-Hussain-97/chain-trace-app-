 import React,{Component} from 'react';
 import QRCodeScanner from 'react-native-qrcode-scanner';
 
 import {
   View,
   TouchableOpacity,
   Linking,
   Modal,
   Alert,
   StyleSheet,
 } from 'react-native';
 
import { Container, Header, Content, Button, ListItem, Text, Icon } from 'native-base';
 import { TextInput, List } from 'react-native-paper';
 
   //const ScannerScreen = () => {
   //    ifScaned = e => {
   //      Linking.openURL(e.data).catch((err) =>
   //        Alert.alert('Result: ', e.data));
    //    };
   //return (
    //  <QRCodeScanner
    //    containerStyle={{backgroundColor: '#fff', marginBottom: '35%'}}
    //    onRead={this.ifScaned}
    //    reactivate={true}
    //    permissionDialogMessage="need permission to access camera"
    //    reactivateTimeout={10}
   
    //    bottomContent={
    //      <TouchableOpacity>
    //        <Text style={{fontSize: 21, color:'rgb(0,122,255)', paddingBottom:20}}>
    //          Scan QR code
    //        </Text>
    //      </TouchableOpacity>
    //    }
    //  />
 //  );  
// }; 

 export default class ScannerScreen extends Component {

    state={
      qr:"",
      getAssetTrack:false,
      ASforgetTrack:"",
      ACforgetTrack:""
    }

    onRead = e =>{
     this.setState({qr: e.data})
    }
 
  render()
  { 
    return (
      <View>
       <QRCodeScanner style={styles.container}
            onRead={this.onRead }
            showMarker={true}
            reactivate={true}
            markerStyle={{borderColor: '#fff', borderRadius: 10}}
            bottomContent={ 
              <TouchableOpacity style={{marginTop:50}} >
                  <Text style={{fontSize: 21, color:'rgb(0,122,255)', paddingBottom:20}}>Scan Qr Code!</Text>
              </TouchableOpacity>
            }
         />
          <Button rounded success
            style={{ marginLeft:110,marginTop: 500, backgroundColor: '#172082' }}
            onPress={() => {
              const p="";
              fetch('http://192.168.1.138:3000/call/', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  fn: "getHistory",
                  args: { 'asset_id': this.state.qr },
                  tok: "a85c29bf1f3e07f8d2d81027bd20887d"

                }),

              })
                .then(res => res.json())
                .then((res) => {
                var body=JSON.parse(res.result)
                if(body.length==0)
                {
                  Alert.alert(" Asset History", "This asset has no records.", [{ text: 'Okay' }])
                }
                else{
                  var hist="";
                  for(id in body)
                  {
                    hist += ""+new Date(body[id][2]*1000)+" : "+body[id][0]+" , "+body[id][1]+" \n";
                  }
                  Alert.alert("Asset History", hist, [{ text: 'Okay' }])
                }});
             
              }}>
            <Text style={{fontWeight:'bold'}}>Get Product Track</Text>
          </Button>
          {/* <Button rounded success
            style={{marginLeft:315, marginTop: 55, backgroundColor: '#172082' }}
            onPress={() => {this.setState.qr=""}}>
              <Icon name="refresh-outline"></Icon>
          </Button> */}
        

      </View>
    );
  }
}

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
   header:{
     flex:2,
   },
   footer:{
     flex:1,
   },
 });
 
 var parseOutput = (out, delimeters) => {
  var lines = out.split('\n');
  var results = [];
  lines.forEach((line) => {
    delimeters.forEach((delim) => {
      if (line.includes(delim)) {
        results.push(line.split(delim)[1]);
      }
    })
  })
  return results;
}