/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react'
import {
  Dimensions,
  Image,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView
} from 'react-native'

import { priceStyles } from './styles'

interface ISetPriceProps {
  route: any
}


export const SetPriceScreen: FunctionComponent<ISetPriceProps> = ({ route }) => {
  
  return (
     <KeyboardAvoidingView behavior="padding" style={priceStyles.container}>
      <View style={priceStyles.headerWrapper}>
        <Text style={priceStyles.header}>Cool! Let's set a right price below</Text>
      </View>
      <Image style={{ height: Dimensions.get('window').width * route.params.ratio, width: Dimensions.get('window').width }} source={{ uri: route.params.uri }}/>
      <View style={priceStyles.inputWrapper}>
        <Text style={priceStyles.priceText}>BYN:</Text>
        <TextInput keyboardType='numeric' style={priceStyles.priceInput}></TextInput>
      </View>
    </KeyboardAvoidingView>
  )
}
