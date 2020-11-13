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

import {authors} from '../../assets/authors/authors'
import {useNavigation} from '@react-navigation/native'
import SearchBox from '../../components/SearchBox/SearchBox'
import NextIcon from '../../assets/icons/next.svg'

export const HireCreatorScreen: FunctionComponent = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <SearchBox />

      <FlatList
        data={authors}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              width: Dimensions.get('window').width,
              height: 120,
              borderBottomWidth: 1,
              padding: 5,
            }}>
            <View style={styles.infoWrapper}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: item.avatar.uri}} />
              </View>
              <View style={{flexDirection: 'column', marginLeft: 5}}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.title}>Painter</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Details', item.pictures)}>
              <View style={{height: '100%', justifyContent: 'center'}}>
                <NextIcon />
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  )
}
