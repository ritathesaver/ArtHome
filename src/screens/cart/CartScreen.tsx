/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useCallback, useEffect, useRef} from 'react'
import {
  Animated,
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
import {getUserById} from '../../redux/actions/usersActions'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {RootState} from '../../redux/rootReducer'
import {useState} from 'react'
import {IPictures} from '../../redux/reducers/picturesReducer'
import {GetLike} from '../../components/GetLike/GetLike'
import {ActivityIndicator} from 'react-native'
import {deleteLike, putLike} from '../../redux/actions/likesActions'
import {putOrder} from '../../redux/actions/ordersActions'
import AddCartAction from '../../assets/icons/addingCart.svg'

interface ICartProps {
  route: any
}

export const CartScreen: FunctionComponent<ICartProps> = ({route}) => {
  // console.log(route.params)
  const [loading, setLoading] = useState(true)
  const dispatch: AppDispatch = useDispatch()
  const picture: IPictures | undefined = useSelector(
    (state: RootState) =>
      state.pictures.pictures.filter((pic) => pic.id === route.params.id)[0],
  )

  const authId = useSelector((state: RootState) => state.auth.id)

  const onPressLike = useCallback(
    (pictureId: string, like: {id: string}) => {
      console.log(pictureId, 'item')
      like
        ? dispatch(deleteLike(like.id))
        : dispatch(putLike(pictureId, authId))
    },
    [authId, dispatch],
  )

  const addToCart = useCallback(
    (pictureUri: string, picturePrice: string) => {
      dispatch(putOrder(pictureUri, picturePrice, authId))
    },
    [authId, dispatch],
  )

  useEffect(() => {
    dispatch(getUserById(picture.creatorId))
  }, [dispatch, picture.creatorId])

  const userName = useSelector(
    (state: RootState) =>
      state.users.users.find((u) => u.id === picture.creatorId)?.name,
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

  //console.log(size, 'size')

  const fadeAnim = useRef(new Animated.Value(0)).current

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 100,
      useNativeDriver: true,
    }).start()

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 3000,
        useNativeDriver: true,
      }).start()
    }, 500)
  }

  return (
    <SafeAreaView style={styles.container}>
      {loading && (
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
      )}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.wrapper}>
        <FastImage
          onLoadEnd={() => {
            setLoading(false)
          }}
          style={{
            width: Dimensions.get('window').width * 0.85,
            height: Dimensions.get('window').width * size.ratio * 0.85,
          }}
          source={{uri: picture.uri}}>
          <GetLike onPress={onPressLike} itemId={picture.id} />
        </FastImage>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: '100%',
            marginTop: 10,
          }}>
          <Text style={{color: '#f7f7f7'}}> by {userName}</Text>
          <View style={{alignItems: 'flex-end'}}>
            <Text style={{color: '#f7f7f7'}}>
              Size - {size.width} x {size.height}
            </Text>
            <Text style={styles.price}>Price: ${picture.price}</Text>
          </View>
        </View>

        <View>
          <Text style={styles.description}>{picture.description}</Text>
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            addToCart(picture.uri, picture.price)
            fadeIn()
          }}>
          <Text style={styles.submitButtonText}>Add to cart</Text>
        </TouchableOpacity>
        <Animated.View
          style={{
            alignItems: 'center',
            opacity: fadeAnim, // Bind opacity to animated value
          }}>
          <Text style={{fontSize: 17, marginVertical: 10, color: '#f7f7f7'}}>
            Added to cart!
          </Text>
          <AddCartAction />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  )
}
