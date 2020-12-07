import React, {FunctionComponent} from 'react'


import {useNavigation} from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { CreatorDetails } from '../screens/creators/CreatorDetails';
import { AboutCreatorScreen } from '../screens/hireCreator/AboutCreatorScreen';
import { ArtworksDetails } from '../screens/artworks/ArtWorksDetails';

interface ICreatorPageProps{
  route: any
}

const Tab = createMaterialTopTabNavigator();

export const CreatorPageScreen: FunctionComponent<ICreatorPageProps> = ({ route }) => {
  

  return (
    <Tab.Navigator
      tabBarOptions={{
        indicatorStyle: { backgroundColor: '#af6b58' },
      }}>
      <Tab.Screen name="About" children={()=><AboutCreatorScreen route={route.params}/>} />
      <Tab.Screen name="Portfolio" children={()=><CreatorDetails route={route}/>} />
   </Tab.Navigator>
  )
}