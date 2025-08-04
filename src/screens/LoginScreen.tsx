import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { User, ASYNC_STORAGE_KEYS, RootStackParamList } from '../redux/types';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Auth'>;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    
    if (!email || !password) {
      Alert.alert('Login Failed', 'Please enter email and password.');
      return;
    }

    try {
      const storedUsersJson = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.USERS);
      let registeredUsers: User[] = [];
      
      if (storedUsersJson) {
        registeredUsers = JSON.parse(storedUsersJson);
      }
      
      const user = registeredUsers.find(
        u => u.email === email && u.password === password
      );

      
      if (user) {
        await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.USER_TOKEN, 'dummy_Tokken');
        Alert.alert('Login Success', `Welcome back, ${user.email}!`);
        navigation.replace('MainApp');
      } else {
        
        Alert.alert('Login Failed', 'Invalid email or password.');
      }
    } catch (e) {
      
      console.error('Login Error:', e);
      Alert.alert('Login Error', 'Something went wrong during login. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome Back!</Text>

      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          testID="emailInput"
        />
      </View>

      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#666" style={styles.inputIcon} />
        {/* <TextInput>hd</TextInput> */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          testID="passwordInput"
        />
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} testID="forgotPasswordLink">
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} testID='loginButton'>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.replace('Register')} testID="registerLink">
        <Text style={styles.signupText}>
          Create An Account <Text style={styles.signupLink}>Sign Up</Text>
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
    padding:5,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  forgotPassword: {
    color: '#746b6aff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#3377ffff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orText: {
    marginVertical: 30,
    color: '#999',
    fontSize: 16,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    marginBottom: 30,
    width: '80%',
    justifyContent: 'space-around',
  },
  socialButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  signupText: {
    color: '#666',
    fontSize: 16,
  },
  signupLink: {
    color: '#007bff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
// learn