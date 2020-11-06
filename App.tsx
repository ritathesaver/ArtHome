import React, { FunctionComponent, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import { WelcomeScreen } from './src/screens/onBoarding/WelcomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AuthStackScreen from './src/navigators/AuthNavigator'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeStackScreen } from './src/navigators/HomeNavigator'
import AsyncStorage from '@react-native-community/async-storage'
import HomeSvg from './src/assets/icons/place.svg'
import HomeActiveSvg from './src/assets/icons/home.svg'
import CartSvg from './src/assets/icons/shopping-cart (1).svg'
import CartActiveSvg from './src/assets/icons/shopping-cart.svg'
import LikeSvg from './src/assets/icons/heart (1).svg'
import LikeActiveSvg from './src/assets/icons/heart (2).svg'
import CameraSvg from './src/assets/icons/camera (1).svg'
import CameraActiveSvg from './src/assets/icons/camera.svg'
import ProfileSvg from './src/assets/icons/user (3).svg'
import ProfileActiveSvg from './src/assets/icons/user (2).svg'

import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont();



const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const App: FunctionComponent = () => {

	const getData = async () => {
  try {
		const jsonValue = await AsyncStorage.getItem('@storage_Key')
		return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch(e) {
    console.log(e)
   }
	}

	let token = getData().then()

	console.log(token)
	
	return (
		<NavigationContainer>
			{token? (
				<Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#DBDED1',
        }
      }}>
					<Tab.Screen
						name="Home"
						component={HomeStackScreen}
						options={{
							tabBarLabel: 'Home',
							tabBarIcon: ({ focused }) => (focused ? <HomeActiveSvg /> : <HomeSvg />)
						}}
					/>
					<Tab.Screen
						name="Cart"
						component={AuthStackScreen}
						options={{
							tabBarLabel: 'Cart',
							tabBarIcon: ({ focused }) => (focused ? <CartActiveSvg /> : <CartSvg />)
						}}
					/>
					<Tab.Screen
						name="Saved"
						component={AuthStackScreen}
						options={{
							tabBarLabel: 'Saved',
							tabBarIcon: ({ focused }) => (focused ? <LikeActiveSvg /> : <LikeSvg />)
						}}
					/>
					<Tab.Screen
						name="Sell"
						component={AuthStackScreen}
						options={{
							tabBarLabel: 'Sell',
							tabBarIcon: ({ focused }) => (focused ? <CameraActiveSvg /> : <CameraSvg />)
						}}
					/>
					<Tab.Screen
						name="Profile"
						component={AuthStackScreen}
						options={{
							tabBarLabel: 'Profile',
							tabBarIcon: ({ focused }) => (focused ? <ProfileActiveSvg /> : <ProfileSvg />)
						}}
					/>
				</Tab.Navigator>) : 
			(<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen  name="WelcomeScreen" component={WelcomeScreen} />
				<Stack.Screen name="AuthScreen" component={AuthStackScreen} />
			</Stack.Navigator>)	}
		</NavigationContainer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
})

export default App
