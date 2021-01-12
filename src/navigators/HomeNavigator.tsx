import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {HomeScreen} from '../screens/home/HomeScreen'
import {CreatorsScreen} from '../screens/creators/CreatorsScreen'
import {ArtworksScreen} from '../screens/artworks/ArtworksScreen'
import {HireCreatorScreen} from '../screens/hireCreator/HireCreatorScreen'
import {ArtworksDetails} from '../screens/artworks/ArtWorksDetails'
import {CartScreen} from '../screens/cart/CartScreen'
import {CreatorPageScreen} from './CreatorPageNavigator'
import {GalleryAll} from '../screens/galleries/GalleryAll'
import {MyGallery} from '../screens/galleries/MyGallery'
import {GalleryCreator} from '../screens/galleries/GalleryCreator'
import {TrendingScreen} from '../screens/galleries/TrendingScreen'

const screenStyle = {
  headerStyle: {
    backgroundColor: '#161718',
    height: 80,
    shadowColor: 'transparent',
  },
  headerTintColor: 'white',
}

const HomeStack = createStackNavigator()

export const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{
          ...screenStyle,
          title: 'Home',
        }}
        name="Home"
        component={HomeScreen}
      />
      <HomeStack.Screen
        options={{
          ...screenStyle,
          title: 'Creators',
          headerBackTitleVisible: false,
        }}
        name="Creators"
        component={CreatorsScreen}
      />
      <HomeStack.Screen
        options={{
          ...screenStyle,
          title: 'Creators',
          headerBackTitleVisible: false,
        }}
        name="Details"
        component={GalleryCreator}
      />
      <HomeStack.Screen
        options={{
          ...screenStyle,
          title: 'Creator',
          headerBackTitleVisible: false,
        }}
        name="CreatorPage"
        component={CreatorPageScreen}
      />
      <HomeStack.Screen
        options={{
          ...screenStyle,
          title: 'Artworks',
          headerBackTitleVisible: false,
        }}
        name="Artworks"
        component={ArtworksScreen}
      />
      <HomeStack.Screen
        options={{
          ...screenStyle,
          title: 'Artworks',
          headerBackTitleVisible: false,
        }}
        name="ArtworksDetails"
        component={ArtworksDetails}
      />
      <HomeStack.Screen
        options={{
          ...screenStyle,
          title: 'Artworks',
          headerBackTitleVisible: false,
        }}
        name="Cart"
        component={CartScreen}
      />
      <HomeStack.Screen
        options={{
          ...screenStyle,
          title: 'Hire creator?',
          headerBackTitleVisible: false,
        }}
        name="HireCreator"
        component={HireCreatorScreen}
      />
      <HomeStack.Screen
        options={{
          ...screenStyle,
          headerBackTitleVisible: false,
          title: 'Gallery',
        }}
        name="GalleryAll"
        component={GalleryAll}
      />
      <HomeStack.Screen
        options={{
          ...screenStyle,
          headerBackTitleVisible: false,
          title: 'My gallery',
        }}
        name="MyGallery"
        component={MyGallery}
      />
      <HomeStack.Screen
        options={{
          ...screenStyle,
          headerBackTitleVisible: false,
          title: 'Trending',
        }}
        name="TrendingScreen"
        component={TrendingScreen}
      />
    </HomeStack.Navigator>
  )
}
