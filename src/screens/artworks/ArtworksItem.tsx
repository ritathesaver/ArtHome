/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect} from 'react'
import { View, Text, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../App'
import { getPictures } from '../../redux/actions/picturesActions'
import { getUsers } from '../../redux/actions/usersActions'
import { RootState } from '../../redux/rootReducer'

interface IArtworksItemProps {
  onPress: any
  itemId: string
  getLikeComponent: any
}


export const ArtworksItem: FunctionComponent<IArtworksItemProps> = ({onPress, itemId, getLikeComponent}) => {
  const columnWidth: number = Dimensions.get('window').width * 0.9
  const dispatch: AppDispatch = useDispatch()

   useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const users = useSelector((state: RootState) =>
    state.users.users.map((user) => user),
  )

  const picture = useSelector((state: RootState) =>
    state.pictures.pictures.find(pic => pic.id === itemId)
  )


    return (
    <TouchableOpacity
              onPress={onPress} >
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
                  source={{uri: picture?.uri}}>
                  {getLikeComponent()}
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
                    by @{users.find((user:any) => user.id === picture?.creatorId)?.name}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
  )
}
