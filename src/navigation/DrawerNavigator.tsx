import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import BottomTabNavigator from './BottomTabNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import CartScreen from '../screens/CartScreen';
import SearchScreen from '../screens/SearchScreen';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: any) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Icon name="user-circle" size={50} color="#666" style={styles.drawerAvatar} />
        <Text style={styles.drawerHeaderText}>Hello, User!</Text>
      </View>
      <DrawerItemList {...props} />

      <TouchableOpacity
        style={styles.drawerItem}
        onPress={() => {
          console.log('Settings Pressed - Placeholder');
          props.navigation.closeDrawer();
        }}
      >
        <Icon name="cog" size={20} color="#333" style={styles.drawerIcon} />
        <Text style={styles.drawerItemText}>Settings</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="MainTabs"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="MainTabs" component={BottomTabNavigator} options={{ title: 'Home' }} />
      {/* You can add specific screens here that are ONLY accessible from the drawer (not bottom tabs) */}
      <Drawer.Screen name="ProfileFromDrawer" component={ProfileScreen} options={{title: 'My Profile'}}/>
      <Drawer.Screen name="CartFromDrawer" component={CartScreen} options={{title: 'My Cart'}}/>
      <Drawer.Screen name="SearchFromDrawer" component={SearchScreen} options={{title: 'Search'}}/>
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  drawerHeader: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 20,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 10,
  },
  drawerAvatar: {
    marginRight: 10,
  },
  drawerHeaderText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  drawerIcon: {
    marginRight: 15,
  },
  drawerItemText: {
    fontSize: 16,
    color: '#333',
  },
});

export default DrawerNavigator;