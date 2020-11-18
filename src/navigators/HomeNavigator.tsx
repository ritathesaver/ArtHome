import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from '../screens/home/HomeScreen'
import SearchBox from '../components/SearchBox/SearchBox'
import { CreatorsScreen } from '../screens/creators/CreatorsScreen'
import { CreatorDetails } from '../screens/creators/CreatorDetails'
import { ArtworksScreen } from '../screens/artworks/ArtworksScreen'
import { HireCreatorScreen } from '../screens/hireCreator/HireCreatorScreen'
import { ArtworksDetails } from '../screens/artworks/ArtWorksDetails'
import { CartScreen } from '../screens/cart/CartScreen'
import { CreatorPageScreen } from './CreatorPageNavigator'
import { AboutCreatorScreen } from '../screens/hirecreator/AboutCreatorScreen'


const screenStyle = {
	headerStyle: {
		backgroundColor: '#202122',
		height: 80
	},
	headerTintColor: 'white'
}

const HomeStack = createStackNavigator()


export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator >
			<HomeStack.Screen
				options={{ 
					...screenStyle,
					title: 'Home'
				}}
				name="Home"
				component={HomeScreen}
				
			/>
			<HomeStack.Screen
				options={{ 
					...screenStyle,
					title: 'Creators',
					headerBackTitleVisible: false
				}}
				name="Creators"
				component={CreatorsScreen}
				
			/>
			<HomeStack.Screen
				options={{
					...screenStyle,
					title: 'Creators',
					headerBackTitleVisible: false
		
				}}
					name="Details"
				component={CreatorDetails}
			/>
			<HomeStack.Screen
				options={{
					...screenStyle,
					headerBackTitleVisible: false
		
				}}
					name="CreatorPage"
				component={CreatorPageScreen}
			/>
			<HomeStack.Screen
				options={{
					...screenStyle,
					title: 'Artworks',
					headerBackTitleVisible: false
				}}
				name="Artworks"
				component={ArtworksScreen}
			/>
			<HomeStack.Screen
				options={{
					...screenStyle,
					title: 'Artworks',
					headerBackTitleVisible: false
				}}
				name="ArtworksDetails"
				component={ArtworksDetails}
			/>
			<HomeStack.Screen
				options={{
					...screenStyle,
					title: 'Artworks',
					headerBackTitleVisible: false
				}}
				name="Cart"
				component={CartScreen}
			/>
			<HomeStack.Screen
				options={{
					...screenStyle,
					title: 'Hire creator?',
					headerBackTitleVisible: false
				}}
				name="HireCreator"
				component={HireCreatorScreen}
			/>
		
		</HomeStack.Navigator>
    )
}
