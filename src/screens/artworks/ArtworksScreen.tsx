/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native'
import React, {FunctionComponent, useCallback, useEffect, useState} from 'react'
import {
  FlatList,
  SafeAreaView,
} from 'react-native'
import SearchBox from '../../components/SearchBox/SearchBox'
import {styles} from './styles'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {getCategories} from '../../redux/actions/cateroriesActions'
import {AppDispatch} from '../../App'
import { CategoryItem } from './CategoryItem'

export const ArtworksScreen: FunctionComponent = () => {
  const navigation = useNavigation()
  const dispatch: AppDispatch = useDispatch()
  const [search, setSearch] = useState('')

  const clearSearch = () => {
    setSearch('')
  }

  const onPress = useCallback(
    (itemId) => {
      clearSearch()
      navigation.navigate('ArtworksDetails', {id: itemId})
    },
    [],
  )

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
    <SafeAreaView style={styles.container}>
      <SearchBox setSearch={setSearch} search={search} />
      <FlatList
        data={searchedCategories}
        renderItem={({ item }) => (
          <CategoryItem itemId={item.id} onPress={() => onPress(item.id)}/>
          
        )}
        numColumns={2}
      />
    </SafeAreaView>
  )
}
