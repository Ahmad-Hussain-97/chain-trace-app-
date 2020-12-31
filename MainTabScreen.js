import React, { Component } from 'react';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';

import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Feather from 'react-native-vector-icons/Feather';
import Icons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';
import ScannerScreen from './ScannerScreen';
import map from './map'; //support stack ke ander map ka data dala hua hai
import QrCodeGenerator from './QrCodeGenerator'; //profile stack ke ander qr code generator ka data dala ha 

const Tab = createMaterialBottomTabNavigator();
const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const ScanStack = createStackNavigator();

export default class MainTabScreen extends Component {
  
  render() {


  return (
    <Tab.Navigator initialRouteName="Home" activeColor="white">
    
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#172082',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Generate QR"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Generate QR',
          tabBarColor: '#172082',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="qrcode-scan" color={color} size={24} />
          ),
        }}
      />
     <Tab.Screen
        name="Scan"
        component={ScanStackScreen}
        options={{
          tabBarLabel: 'Scan',
          tabBarColor: '#172082',
          tabBarIcon: ({color}) => (
            <Icons name="scan-outline" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Support"
        component={SupportStackScreen}
        options={{
          tabBarLabel: 'Location',
          tabBarColor: '#172082',
          tabBarIcon: ({color}) => (
            <Feather name="map-pin" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  )
      }
    }



const HomeStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#172082'},
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontStyle: 'italic',
        },
      }}>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Home',
          headerTitleAlign: 'center',
        }}
      />
    </HomeStack.Navigator>
  );
};

const SupportStackScreen = ({navigation}) => {
  return (
    <DetailStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#172082'},
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontStyle: 'italic',
        },
      }}>
      <DetailStack.Screen
        name="Support"
        component={map}
        options={{
          title: 'Location',
          headerTitleAlign: 'center',
        }}
      />
    </DetailStack.Navigator>
  );
};
const ProfileStackScreen = ({navigation}) => {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#172082'},
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontStyle: 'italic',
        },
      }}>
      <ProfileStack.Screen
        name="Generate QR Code"
        component={QrCodeGenerator}
        options={{
          title: 'Generate QR',
          headerTitleAlign: 'center',
        }}
      />
    </ProfileStack.Navigator>
  );
};
const ScanStackScreen = ({navigation}) => {
  return (
    <ScanStack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#172082'},
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontStyle: 'italic',
        },
      }}>
      <ScanStack.Screen
        name="Scan"
        component={ScannerScreen}
        options={{
          title: 'Scanner',
          headerTitleAlign: 'center',
        }}
      />
    </ScanStack.Navigator>
  );
}
