/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect} from 'react'
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native'
import { styles } from './styles'

import {useNavigation} from '@react-navigation/native'
import SearchBox from '../../components/SearchBox/SearchBox'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers } from '../../redux/actions/usersActions'
import { AppDispatch } from '../../App'
import { RootState } from '../../redux/rootReducer'

export const CreatorsScreen: FunctionComponent = () => {
  const navigation = useNavigation()

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {

    dispatch(getUsers())
  
  }, [dispatch])
  
  const users = useSelector((state: RootState) => state.users.users.map(user => user))
  
  console.log(users)


  return (
    <SafeAreaView style={styles.container}>
      <SearchBox />

      <FlatList
        data={users}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Details', item)}
            style={{
              flexDirection: 'column',
              margin: 20,
              width: 100,
              height: 100,
              alignItems: 'center',
            }}>
            <Image style={styles.image} source={{uri: item.avatarUri}} />
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        )}
        numColumns={3}
      />
    </SafeAreaView>
  )
}
