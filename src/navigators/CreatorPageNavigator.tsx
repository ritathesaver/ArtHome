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
        indicatorContainerStyle: {backgroundColor: '#161718'},
        indicatorStyle: {backgroundColor: '#f7f7f7'},
        labelStyle: {color: '#f7f7f7'},
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
