/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect, useState} from 'react'
import {
  FlatList,
  SafeAreaView,
} from 'react-native'
import {styles} from './styles'

import {useNavigation} from '@react-navigation/native'
import SearchBox from '../../components/SearchBox/SearchBox'
import NextIcon from '../../assets/icons/next.svg'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {getUsers} from '../../redux/actions/usersActions'
import {RootState} from '../../redux/rootReducer'
import { HireCreatorItem } from './HireCreatorItem'
import { useCallback } from 'react'

export const HireCreatorScreen: FunctionComponent = () => {
  const navigation = useNavigation()
  const dispatch: AppDispatch = useDispatch()
  const [search, setSearch] = useState('')

  const clearSearch = () => {
    setSearch('')
  }

  const onPress = useCallback(
    (user) => {
      clearSearch()
      navigation.navigate('CreatorPage', user)
    },
    [],
  )

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const searchedUsers = useSelector((state: RootState) =>
    state.users.users
      .filter((user) => user.specialization.length > 0)
      .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
      .map((user) => user),
  )

  // console.log(users)

  return (
    <SafeAreaView style={styles.container}>
      <SearchBox setSearch={setSearch} search={search} />
      <FlatList
        data={searchedUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => (
          <HireCreatorItem itemId={item.id} onPress={() => onPress(item)} />
        )}
      />
    </SafeAreaView>
  )
}
