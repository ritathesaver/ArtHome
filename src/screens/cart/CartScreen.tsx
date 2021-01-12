/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useCallback, useEffect} from 'react'
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
import {getUserById} from '../../redux/actions/usersActions'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {RootState} from '../../redux/rootReducer'
import {useState} from 'react'
import {IPictures} from '../../redux/reducers/picturesReducer'
import {GetLike} from '../../components/GetLike/GetLike'
import {ActivityIndicator} from 'react-native'
import {deleteLike, putLike} from '../../redux/actions/likesActions'

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

  console.log(loading)

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
          onPress={() => console.log('rr')}>
          <Text style={styles.submitButtonText}>Buy</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
