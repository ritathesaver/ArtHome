import React from 'react'
import {Provider} from 'react-redux'
import {store} from './src/redux'
import App from './src/App'

const AppProvider = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default AppProvider
