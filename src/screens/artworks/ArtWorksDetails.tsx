/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useCallback, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import SearchBox from '../../components/SearchBox/SearchBox'
import {detailStyles} from './styles'
import LikeActiveSvg from '../../assets/icons/heart (2).svg'
import {useNavigation} from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {getPicturesByCategory} from '../../redux/actions/picturesActions'
import {RootState} from '../../redux/rootReducer'
import LikeSvg from '../../assets/icons/like (1).svg'
import {deleteLike, getLikes, putLike} from '../../redux/actions/likesActions'
import { ArtworksItem } from './ArtworksItem'

interface IDetailsProps {
  route: any
}

export const ArtworksDetails: FunctionComponent<IDetailsProps> = ({route}) => {
  const navigation = useNavigation()
  const dispatch: AppDispatch = useDispatch()
  const [search, setSearch] = useState('')
  const authId = useSelector((state: RootState) => state.auth.id)

  const clearSearch = () => {
    setSearch('')
  }

  useEffect(() => {
    dispatch(getLikes())
  }, [dispatch])

  useEffect(() => {
    dispatch(getPicturesByCategory(route.params.id))
  }, [route.params.id, dispatch])

  const loading = useSelector((state: RootState) => state.pictures.loading)

  const pictures = useSelector((state: RootState) =>
    state.pictures.pictures.filter((pic) =>
      pic.title.toLowerCase().includes(search.toLowerCase())
      && pic.categoryId ===route.params.id,
    ),
  )

  const onPress = useCallback(
    (itemId) => {
      clearSearch()
      navigation.navigate('Cart', {id: itemId})
    },
    [],
  )

  const likes = useSelector((state: RootState) => state.likes.likes)

  const onLike = useCallback(
    (id) => {
      dispatch(putLike(id, authId))
    },
    [authId, dispatch],
  )

  const onDislike = useCallback(
    (likeId) => {
      console.log('deleteLike', likeId)
      dispatch(deleteLike(likeId))
    },
    [dispatch],
  )

  const getLikeComponent = (itemId: string) => {
    const like = likes.find(
      (l) => l.creatorId === authId && l.pictureId === itemId,
    )
    return like ? (
      <TouchableOpacity onPress={() => onDislike(like.id)}>
        <LikeActiveSvg style={{position: 'absolute', top: 10, right: 10}} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity
        style={{position: 'absolute', top: 10, right: 10}}
        onPress={() => onLike(itemId)}>
        <LikeSvg />
      </TouchableOpacity>
    )
  }

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
            <ArtworksItem onPress={() => onPress(item.id)} itemId={item.id} getLikeComponent={getLikeComponent} />
          )}
        />
      )}
    </SafeAreaView>
  )
}
