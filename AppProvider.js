import React, {useState} from 'react'
import {AppContext} from './src/services/AppContext.js'
import App from './src/App'

export const AppProvider = () => {
  const [token, setToken] = useState(null)

  return (
    <AppContext.Provider value={{token, setToken}}>
      <App />
    </AppContext.Provider>
  )
}
