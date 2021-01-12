/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import FastImage from 'react-native-fast-image'

interface ICreatorSearchedItemProps {
  itemId: string
  onPress: any
}

export const PictureSearchedItem: FunctionComponent<ICreatorSearchedItemProps> = ({
  itemId,
  onPress,
}) => {
  const picture = useSelector((state: RootState) =>
    state.pictures.pictures.find((pic) => pic.id === itemId),
  )

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
      }}>
      <FastImage
        style={{width: 120, height: 120, borderRadius: 8}}
        source={{uri: picture?.uri}}
      />
      <View
        style={{
          flex: 1,
          paddingLeft: 16,
        }}>
        <Text
          numberOfLines={3}
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#f7f7f7',
            paddingBottom: 6,
          }}>
          {picture?.title}
        </Text>
        <Text style={{color: '#f7f7f7'}}>{picture?.description}</Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: '#f7f7f7',
          paddingLeft: 16,
        }}>
        {`$${picture?.price}`}
      </Text>
    </TouchableOpacity>
  )
}
