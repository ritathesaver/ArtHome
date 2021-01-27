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
import {useCallback} from 'react'
import { useNavigation } from '@react-navigation/native'

export const CartList: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()
  const authId = useSelector((state: RootState) => state.auth.id)
  const navigation = useNavigation()

  useEffect(() => {
    dispatch(getOrders())
  }, [dispatch])

  const orders = useSelector((state: RootState) =>
    state.orders.orders.filter((order) => order.creatorId === authId),
  )

 

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
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#f7f7f7',
                }}>
                Price: {`$${item.picturePrice}`}
              </Text>
              {item.onPaid ? (
                <TouchableOpacity
                  style={{
                    width: '100%',
                    marginVertical: 20,
                    padding: 12,
                    borderRadius: 8,
                    backgroundColor: '#af6b58',
                  }}
                  onPress={() => navigation.navigate('Orders')}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 13,
                    }}>
                    SEE IN ORDERS
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
