/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useCallback, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native'
import Modal from 'react-native-modal'
import {detailStyles} from './styles'
import {Dimensions} from 'react-native'
import FastImage from 'react-native-fast-image'
import LikeActiveSvg from '../../assets/icons/heart (2).svg'
import LikeSvg from '../../assets/icons/like (1).svg'
import {IPictures} from '../../redux/reducers/picturesReducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {deleteLike, getLikes, putLike} from '../../redux/actions/likesActions'
import {RootState} from '../../redux/rootReducer'

interface IDetailsProps {
  picturesArray: IPictures[]
}

export interface IImageSize {
  height: number
  width: number
  ratio: number
}

export interface IImageWithSize extends IPictures, IImageSize {}

const columnWidth: number = Dimensions.get('window').width / 2

export const Gallery: FunctionComponent<IDetailsProps> = (picturesArray) => {
  const dispatch: AppDispatch = useDispatch()
  const authId = useSelector((state: RootState) => state.auth.id)
  const likes = useSelector((state: RootState) => state.likes.likes)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)

  const [currentItem, setCurrentItem] = useState<IImageWithSize | undefined>()

  useEffect(() => {
    dispatch(getLikes())
  }, [dispatch])

  //const usersLike = useSelector((state: RootState) => state.likes.likes.map(user => user.creatorId))
  //const picsLike= useSelector((state: RootState) => state.likes.likes.map(pic => pic.pictureId))
  console.log(likes.length, 'LIKES')

  const onLike = useCallback(
    (id) => {
      dispatch(putLike(id, authId))
    },
    [dispatch, authId],
  )

  const onDislike = useCallback(
    (likeId) => {
      console.log('deleteLike', likeId)
      dispatch(deleteLike(likeId))
    },
    [dispatch],
  )

  const [columns, setColumns] = useState<Array<Array<IImageWithSize>>>([[], []])
  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      let cleanupFunction = false
      const imagesWithSize: IImageWithSize[] = await Promise.all(
        picturesArray.picturesArray.map(async (item: IPictures) => {
          const result: IImageSize = await new Promise((resolve) => {
            Image.getSize(item.uri, (width, height) =>
              resolve({
                height,
                width,
                ratio: height / width,
              }),
            )
          })
          return {...result, ...item}
        }),
      )

      const sum = [0, 0]

      const res: Array<Array<IImageWithSize>> = [[], []]

      imagesWithSize.forEach((item: IImageWithSize) => {
        const min = Math.min(...sum)
        const index = sum.indexOf(min)

        res[index].push(item)

        sum[index] += item.ratio
      })
      if (!cleanupFunction) {
        setColumns(res)
      }

      return () => (cleanupFunction = true)
    })()
  }, [picturesArray])

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

  const imagesColumns = columns.map((column, index) => (
    <View key={index} style={{width: '49%', marginRight: 5}}>
      {column.map((item: IImageWithSize) => {
        return (
          <>
            <TouchableOpacity
              onPress={() => {
                setShowModal(true)
                setCurrentItem(item)
              }}>
              <FastImage
                onLoadStart={() => {
                  setLoading(true)
                }}
                onLoadEnd={() => {
                  setLoading(false)
                }}
                key={item.id}
                style={{
                  width: columnWidth,
                  height: item.ratio * columnWidth,
                  margin: 1,
                }}
                source={{
                  uri: `${item.uri}`,
                }}>
                {getLikeComponent(item.id)}
              </FastImage>
            </TouchableOpacity>
            <Modal
              isVisible={showModal}
              swipeDirection={['up', 'down']}
              onSwipeComplete={() => {
                setShowModal(false)
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  backgroundColor: 'rgba(52, 52, 52, 0.8)',
                }}>
                <FastImage
                  style={{
                    width: Dimensions.get('window').width * 0.9,
                    height:
                      currentItem?.ratio * Dimensions.get('window').width * 0.9,
                    margin: 1,
                  }}
                  source={{
                    uri: `${currentItem?.uri}`,
                  }}
                />
              </View>
            </Modal>
          </>
        )
      })}
    </View>
  ))

  return (
    <SafeAreaView style={detailStyles.container}>
      <ActivityIndicator
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        }}
        size="large"
        color="black"
        animating={loading}
      />
      <FlatList
        keyExtractor={(index) => index.toString()}
        data={imagesColumns}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
            }}>
            <View style={{width: '49%', marginRight: 5}}>{item}</View>
          </View>
        )}
        numColumns={2}
      />
    </SafeAreaView>
  )
}
