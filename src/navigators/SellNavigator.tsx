import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {OpenCameraScreen} from '../screens/sell/OpenCameraScreen'
import {SetPriceScreen} from '../screens/sell/SetPriceScreen'
import {Alert, Button} from 'react-native'
import {CategoriesListScreen} from '../screens/sell/CaterogiesListScreen'
import {AddDetailsScreen} from '../screens/sell/AddDetailsScreen'
import MapScreen from '../components/MapScreen'

const screenStyle = {
  headerStyle: {
    backgroundColor: '#161718',
    height: 100,
  },
  headerTintColor: 'white',
}

const SellStack = createStackNavigator()

export const SellStackScreen = () => {
  return (
    <SellStack.Navigator>
      <SellStack.Screen
        options={({route, navigation}) => ({
          ...screenStyle,
          title: 'Upload Image',
          headerRight: () => (
            <Button
              color="white"
              title="Done"
              onPress={() => {
                if (!route.params) {
                  Alert.alert('Please, select picture')
                  return
                }
                navigation.navigate('SetPrice', route.params)
              }}
            />
          ),
          headerLeft: () => (
            <Button
              color="white"
              title="Cancel"
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                })
              }}
            />
          ),
        })}
        name="OpenCamera"
        component={OpenCameraScreen}
      />
      <SellStack.Screen
        options={({route, navigation}) => ({
          ...screenStyle,
          title: 'Price',
          headerRight: () => (
            <Button
              color="white"
              title="Next"
              onPress={() => navigation.navigate('SetCategory', route.params)}
            />
          ),
          headerLeft: () => (
            <Button
              color="white"
              title="Cancel"
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                })
              }}
            />
          ),
        })}
        name="SetPrice"
        component={SetPriceScreen}
      />
      <SellStack.Screen
        options={({navigation}) => ({
          ...screenStyle,
          title: 'Category',
          headerLeft: () => (
            <Button
              color="white"
              title="Cancel"
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                })
              }}
            />
          ),
        })}
        name="SetCategory"
        component={CategoriesListScreen}
      />
      <SellStack.Screen
        options={({navigation}) => ({
          ...screenStyle,
          title: 'AddDetails',
          headerLeft: () => (
            <Button
              color="white"
              title="Cancel"
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Home'}],
                })
              }}
            />
          ),
        })}
        name="AddDetails"
        component={AddDetailsScreen}
      />
      <SellStack.Screen
        options={{
          ...screenStyle,
          title: 'Map',
        }}
        name="Map"
        component={MapScreen}
      />
    </SellStack.Navigator>
  )
}
