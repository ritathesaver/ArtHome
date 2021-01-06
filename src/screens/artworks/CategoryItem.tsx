/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react'
import {View, Text, Dimensions} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useSelector} from 'react-redux'
import invert from 'invert-color'
import {RootState} from '../../redux/rootReducer'
import FastImage from 'react-native-fast-image'
import {styles} from '../artworks/styles'

interface IArtworksItemProps {
  onPress: any
  itemId: string
}

export const CategoryItem: FunctionComponent<IArtworksItemProps> = ({
  onPress,
  itemId,
}) => {
  const category = useSelector((state: RootState) =>
    state.categories.categories.find((cat) => cat.id === itemId),
  )

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        flexDirection: 'column',
        marginVertical: 15,
        marginHorizontal: 5,
        width: Dimensions.get('window').width / 2,
        height: 140,
      }}
      onPress={onPress}>
      <FastImage style={styles.image} source={{uri: category?.coverUri}} />
      <View
        style={{
          backgroundColor: category?.overlayColor,
          height: 45,
        }}>
        <Text
          style={{
            ...styles.title,
            color: `${invert(category?.overlayColor || 'white', true)}`,
          }}>
          {category?.title}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
