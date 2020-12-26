import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {OpenCameraScreen} from '../screens/sell/OpenCameraScreen'
import {SetPriceScreen} from '../screens/sell/SetPriceScreen'
import {useNavigation} from '@react-navigation/native'
import {Alert, Button} from 'react-native'
import {CategoriesListScreen} from '../screens/sell/CaterogiesListScreen'
import {AddDetailsScreen} from '../screens/sell/AddDetailsScreen'
import MapScreen from '../components/MapScreen'
import {StackActions} from '@react-navigation/native'

const screenStyle = {
  headerStyle: {
    backgroundColor: '#161718',
    height: 100,
  },
  headerTintColor: 'white',
}

const SellStack = createStackNavigator()

export const SellStackScreen = () => {
  const navigation = useNavigation()

  return (
    <SellStack.Navigator>
      <SellStack.Screen
        options={({route}) => ({
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
                navigation.dispatch(StackActions.popToTop())
                navigation.navigate('Home')
              }}
            />
          ),
        })}
        name="OpenCamera"
        component={OpenCameraScreen}
      />
      <SellStack.Screen
        options={({route}) => ({
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
                navigation.dispatch(StackActions.popToTop())
                navigation.navigate('Home')
              }}
            />
          ),
        })}
        name="SetPrice"
        component={SetPriceScreen}
      />
      <SellStack.Screen
        options={{
          ...screenStyle,
          title: 'Category',
          headerLeft: () => (
            <Button
              color="white"
              title="Cancel"
              onPress={() => {
                navigation.dispatch(StackActions.popToTop())
                navigation.navigate('Home')
              }}
            />
          ),
        }}
        name="SetCategory"
        component={CategoriesListScreen}
      />
      <SellStack.Screen
        options={{
          ...screenStyle,
          title: 'AddDetails',
          headerLeft: () => (
            <Button
              color="white"
              title="Cancel"
              onPress={() => {
                navigation.dispatch(StackActions.popToTop())
                navigation.navigate('Home')
              }}
            />
          ),
        }}
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
