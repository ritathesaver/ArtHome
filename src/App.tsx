/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect, useState} from 'react'
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
import {ProfileScreen} from './screens/profile/ProfileScreen'
import {RootState} from './redux/rootReducer'
import AsyncStorage from '@react-native-community/async-storage'
import {restoreToken} from './redux/actions/authActions'
import {ActivityIndicator, View} from 'react-native'
import {SavedStackScreen} from './navigators/SavedNavigator'
import {CartList} from './screens/cart/CartList'
import { ProfileStackScreen } from './navigators/ProfileNavigator'

Icon.loadFont()

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const App: FunctionComponent = () => {
  const authToken = useSelector((state: RootState) => state.auth.userToken)
  const dispatch: AppDispatch = useDispatch()
  const signOut = useSelector((state: RootState) => state.auth.isSignout)
  const [loading, setLoading] = useState(false)

  const [showWelcome, setShowWelcome] = useState(true)

  useEffect(() => {
    setLoading(true)
    ;(async () => {
      console.log(authToken)
      if (authToken) {
        await AsyncStorage.setItem('userToken', authToken)
        setLoading(false)
        return
      }

      if (signOut) {
        await AsyncStorage.removeItem('userToken')
        setLoading(false)
        return
      }

      const userToken = await AsyncStorage.getItem('userToken')
      setLoading(false)

      if (userToken) {
        dispatch(restoreToken(userToken))
      }
    })()
  }, [authToken, dispatch, signOut])

  // console.log(token)
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#202122',
        }}>
        <ActivityIndicator size="large" color="#f7f7f7" />
      </View>
    )
  }

  if (showWelcome && !signOut && !authToken) {
    return <WelcomeScreen onFinish={() => setShowWelcome(false)} />
  }

  return (
    <NavigationContainer>
      {authToken ? (
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: '#9ea1a3',
            inactiveTintColor: '#9ea1a3',
            showLabel: false,
            style: {
              backgroundColor: '#161718',
              borderTopColor: '#202122',
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
            name="CartList"
            component={CartList}
            options={{
              tabBarLabel: 'Cart',
              tabBarIcon: ({focused}) =>
                focused ? <CartActiveSvg /> : <CartSvg />,
            }}
          />
          <Tab.Screen
            name="Saved"
            component={SavedStackScreen}
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
            component={ProfileStackScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarIcon: ({focused}) =>
                focused ? <ProfileActiveSvg /> : <ProfileSvg />,
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="AuthScreen" component={AuthStackScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}

export default App
export type AppDispatch = typeof store.dispatch
