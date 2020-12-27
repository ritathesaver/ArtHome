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
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {getPicturesByCategory} from '../../redux/actions/picturesActions'
import {RootState} from '../../redux/rootReducer'
import {getUsers} from '../../redux/actions/usersActions'
import LikeSvg from '../../assets/icons/like (1).svg'
import {deleteLike, getLikes, putLike} from '../../redux/actions/likesActions'

interface IDetailsProps {
  route: any
}
const columnWidth: number = Dimensions.get('window').width * 0.9

export const ArtworksDetails: FunctionComponent<IDetailsProps> = ({route}) => {
  const navigation = useNavigation()
  const dispatch: AppDispatch = useDispatch()
  const [search, setSearch] = useState('')
  const authId = useSelector((state: RootState) => state.auth.id)

  const clearSearch = () => {
    setSearch('')
  }

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

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

  const users = useSelector((state: RootState) =>
    state.users.users.map((user) => user),
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
            <TouchableOpacity
              onPress={() => {
                clearSearch()
                navigation.navigate('Cart', {id: item.id})
              }}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  padding: 5,
                  width: columnWidth,
                  alignItems: 'center',
                }}>
                <FastImage
                  style={{
                    width: columnWidth,
                    height: columnWidth,
                    margin: 1,
                  }}
                  source={{uri: item.uri}}>
                  {getLikeComponent(item.id)}
                </FastImage>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#f7f7f7',
                      marginBottom: 2,
                      paddingHorizontal: 16,
                      textAlign: 'center',
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#f7f7f7',
                      marginBottom: 2,
                      paddingHorizontal: 16,
                      textAlign: 'center',
                    }}>
                    by @{users.find((user) => user.id === item.creatorId)?.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  )
}
