/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native'
import React, {FunctionComponent} from 'react'
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'

import {artworks} from '../../assets/artworks/artworks'

interface ISetCategoryProps {
  route: any
}

export const CategoriesListScreen: FunctionComponent<ISetCategoryProps> = ({
  route,
}) => {
  console.log(route.params.uri)
  const navigation = useNavigation()
  return (
    <View style={{flex: 1, marginHorizontal: 10, backgroundColor: 'white'}}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={artworks}
        renderItem={({item}) => (
          <>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() => {
                navigation.navigate('AddDetails', {
                  title: item.title,
                  uri: route.params.uri,
                })
              }}>
              <View style={{backgroundColor: 'white'}}>
                <Text style={{fontSize: 20, marginVertical: 15}}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: '#af6b58',
              }}
            />
          </>
        )}
      />
    </View>
  )
}
