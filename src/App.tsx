import React, {FunctionComponent, useEffect} from 'react'
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
import {useDispatch, useSelector} from 'react-redux'
import {store} from './redux'

import Icon from 'react-native-vector-icons/MaterialIcons'
import {SellStackScreen} from './navigators/SellNavigator'
import { ProfileScreen } from './screens/profile/ProfileScreen'
import {Saved} from './screens/galleries/Saved'
import {RootState} from './redux/rootReducer'
import AsyncStorage from '@react-native-community/async-storage'
import {useState} from 'react'
import { restoreToken } from './redux/actions/authActions'

Icon.loadFont()

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const App: FunctionComponent = () => {
  const authToken = useSelector((state: RootState) => state.auth.userToken)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    (async () => {
      console.log(authToken)
      if (authToken) {
        await AsyncStorage.setItem('userToken', authToken)
        return
      }

      const userToken = await AsyncStorage.getItem('userToken')
      if(userToken)
      dispatch(restoreToken(userToken))
    })()
  }, [authToken])

  // console.log(token)

  return (
    <NavigationContainer>
      {authToken ? (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: 'white',
            inactiveTintColor: '#cccccc',
            style: {
              backgroundColor: '#202122',
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
            component={Saved}
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
              tabBarVisible: false,
              tabBarLabel: 'Sell',
              tabBarIcon: ({focused}) =>
                focused ? <CameraActiveSvg /> : <CameraSvg />,
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
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
export type AppDispatch = typeof store.dispatch
