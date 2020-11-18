/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useState} from 'react'
import {
  Dimensions,
  Image,
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import {artworks} from '../../assets/artworks/artworks'


export const CategoriesListScreen: FunctionComponent = () => {
  const navigation = useNavigation()
  const [check, setCheck] = useState(false)
 
  return (
    <View style={{ flex: 1, marginHorizontal: 10, backgroundColor: 'white'}}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={artworks}
        renderItem={({ item }) => (
          <><TouchableOpacity style={{ width: '100%' }} onPress={() => setCheck(item.check)}>
            {check ? (
              <View style={{ backgroundColor: '#af6b58' }}>
                <Text style={{ fontSize: 20, marginVertical: 15 }}>{item.title}</Text>
              </View>)
              : (
              <View style={{ backgroundColor: 'white' }}>
               <Text style={{ fontSize: 20, marginVertical: 15 }}>{item.title}</Text>
                </View>)
            }

          </TouchableOpacity>
            <View style={{ width: '100%', borderBottomWidth: 1, borderColor: '#af6b58' }}></View></>
        )}
      />
      
     </View>
  )
}
