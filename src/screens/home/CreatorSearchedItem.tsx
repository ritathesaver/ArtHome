/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react'
import {Text, TouchableOpacity} from 'react-native'
import {useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import FastImage from 'react-native-fast-image'

interface ICreatorSearchedItemProps {
  itemId: string
  onPress: any
}

export const CreatorSearchedItem: FunctionComponent<ICreatorSearchedItemProps> = ({
  itemId,
  onPress,
}) => {
  const user = useSelector((state: RootState) =>
    state.users.users.find((u) => u.id === itemId),
  )

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{alignItems: 'center', justifyContent: 'center'}}>
      <FastImage
        style={{width: 70, height: 70, borderRadius: 35}}
        source={{uri: user?.avatarUri}}
      />
      <Text
        numberOfLines={1}
        style={{color: '#f7f7f7', width: 70, paddingTop: 8}}>
        {user?.name}
      </Text>
    </TouchableOpacity>
  )
}
