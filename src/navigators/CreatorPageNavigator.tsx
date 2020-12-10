import React, {FunctionComponent} from 'react'

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import {AboutCreatorScreen} from '../screens/hireCreator/AboutCreatorScreen'
import {GalleryCreator} from '../screens/galleries/GalleryCreator'

interface ICreatorPageProps {
  route: any
}

const Tab = createMaterialTopTabNavigator()

export const CreatorPageScreen: FunctionComponent<ICreatorPageProps> = ({
  route,
}) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        indicatorStyle: {backgroundColor: '#af6b58'},
      }}>
      <Tab.Screen
        name="About"
        children={() => <AboutCreatorScreen route={route.params} />}
      />
      <Tab.Screen
        name="Portfolio"
        children={() => <GalleryCreator route={route} />}
      />
    </Tab.Navigator>
  )
}
