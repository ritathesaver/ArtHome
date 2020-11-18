import React, {FunctionComponent, useContext} from 'react'
import {WelcomeScreen} from './screens/onBoarding/WelcomeScreen'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import AuthStackScreen from './navigators/AuthNavigator'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {HomeStackScreen} from './navigators/HomeNavigator'
import HomeSvg from './assets/icons/home (1).svg'
import HomeActiveSvg from './assets/icons/home (2).svg'
import CartSvg from './assets/icons/shopping-cart (1).svg'
import CartActiveSvg from './assets/icons/shopping-cart.svg'
import LikeSvg from './assets/icons/heart (1).svg'
import LikeActiveSvg from './assets/icons/heart (2).svg'
import CameraSvg from './assets/icons/camera (1).svg'
import CameraActiveSvg from './assets/icons/camera.svg'
import ProfileSvg from './assets/icons/user (3).svg'
import ProfileActiveSvg from './assets/icons/user (2).svg'
import {AppContext} from './services/AppContext.js'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { SellStackScreen } from './navigators/SellNavigator'

Icon.loadFont()

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const App: FunctionComponent = () => {
  const {token} = useContext(AppContext)

  console.log(token)

  return (
    <NavigationContainer>
      {token ? (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: 'white',
            inactiveTintColor: '#cccccc',
            style: {
              backgroundColor: '#202122',
              paddingVertical: 10
            },
          }}>
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Home',

              tabBarIcon: ({focused}) =>
                focused ? <HomeActiveSvg /> : <HomeSvg />,
            }}
          />
          <Tab.Screen
            name="Cart"
            component={AuthStackScreen}
            options={{
              tabBarLabel: 'Cart',
              tabBarIcon: ({focused}) =>
                focused ? <CartActiveSvg /> : <CartSvg />,
            }}
          />
          <Tab.Screen
            name="Saved"
            component={AuthStackScreen}
            options={{
              tabBarLabel: 'Saved',
              tabBarIcon: ({focused}) =>
                focused ? <LikeActiveSvg /> : <LikeSvg />,
            }}
          />
          <Tab.Screen
            name="Sell"
            component={SellStackScreen}
            options={{
              tabBarLabel: 'Sell',
              tabBarIcon: ({focused}) =>
                focused ? <CameraActiveSvg /> : <CameraSvg />,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={AuthStackScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({focused}) =>
                focused ? <ProfileActiveSvg /> : <ProfileSvg />,
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="AuthScreen" component={AuthStackScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default App
