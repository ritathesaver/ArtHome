/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect} from 'react'
import {
  Dimensions,
  Image,
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
import {useState} from 'react'

interface ICartProps {
  route: any
}

export const CartScreen: FunctionComponent<ICartProps> = ({route}) => {
  // console.log(route.params)
  const dispatch: AppDispatch = useDispatch()
  const picture = useSelector(
    (state: RootState) =>
      state.pictures.pictures.find(
        (picture) => picture.id === route.params.id,
      ) || {},
  )

  useEffect(() => {
    dispatch(getUserById(picture.creatorId))
  }, [dispatch, picture.creatorId])

  const userName = useSelector(
    (state: RootState) => state.users.users.map((user) => user.name)[0],
  )

  const [size, setSize] = useState({height: 0, width: 0, ratio: 0})

  useEffect(() => {
    Image.getSize(picture.uri, (width, height) =>
      setSize({
        height,
        width,
        ratio: height / width,
      }),
    )
    //setSize(result)
  }, [picture.uri])

  console.log(size, 'size')

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}>
        <FastImage
          style={{
            width: Dimensions.get('window').width * 0.85,
            height: Dimensions.get('window').width * size.ratio * 0.85,
          }}
          source={{uri: picture.uri}}>
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
              Size - {size.width} x {size.height}
            </Text>
            <Text style={styles.price}>Price: {picture.price} BYN</Text>
          </View>
        </View>

        <View>
          <Text style={styles.description}>{picture.description}</Text>
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
