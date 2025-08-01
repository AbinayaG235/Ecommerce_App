import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { User, ASYNC_STORAGE_KEYS, RootStackParamList } from '../redux/types';

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

const RegisterScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const navigation = useNavigation<RegisterScreenNavigationProp>();



  const handleRegister = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }

    try {
      const storedUsersJson = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.USERS);
      //console.log(storedUsersJson)
      
      let registeredUsers: User[] = [];
      if (storedUsersJson) {
        registeredUsers = JSON.parse(storedUsersJson);
        //console.log(registeredUsers)
      }

      if (registeredUsers.some((user) => user.email === email)) {
        Alert.alert('Registration Failed', 'Email already registered. Please login or use another email.');
        return;
      }
      
      const newUser: User = { email, password };
      registeredUsers.push(newUser);

      await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.USERS, JSON.stringify(registeredUsers));
      


      Alert.alert('Registration Success', 'Account created successfully! Please log in.');

      // navigation.dispatch(
      //   CommonActions.reset({
      //     index: 0,
      //     routes: [{ name: 'Login' }],
      //   })
      // );
      navigation.replace('Login');
    } catch (e) {
      console.error('Registration Error:', e);
      Alert.alert('Something went wrong during registration. Please try again.');
    }
  };



  //==========

//   const retrieveData = async () => {
//   try{
//     const value = await AsyncStorage.getItem('test@exam.com');
//     if(value){
//       console.log(value)
//     }
//   }
//   catch(e){
//     console.log(e)
//   }
// }
// retrieveData();
  //========
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create New Account</Text>

      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Login')}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: '100%',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#666',
    fontSize: 16,
    marginTop: 30,
  },
  loginLink: {
    color: '#3377ffff',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;