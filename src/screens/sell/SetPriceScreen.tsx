import {useNavigation} from '@react-navigation/native'
import React, {FunctionComponent} from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import {
  Dimensions,
  Image,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native'

import {priceStyles} from './styles'

interface ISetPriceProps {
  route: any
}

export const SetPriceScreen: FunctionComponent<ISetPriceProps> = ({route}) => {
  const navigation = useNavigation()
  const [price, setPrice] = useState('')

  navigation.addListener('blur', () => {
    setPrice('')
  })

  useEffect(() => {
    navigation.setParams({
      uri: route.params.uri,
      price: price,
    })
  }, [navigation, price, route.params.uri])

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={120}
      behavior="padding"
      style={priceStyles.container}>
      <ScrollView>
        <View style={priceStyles.headerWrapper}>
          <Text style={priceStyles.header}>
            Cool! Let's set a right price below
          </Text>
        </View>
        <Image
          style={{
            height: Dimensions.get('window').width * route.params.ratio,
            width: Dimensions.get('window').width,
          }}
          source={{uri: route.params.uri}}
        />
        <View style={priceStyles.inputWrapper}>
          <Text style={priceStyles.priceText}>$</Text>
          <TextInput
            defaultValue={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={priceStyles.priceInput}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
