/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect} from 'react'
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import FastImage from 'react-native-fast-image'
import {styles} from './styles'
import LikeActiveSvg from '../../assets/icons/heart (2).svg'
import {getUserById} from '../../redux/actions/usersActions'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {RootState} from '../../redux/rootReducer'

interface ICartProps {
  route: any
}

export const CartScreen: FunctionComponent<ICartProps> = ({route}) => {
  console.log(route.params)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserById(route.params.creatorId))
  }, [dispatch, route.params.creatorId])

  const userName = useSelector(
    (state: RootState) => state.users.users.map((user) => user.name)[0],
  )
  console.log(userName)
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}>
        <FastImage
          style={{
            width: Dimensions.get('window').width * 0.85,
            height: Dimensions.get('window').width * route.params.ratio * 0.85,
          }}
          source={{uri: route.params.uri}}>
          <LikeActiveSvg style={{position: 'absolute', top: 10, right: 10}} />
        </FastImage>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginTop: 10,
          }}>
          <Text>by {userName}</Text>
          <View style={{alignItems: 'flex-end'}}>
            <Text>
              Size - {route.params.width} x {route.params.height}
            </Text>
            <Text style={styles.price}>Price: {route.params.price} BYN</Text>
          </View>
        </View>

        <View>
          <Text style={styles.description}>{route.params.description}</Text>
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => console.log('rr')}>
          <Text style={styles.submitButtonText}>Buy</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
