import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { Text, View, Alert, StyleSheet } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import  { Component } from 'react';
import GetLocation from 'react-native-get-location';

export default class QrCodeGenerator extends Component {
    constructor()
        {
            super();
            this.state={
                num: ''
            };
        }
    render()
    { 
    let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
        return (
        <View>
            <Button 
                style={styles.ButtonStyle}
                mode="contained" 
                onPress={() => 
                    GetLocation.getCurrentPosition({
                        enableHighAccuracy: true,
                        timeout: 15000,
                    })
                    .then(location => {
                        console.log(location);
                    })
                    .catch(error => {
                        const { code, message } = error;
                        console.warn(code, message);
                    })}>
                   Realtime Generated Qr Code
                </Button>
            <TextInput
                style={styles.TextStyle}
                label="Type Asset ID"
                defaultValue={this.state.value}
                onChangeText= {num=>this.setState({num})}
                />
            {/* <View style={styles.ViewText}>
                <Text style={styles.TextStyle}> {this.state.num}</Text>
            </View> */}

           <View style={styles.QrView}> 
           {this.state.num ?
           <QRCode
                value={this.state.num}
                logo={{uri: base64Logo}}
                logoSize={30}
                logoBackgroundColor='transparent'
                /> 
                : 
                null}

            
            </View>
    </View>
        );
  }
}

const styles = StyleSheet.create({
    ButtonStyle:{
        marginHorizontal:45,
        marginVertical:25,
        width:'70%',
        backgroundColor:'#172082'
    },
    TextStyle:{
        marginTop:10,
        width:'95%',
        marginHorizontal:10
    },
    ViewText:{
        margin:10,
        width:'95%',
        backgroundColor:'#c5c6c9',
        height:150,
        paddingTop:0
    },
    QrView:{
        alignItems:'center',
        marginTop:30
    },
  });
  
 
