/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react'
import { Dimensions } from 'react-native'
import {Image, Text, TouchableOpacity} from 'react-native'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {styles} from './styles'

interface ICreatorItemProps {
  itemId: string
  onPress: any
}

export const CreatorItem: FunctionComponent<ICreatorItemProps> = ({
  itemId,
  onPress,
}) => {
  const user = useSelector((state: RootState) =>
    state.users.users.find((u) => u.id === itemId),
  )


  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'column',
        margin: 20,
        width:  Dimensions.get('window').width/3-40,
        height: Dimensions.get('window').width/3-40,
        alignItems: 'center',
      }}>
      <Image style={styles.image} source={{uri: user?.avatarUri}} />
      <Text style={styles.title}>{user?.name}</Text>
    </TouchableOpacity>
  )
}
