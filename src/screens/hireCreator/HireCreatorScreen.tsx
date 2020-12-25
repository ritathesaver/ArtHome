/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect, useState} from 'react'
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

import {useNavigation} from '@react-navigation/native'
import SearchBox from '../../components/SearchBox/SearchBox'
import NextIcon from '../../assets/icons/next.svg'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {getUsers} from '../../redux/actions/usersActions'
import {RootState} from '../../redux/rootReducer'

export const HireCreatorScreen: FunctionComponent = () => {
  const navigation = useNavigation()
  const dispatch: AppDispatch = useDispatch()
  const [search, setSearch] = useState('')

  const clearSearch = () => {
    setSearch('')
  }

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
          <View
            style={{
              ...styles.wrapper,
              width: Dimensions.get('window').width,
            }}>
            <View style={styles.infoWrapper}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: item.avatarUri}} />
              </View>
              <View style={{flexDirection: 'column', marginLeft: 5}}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.title}>
                  {item.specialization.map((spec) => spec + ' ')}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                clearSearch()
                navigation.navigate('CreatorPage', item)
              }}>
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
