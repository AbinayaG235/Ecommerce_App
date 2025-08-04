import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, View, StyleSheet, Text } from 'react-native';

import OnboardingScreen from '../screens/OnboardingScreen';
import AuthNavigator from './AuthNavigator';
import BottomTabNavigator from './BottomTabNavigator';
import { ASYNC_STORAGE_KEYS } from '../redux/types';



const Stack = createStackNavigator();

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

    const checkAppStatus = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.ONBOARDING_COMPLETE);
        const userToken = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.USER_TOKEN);
      
        if (onboardingStatus !== 'true') {
          setInitialRoute('Onboarding'); 
        } else if (userToken) {
          setInitialRoute('MainApp');  
        } else {
          setInitialRoute('Auth');       
        }
      } catch (e) {
        console.error('Failed to load app status from storage', e);
        setInitialRoute('Auth'); 
      } finally {
        setIsLoading(false); 
      }
    };

    checkAppStatus();
  //}, []);

  if (isLoading || initialRoute === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading app...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Auth" component={AuthNavigator} />
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default AppNavigator;









































/* Original

import React, {useState, useEffect, } from 'react';
import {ActivityIndicator, View, StyleSheet, Text} from 'react-native';
//import {AsyncStorage} from '@react-native-async-storage/async-storage'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnboardingScreen from '../screens/OnboardingScreen'; 
import BottomTabNavigator from './BottomTabNavigator'; 

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

*/
