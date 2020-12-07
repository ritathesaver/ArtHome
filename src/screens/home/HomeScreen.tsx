/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {styles} from './styles'
import invert from 'invert-color'

import {categories} from '../../assets/categories/categories'
import {useNavigation} from '@react-navigation/native'
import SearchBox from '../../components/SearchBox/SearchBox'

export const HomeScreen: FunctionComponent = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <SearchBox />
      <FlatList
        data={categories}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 3,
              width: Dimensions.get('window').width / 2,
              height: 200,
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate(`${item.screen}`)}>
            <Image style={styles.image} source={{uri: item.image.uri}} />
            <View
              style={{
                ...styles.overlayBoxWhite,
                backgroundColor: item.overlayColor,
              }}
            />
            <Text
              style={{
                ...styles.title,
                color: `${invert(item.overlayColor, true)}`,
              }}>
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </SafeAreaView>
  )
}
