import React, { FunctionComponent } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { WelcomeScreen } from './src/screens/onBoarding/WelcomeScreen'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AuthStackScreen from './src/navigators/AuthNavigator'
import { HomeScreen } from './src/screens/home/HomeScreen'

const Stack = createStackNavigator()

const App: FunctionComponent = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen  name="WelcomeScreen" component={WelcomeScreen} />
				<Stack.Screen name="AuthScreen" component={AuthStackScreen} />
				<Stack.Screen name="HomeScreen" component={HomeScreen} />
			</Stack.Navigator>
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
