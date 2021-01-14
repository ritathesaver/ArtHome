/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect} from 'react'
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {
  deleteOrder,
  editOrder,
  getOrders,
} from '../../redux/actions/ordersActions'
import {RootState} from '../../redux/rootReducer'
import DeleteIcon from '../../assets/icons/minus.svg'
import RNFetchBlob from 'rn-fetch-blob'
import {Alert} from 'react-native'
import CameraRoll from '@react-native-community/cameraroll'
import {useCallback} from 'react'

export const CartList: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()
  const {config, fs} = RNFetchBlob
  const authId = useSelector((state: RootState) => state.auth.id)

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  const orders = useSelector((state: RootState) =>
    state.orders.orders.filter((order) => order.creatorId === authId),
  )

  const onDownload = (imageUrl: string) => {
    let PictureDir = fs.dirs.PictureDir
    let options = {
      fileCache: true,
      appendExt: 'jpg',
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        path: PictureDir + '/image_' + Date.now() + '.jpg',
        description: 'Image',
      },
    }
    config(options)
      .fetch('GET', imageUrl)
      .then((res) => {
        CameraRoll.save(res.data)
        //Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res))
        Alert.alert('Congrats!', 'Image successfully downloaded ')
      })
  }

  const onDelete = useCallback(
    (itemId) => {
      dispatch(deleteOrder(itemId))
    },
    [dispatch],
  )

  const onUpdateStatus = useCallback(
    (item) => {
      dispatch(editOrder(item, true))
    },
    [dispatch],
  )

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#202122',
        paddingTop: 30,
      }}>
      <FlatList
        data={orders}
        renderItem={({item}) => (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              padding: 5,
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: 'rgba(52, 52, 52, 0.7)',
              height: 160,
              alignItems: 'center',
              marginVertical: 3,
              paddingHorizontal: 16,
              paddingVertical: 8,
            }}>
            <View style={{width: 150, height: '100%'}}>
              <FastImage
                style={{width: '100%', height: '100%', borderRadius: 8}}
                source={{uri: item.pictureUri}}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                marginLeft: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#f7f7f7',
                }}>
                Price: {`$${item.picturePrice}`}
              </Text>
              {item.status ? (
                <TouchableOpacity
                  style={{
                    width: '100%',
                    marginVertical: 20,
                    padding: 12,
                    borderRadius: 8,
                    backgroundColor: '#af6b58',
                  }}
                  onPress={() => onDownload(item.pictureUri)}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 13,
                    }}>
                    DOWNLOAD
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={{
                    width: '100%',
                    marginVertical: 20,
                    padding: 12,
                    borderRadius: 8,
                    backgroundColor: '#af6b58',
                  }}
                  onPress={() => onUpdateStatus(item)}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 14,
                    }}>
                    PAYMENT
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}
              onPress={() => onDelete(item.id)}>
              <DeleteIcon />
            </TouchableOpacity>
          </View>
        )}
        numColumns={1}
      />
    </SafeAreaView>
  )
}
