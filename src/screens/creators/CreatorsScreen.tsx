/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect, useState} from 'react'
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

  const searchedUsers  = useSelector((state: RootState) =>
    state.users.users.filter((users) => users.name.toLowerCase().includes(search.toLowerCase())).map((name) => name),
  )

  return (
    <SafeAreaView style={styles.container}>
      <SearchBox setSearch={setSearch} search={search} />

      <FlatList
        keyExtractor={(item) => item.id}
        data={searchedUsers}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              clearSearch()
              navigation.navigate('Details', item)
             }
            }
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
