/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native'
import invert from 'invert-color'
import React, {FunctionComponent, useEffect, useState} from 'react'
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import SearchBox from '../../components/SearchBox/SearchBox'
import {styles} from './styles'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {getCategories} from '../../redux/actions/cateroriesActions'
import {AppDispatch} from '../../App'

export const ArtworksScreen: FunctionComponent = () => {
  const navigation = useNavigation()
  const dispatch: AppDispatch = useDispatch()
  const [search, setSearch] = useState('')

  const clearSearch = () => {
    setSearch('')
  }

  const error = useSelector((state: RootState) => state.categories.error)

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const searchedCategories = useSelector((state: RootState) =>
    state.categories.categories
      .filter((category) =>
        category.title.toLowerCase().includes(search.toLowerCase()),
      )
      .map((category) => category),
  )

  return (
    <>
      {error ? (
        Alert.alert(`${error}`, 'Lost connection')
      ) : (
        <SafeAreaView style={styles.container}>
          <SearchBox setSearch={setSearch} search={search} />
          <FlatList
            data={searchedCategories}
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  marginVertical: 15,
                  marginHorizontal: 5,
                  width: Dimensions.get('window').width / 2,
                  height: 140,
                }}
                onPress={() => {
                  clearSearch()
                  navigation.navigate('ArtworksDetails', {id: item.id})
                }}>
                <Image style={styles.image} source={{uri: item.coverUri}} />
                <View
                  style={{
                    backgroundColor: item.overlayColor,
                    height: 45,
                  }}>
                  <Text
                    style={{
                      ...styles.title,
                      color: `${invert(item.overlayColor, true)}`,
                    }}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            numColumns={2}
          />
        </SafeAreaView>
      )}
    </>
  )
}
