import React from 'react';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';

import HomeScreen from '../screens/HomeScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { HomeStackParamList } from '../redux/types';

const Stack = createStackNavigator<HomeStackParamList>();

const HomeStackNavigator = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();

  // const cartItemCount = useSelector((state: RootState) =>
  //   state.cart.items.reduce((total, item) => total + item.quantity, 0)
  // );

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#fff',
          elevation: 1,
          shadowOpacity: 0.1,
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{
          title: 'Click & Collect',

          headerRight: () => (
            <View style={styles.headerRightContainer}>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate('Search')}
                style={{ marginRight: 20 }}
              >
                <Icon name="search" size={24} color="#000" />
              </TouchableOpacity> */}
              
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
              >
                <Icon name="user" size={24} color="#000" /> 
              </TouchableOpacity>
            </View>
          ),
        }}
      />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Details' }} />
      <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Your Cart' }} />
      <Stack.Screen name="Search" component={SearchScreen} options={{ title: 'Search' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
    </Stack.Navigator>
  );
};



const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
    marginRight: 15,
  },
  // cartBadge: {
  //   position: 'absolute',
  //   right: -6,
  //   top: -3, 
  //   backgroundColor: 'red',
  //   borderRadius: 9,
  //   width: 18,
  //   height: 18,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // cartBadgeText: {
  //   color: 'white',
  //   fontSize: 10,
  //   fontWeight: 'bold',
  // },
});

export default HomeStackNavigator;
