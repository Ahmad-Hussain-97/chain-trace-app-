import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import ScannerScreen from './ScannerScreen';
import MainTabScreen from './MainTabScreen';
import map from './map';
import QrCodeGenerator from './QrCodeGenerator';
const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="none">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <RootStack.Screen name="map" component={map}/>
    <RootStack.Screen name="QrCodeGenerator" component={QrCodeGenerator}/>
    <RootStack.Screen name="ScannerScreen" component={ScannerScreen} />
    <RootStack.Screen name="MainTabScreen" component={MainTabScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
