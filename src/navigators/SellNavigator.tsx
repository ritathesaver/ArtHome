import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { OpenCameraScreen } from '../screens/sell/OpenCameraScreen'
import { SetPriceScreen } from '../screens/sell/SetPriceScreen'
import { useNavigation } from '@react-navigation/native'
import { Button } from 'react-native'
import { CategoriesListScreen } from '../screens/sell/CaterogiesListScreen'


const screenStyle = {
	headerStyle: {
		backgroundColor: '#202122',
		height: 100
	},
	headerTintColor: 'white'
}


const SellStack = createStackNavigator()

export const SellStackScreen = () => {
  const navigation = useNavigation()
  return (
    <SellStack.Navigator>
      <SellStack.Screen
        options={({route}) =>({
					...screenStyle,
          title: 'Upload Image',
          headerRight: () => (
						<Button color='white' title="Done" onPress={() =>  navigation.navigate('SetPrice', route.params)}></Button>
          ),
          headerLeft: () => (
						<Button color='white' title="Cancel" onPress={() =>  navigation.navigate('Home')}></Button>
					)
				})}
        name="OpenCamera"
        component={OpenCameraScreen} />
      <SellStack.Screen
        options={{
					...screenStyle,
          title: 'Price',
          headerRight: () => (
						<Button color='white' title="Next" onPress={() =>  navigation.navigate('SetCategory')}></Button>
          ),
          headerLeft: () => (
						<Button color='white' title="Cancel" onPress={() =>  navigation.navigate('Home')}></Button>
					)
				}}
        name="SetPrice"
        component={SetPriceScreen} />
      <SellStack.Screen
        options={{
					...screenStyle,
          title: 'Category',
          headerRight: () => (
						<Button color='white' title="Next" onPress={() =>  navigation.navigate('Home')}></Button>
          ),
          headerLeft: () => (
						<Button color='white' title="Cancel" onPress={() =>  navigation.navigate('Home')}></Button>
					)
				}}
        name="SetCategory"
        component={CategoriesListScreen} />
    </SellStack.Navigator>
    )
}
