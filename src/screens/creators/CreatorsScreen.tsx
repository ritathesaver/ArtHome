import React, {FunctionComponent} from 'react'
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native'
import {styles} from './styles'

import {authors} from '../../assets/authors/authors'
import {useNavigation} from '@react-navigation/native'

export const CreatorsScreen: FunctionComponent = () => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        data={authors}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', item)}

            style={{
              flex: 1,
              flexDirection: 'column',
              margin: 20,
              width: 100,
              height: 100,
              alignItems: 'center',
            }}>
            <Image style={styles.image} source={{uri: item.avatar.uri}} />
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        )}
        numColumns={3}
      />
    </SafeAreaView>
  )
}