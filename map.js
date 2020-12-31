import React, { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import MapView, {Marker, PROVIDER_GOOGLE } from 'react-native-maps'; 
import Geolocation from '@react-native-community/geolocation';

const map = () => {
  const [latitudeInfo, setLatitudeInfo]=useState(0)
  const [longitudeInfo, setLongitudeInfo]=useState(0)
  Geolocation.getCurrentPosition(data=>{
    setLatitudeInfo(data.coords.latitude),
    setLongitudeInfo(data.coords.longitude)
  })
  var markers=[
 {   latitude: latitudeInfo,
    longitude: longitudeInfo,
    title: 'Current Location'
}];
  return (
    
    <View style={styles.container}>
     
      <MapView
      provider={PROVIDER_GOOGLE} 
      style={styles.map}
      region={{
        latitude: Number(latitudeInfo),
        longitude: Number(longitudeInfo),
        latitudeDelta: 0.0040,
        longitudeDelta: 0.0090,
      }}
    >
      <MapView.Marker
            coordinate={{latitude: Number(latitudeInfo) ,
            longitude:  Number(longitudeInfo)}}
            title={"title"}
            description={"description"}          
        />
    </MapView>

      <Text style={{fontSize:12, marginTop:580,}}>  Latitude: {latitudeInfo} </Text>
      <Text style={{fontSize:12, marginTop:10}}>  Longitude: {longitudeInfo} </Text>
  </View>
  
  );
};

export default map;
const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: '100%',
      
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },

   });

