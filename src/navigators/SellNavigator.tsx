import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {OpenCameraScreen} from '../screens/sell/OpenCameraScreen'
import {SetPriceScreen} from '../screens/sell/SetPriceScreen'
import {useNavigation} from '@react-navigation/native'
import {Button} from 'react-native'
import {CategoriesListScreen} from '../screens/sell/CaterogiesListScreen'
import {AddDetailsScreen} from '../screens/sell/AddDetailsScreen'
import MapScreen from '../components/MapScreen'

const screenStyle = {
  headerStyle: {
    backgroundColor: '#202122',
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
              onPress={() => navigation.navigate('SetPrice', route.params)}
            />
          ),
          headerLeft: () => (
            <Button
              color="white"
              title="Cancel"
              onPress={() => navigation.navigate('Home')}
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
              onPress={() => navigation.navigate('Home')}
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
              onPress={() => navigation.navigate('Home')}
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
          headerRight: () => (
            <Button
              color="white"
              title="Submit"
              onPress={() => navigation.navigate('Home')}
            />
          ),
          headerLeft: () => (
            <Button
              color="white"
              title="Cancel"
              onPress={() => navigation.navigate('Home')}
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
