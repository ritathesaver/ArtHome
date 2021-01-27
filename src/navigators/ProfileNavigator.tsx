import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import { ProfileScreen } from '../screens/profile/ProfileScreen'
import { OrdersScreen } from '../screens/profile/OrdersScreen'

const screenStyle = {
  headerStyle: {
    backgroundColor: '#161718',
    height: 80,
    shadowColor: 'transparent',
  },
  headerTintColor: 'white',
}

const ProfileStack = createStackNavigator()

export const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        options={{
          ...screenStyle,
          title: 'Profile',
        }}
        name="Profile"
        component={ProfileScreen}
      />
       <ProfileStack.Screen
        options={{
          ...screenStyle,
          title: 'Orders',
        }}
        name="Orders"
        component={OrdersScreen}
      />
    </ProfileStack.Navigator>
  )
}
