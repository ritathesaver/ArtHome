import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {RegisterScreen} from '../screens/auth/RegisterScreen'
import {LoginScreen} from '../screens/auth/LoginScreen'

const AuthStack = createStackNavigator()

const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
    </AuthStack.Navigator>
  )
}

export default AuthStackScreen
