/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import {Provider} from 'react-redux'
import {store} from './src/redux'
import App from './src/App'
import ConnectionError from './src/components/ConnectionError'
import {View} from 'react-native'

const AppProvider = () => {
  return (
    <Provider store={store}>
      <View style={{flex: 1}}>
        <App />
        <ConnectionError />
      </View>
    </Provider>
  )
}

export default AppProvider
