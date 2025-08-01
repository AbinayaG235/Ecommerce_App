import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeStackNavigator from './HomeStackNavigator';
import CartScreen from '../screens/CartScreen';
import SearchScreen from '../screens/SearchScreen';
import ProfileScreen from '../screens/ProfileScreen';

import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import { BottomTabParamList } from '../redux/types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;
          let showBadge = false;
          let badgeCount = 0;

          const cartItemCount = useSelector((state: RootState) =>
            state.cart.items.reduce((total, item) => total + item.quantity, 0)
          );

          if (route.name === 'HomeTab') {
            iconName = 'home';
          } else if (route.name === 'CartTab') {
            iconName = 'shopping-cart';
            showBadge = cartItemCount > 0;
            badgeCount = cartItemCount;
          } else if (route.name === 'SearchTab') {
            iconName = 'search';
          } else if (route.name === 'ProfileTab') {
            iconName = 'user';
          } else {
            iconName = 'circle';
          }

          return (
            <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
              <Icon name={iconName} size={size} color={color} />
              {showBadge && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{badgeCount}</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: '#007bff',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 1,
          borderTopColor: '#eee',
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="CartTab"
        component={CartScreen}
        options={{ title: 'Cart' }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{ title: 'Search' }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  cartBadge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default BottomTabNavigator;