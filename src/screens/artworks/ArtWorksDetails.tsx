import React, {FunctionComponent, useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, FlatList, SafeAreaView} from 'react-native'
import SearchBox from '../../components/SearchBox/SearchBox'
import {detailStyles} from './styles'
import {useNavigation} from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {getPicturesByCategory} from '../../redux/actions/picturesActions'
import {ArtworksItem} from './ArtworksItem'
import {RootState} from '../../redux/rootReducer'

interface IDetailsProps {
  route: any
}

export const ArtworksDetails: FunctionComponent<IDetailsProps> = ({route}) => {
  const navigation = useNavigation()
  const dispatch: AppDispatch = useDispatch()
  const [search, setSearch] = useState('')

  const clearSearch = () => {
    setSearch('')
  }

  useEffect(() => {
    dispatch(getPicturesByCategory(route.params.id))
  }, [route.params.id, dispatch])

  const loading = useSelector((state: RootState) => state.pictures.loading)

  const pictures = useSelector((state: RootState) =>
    state.pictures.pictures.filter(
      (pic) =>
        pic.title.toLowerCase().includes(search.toLowerCase()) &&
        pic.categoryId === route.params.id,
    ),
  )

  const onPress = useCallback(
    (itemId) => {
      clearSearch()
      navigation.navigate('Cart', {id: itemId})
    },
    [navigation],
  )

  // console.log(pictures, 'dddd')

  return (
    <SafeAreaView style={detailStyles.container}>
      <SearchBox setSearch={setSearch} search={search} />
      {loading ? (
        <ActivityIndicator size="large" color="#af6b58" />
      ) : (
        <FlatList
          data={pictures}
          renderItem={({item}) => (
            <ArtworksItem onPress={() => onPress(item.id)} itemId={item.id} />
          )}
        />
      )}
    </SafeAreaView>
  )
}
