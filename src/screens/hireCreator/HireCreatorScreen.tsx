/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect} from 'react'
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

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const users = useSelector((state: RootState) =>
    state.users.users.map((user) => user),
  )

  return (
    <SafeAreaView style={styles.container}>
      <SearchBox />

      <FlatList
        data={users}
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
              onPress={() => navigation.navigate('CreatorPage', item)}>
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
