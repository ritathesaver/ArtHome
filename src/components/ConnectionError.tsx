/* eslint-disable react-native/no-inline-styles */
import {addEventListener} from '@react-native-community/netinfo'
import React, {memo} from 'react'
import {useState, useEffect, FunctionComponent} from 'react'
import {Text, View} from 'react-native'

const ConnectionError: FunctionComponent = () => {
  const [showError, setShowError] = useState<boolean | null>(false)

  useEffect(() => {
    const unsubscribe = addEventListener((state) => {
      if (!state.isConnected) {
        setShowError(true)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  return showError ? (
    <View
      style={{
        backgroundColor: 'red',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 5,
        height: 65,
      }}>
      <Text style={{color: 'white'}}>No internet connection</Text>
    </View>
  ) : null
}

export default memo(ConnectionError)
