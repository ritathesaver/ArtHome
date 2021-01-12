/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useCallback} from 'react'
import {View, Text, Dimensions} from 'react-native'
import FastImage from 'react-native-fast-image'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {GetLike} from '../../components/GetLike/GetLike'
import {deleteLike, putLike} from '../../redux/actions/likesActions'
import {RootState} from '../../redux/rootReducer'

interface IArtworksItemProps {
  onPress: any
  itemId: string
}

export const ArtworksItem: FunctionComponent<IArtworksItemProps> = ({
  onPress,
  itemId,
}) => {
  const columnWidth: number = Dimensions.get('window').width * 0.9

  const dispatch: AppDispatch = useDispatch()

  const users = useSelector((state: RootState) =>
    state.users.users.map((user) => user),
  )
  const authId = useSelector((state: RootState) => state.auth.id)

  const picture = useSelector((state: RootState) =>
    state.pictures.pictures.find((pic) => pic.id === itemId),
  )
  const onPressLike = useCallback(
    (pictureId: string, like: {id: string}) => {
      console.log(pictureId, 'item')
      like
        ? dispatch(deleteLike(like.id))
        : dispatch(putLike(pictureId, authId))
    },
    [authId, dispatch],
  )

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        width: columnWidth,
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={onPress}>
        <FastImage
          style={{
            width: columnWidth,
            height: columnWidth,
            margin: 1,
          }}
          source={{uri: picture?.uri}}
        />
      </TouchableOpacity>
      <GetLike onPress={onPressLike} itemId={itemId} />
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
          {picture?.title}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            color: '#f7f7f7',
            marginBottom: 2,
            paddingHorizontal: 16,
            textAlign: 'center',
          }}>
          by @{users.find((user: any) => user.id === picture?.creatorId)?.name}
        </Text>
      </View>
    </View>
  )
}
