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
import {IPictures} from '../../redux/reducers/picturesReducer'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {getLikes} from '../../redux/actions/likesActions'
import {RootState} from '../../redux/rootReducer'
import {Text} from 'react-native'
import {getUserById} from '../../redux/actions/usersActions'
import {useNavigation} from '@react-navigation/native'
import MoreIcon from '../../assets/icons/next copy 2.svg'
import {GetLike} from '../GetLike/GetLike'

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
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const navigation = useNavigation()

  const [currentItem, setCurrentItem] = useState<IImageWithSize | undefined>()

  useEffect(() => {
    dispatch(getLikes())
  }, [dispatch])

  const getCreator = useCallback((id) => dispatch(getUserById(id)), [dispatch])

  const users = useSelector((state: RootState) => state.users.users)
  const [columns, setColumns] = useState<Array<Array<IImageWithSize>>>([[], []])
  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      let cleanupFunction = false
      const imagesWithSize: IImageWithSize[] = await Promise.all(
        picturesArray?.picturesArray.map(async (item: IPictures) => {
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

  const imagesColumns = columns.map((column, index) => (
    <View key={index.toString()} style={{width: '49%'}}>
      {column.map((item: IImageWithSize) => {
        return (
          <View key={item.id}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(true)
                setCurrentItem(item)
                getCreator(item.creatorId)
              }}>
              <FastImage
                onLoadStart={() => {
                  setLoading(true)
                }}
                onLoadEnd={() => {
                  setLoading(false)
                }}
                style={{
                  width: columnWidth,
                  height: item.ratio * columnWidth,
                }}
                source={{
                  uri: `${item.uri}`,
                }}>
                <GetLike itemId={item.id} />
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
                      // @ts-ignore: Object is possibly undefined
                      currentItem?.ratio * Dimensions.get('window').width * 0.9,
                    margin: 1,
                    justifyContent: 'flex-end',
                  }}
                  source={{
                    uri: `${currentItem?.uri}`,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'black',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{color: 'white', padding: 5}}>
                      by @{users.find((u) => u.id === item.creatorId)?.name}
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setShowModal(false)
                        navigation.navigate('Cart', currentItem)
                      }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{color: 'white', padding: 5}}>More</Text>
                        <MoreIcon />
                      </View>
                    </TouchableOpacity>
                  </View>
                </FastImage>
              </View>
            </Modal>
          </View>
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
        color="#af6b58"
        animating={loading}
      />
      <FlatList
        keyExtractor={(item, index) => item.key?.toString() || index.toString()}
        data={imagesColumns}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
            }}>
            <View style={{width: '49%'}}>{item}</View>
          </View>
        )}
        numColumns={2}
      />
    </SafeAreaView>
  )
}
