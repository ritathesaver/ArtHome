/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect, useState} from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MapView, {Marker} from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation'
import {ActivityIndicator, Button, View} from 'react-native'
import Geocoder from 'react-native-geocoding'
import {useNavigation} from '@react-navigation/native'

interface ILocation {
  latitude: number
  longitude: number
}
const key = 'AIzaSyDmB6NyQ33w3vDZR5pldrbHYLG5Qx209N8'

Icon.loadFont()

Geocoder.init(key)

const Map: FunctionComponent = () => {
  const navigation = useNavigation()
  const [location, setLocation] = useState<ILocation | undefined>(undefined)
  const [res, setRes] = useState('')

  useEffect(() => {
    Geolocation.requestAuthorization()
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        console.log(latitude, longitude)
        setLocation({
          latitude,
          longitude,
        })
      },
      (error) => {
        console.log(error.code, error.message)
      },
      {enableHighAccuracy: true, timeout: 2000},
    )
    console.log('START', location)
  }, [])

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ; (async () => {
      if (location) {
        const data = await Geocoder.from(location)

        const addressComponent = data.results[3].formatted_address

        // console.log(addressComponent, 'rr')

        setRes(addressComponent)
      }
    })()
  }, [location])

  const onMarkPress = (e: {nativeEvent: {coordinate: any}}) => {
    const {coordinate} = e.nativeEvent
    // console.log('COORDINATE', coordinate)
    setLocation(coordinate)
  }

  return (
    <>
      {location ? (
        <>
          <MapView
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}
            style={{flex: 9}}>
            <Marker
              draggable={true}
              coordinate={location}
              onDragEnd={onMarkPress}
              title={res}
            />
          </MapView>
          <View
            style={{
              flex: 1,
              backgroundColor: '#202122',
              justifyContent: 'center',
            }}>
            <Button
              onPress={() => navigation.navigate('AddDetails', {res})}
              title="Set location"
              color="white"
            />
          </View>
        </>
      ) : (
        <ActivityIndicator size="large" color="black" />
      )}
    </>
  )
}

export default Map
