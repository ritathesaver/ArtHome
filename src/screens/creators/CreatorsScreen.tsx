/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useCallback, useEffect, useState} from 'react'
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from 'react-native'
import {styles} from './styles'

import {useNavigation} from '@react-navigation/native'
import SearchBox from '../../components/SearchBox/SearchBox'
import {useDispatch, useSelector} from 'react-redux'
import {getUsers} from '../../redux/actions/usersActions'
import {AppDispatch} from '../../App'
import {RootState} from '../../redux/rootReducer'
import { CreatorItem } from './CreatorItem'

export const CreatorsScreen: FunctionComponent = () => {
  const navigation = useNavigation()
  const [search, setSearch] = useState('')
  const clearSearch = () => {
    setSearch('')
  }

  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const searchedUsers = useSelector((state: RootState) =>
    state.users.users
      .filter((users) =>
        users.name.toLowerCase().includes(search.toLowerCase()),
      )
      .map((name) => name),
  )

  const onPress = useCallback(
    (user) => {
      clearSearch()
      navigation.navigate('Details', user)
    },
    [],
  )

  return (
    <SafeAreaView style={styles.container}>
      <SearchBox setSearch={setSearch} search={search} />

      <FlatList
        keyExtractor={(item) => item.id}
        data={searchedUsers}
        renderItem={({item}) => (
          <CreatorItem itemId={item.id} onPress={() => onPress(item)} />
        )}
        numColumns={3}
      />
    </SafeAreaView>
  )
}
