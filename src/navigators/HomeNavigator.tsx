import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen } from '../screens/home/HomeScreen'
import SearchBox from '../components/SearchBox/SearchBox'


const screenStyle = {
  title: 'Home',
  	headerStyle: {
		backgroundColor: '#DBDED1',
			height: 150
	}
}


const HomeStack = createStackNavigator()

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator >
			<HomeStack.Screen
					
				options={{
					header: () => <SearchBox />
				}}
				name="Home"
				component={HomeScreen}
				
			/>
      
		</HomeStack.Navigator>
    )
}
