import { useNetInfo } from "@react-native-community/netinfo"
import React, { memo } from "react"
import { useState, useEffect, FunctionComponent } from "react"
import { Text, View } from "react-native"

const ConnectionError: FunctionComponent = () => {

  const netInfo = useNetInfo()
  const [errorText, setErrorText] = useState<string | null>(null)

  useEffect(() => {
    if (netInfo.isConnected) {
      console.log('inet est')
      setErrorText(null)
    } else {
      setErrorText('common.noConnection')
    }
  }, [netInfo])

  console.log(errorText)

  
  return (
    
    <>{errorText ?
     (<View style={{ backgroundColor: 'red', justifyContent: 'flex-end', alignItems: 'center', paddingBottom:5, height: 65 }}>
       <Text style={{ color: 'white'}}>No internet connection</Text>
     </View>) : (<></>)
    }
    </>
  )
}

export default memo(ConnectionError)