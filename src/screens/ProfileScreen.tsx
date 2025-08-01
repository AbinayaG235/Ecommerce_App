import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_STORAGE_KEYS, RootStackParamList } from '../redux/types';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { logout } from '../redux/actions/authActions';

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MainApp'>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('abi@gmail.com');
  const [pincode, setPincode] = useState('450116');
  const [address, setAddress] = useState('23A, Mill Street');
  const [city, setCity] = useState('Pollachi');
  const [state, setState] = useState('Tamil Nadu');
  const [country, setCountry] = useState('India');
  const [avatarUri, setAvatarUri] = useState<string | null>(null);

 

  const handleSaveDetails = () => {
    Alert.alert('Saved!', 'Your details have been saved');
  };

  const handleLogout = async () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Log Out',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.USER_TOKEN);
              dispatch(logout());
              Alert.alert('Logged Out', 'You have been successfully logged out.');

              navigation.dispatch(
                CommonActions.reset({
                  index: 0,
                  routes: [{ name: 'Auth' }],
                })
              );
            } catch (e) {
              console.error('Failed to log out:', e);
              Alert.alert('Logout Error', 'Could not log out. Please try again.');
            }
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatarImage} />
          ) : (
            <Icon name="user-circle" size={80} color="#ccc" />
          )}
          
        </View>
        <Text style={styles.profileName}>Hello!</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Details</Text>
        <Text style={styles.label}>Email Address</Text>
        <TextInput
          style={styles.input}
          value={email}
          keyboardType="email-address"
          editable={true} 
          onChangeText={setEmail} 
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Address Details</Text>
        <Text style={styles.label}>Pincode</Text>
        <TextInput
          style={styles.input}
          value={pincode}
          keyboardType="numeric"
          editable={true} 
          onChangeText={setPincode} 
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          value={address}
          multiline={true}
          editable={true} 
          onChangeText={setAddress}
        />

        <Text style={styles.label}>City</Text>
        <TextInput
          style={styles.input}
          value={city}
          editable={true} 
          onChangeText={setCity} 
        />

        <Text style={styles.label}>State/Postal Code</Text>
        <TextInput
          style={styles.input}
          value={state}
          editable={true} 
          onChangeText={setState} 
        />

        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          value={country}
          editable={true}
          onChangeText={setCountry}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveDetails}>
        <Text style={styles.saveButtonText}>Save Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#007bff',
    backgroundColor: '#eee',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007bff',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
  linkText: {
    color: '#007bff',
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;