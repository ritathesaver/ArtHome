import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {Saved} from '../screens/galleries/Saved'

const screenStyle = {
  headerStyle: {
    backgroundColor: '#161718',
    height: 80,
    shadowColor: 'transparent',
  },
  headerTintColor: 'white',
}

const SavedStack = createStackNavigator()

export const SavedStackScreen = () => {
  return (
    <SavedStack.Navigator>
      <SavedStack.Screen
        options={{
          ...screenStyle,
          title: 'Saved',
        }}
        name="Saved"
        component={Saved}
      />
    </SavedStack.Navigator>
  )
}
