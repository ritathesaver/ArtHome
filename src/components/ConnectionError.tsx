/* eslint-disable react-native/no-inline-styles */
import {addEventListener} from '@react-native-community/netinfo'
import React, {memo} from 'react'
import {useState, useEffect, FunctionComponent} from 'react'
import {Text, View} from 'react-native'

const ConnectionError: FunctionComponent = () => {
  const [showError, setShowError] = useState<boolean | null>(false)

  useEffect(() => {
    const unsubscribe = addEventListener((state) => {
      if (state.isInternetReachable === null) {
        return
      }
      if (!state.isInternetReachable) {
        setTimeout(() => {
          setShowError(false)
        }, 5000)
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      }}>
      <Text style={{color: 'white'}}>No internet connection</Text>
    </View>
  ) : null
}

export default memo(ConnectionError)
