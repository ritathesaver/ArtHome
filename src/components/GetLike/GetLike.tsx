/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useCallback} from 'react'
import {TouchableOpacity} from 'react-native'
import {useSelector} from 'react-redux'
import LikeActiveSvg from '../../assets/icons/heart (2).svg'
import LikeSvg from '../../assets/icons/like (1).svg'
import {RootState} from '../../redux/rootReducer'

interface IGetLikeProps {
  onPress: any
  itemId: string
}

export const GetLike: FunctionComponent<IGetLikeProps> = ({
  itemId,
  onPress,
}) => {
  const likes = useSelector((state: RootState) => state.likes.likes)
  const authId = useSelector((state: RootState) => state.auth.id)

  const like = likes.find(
    (l) => l.creatorId === authId && l.pictureId === itemId,
  )

  const onLikePress = useCallback(() => {
    onPress(itemId, like)
  }, [itemId, like, onPress])

  return (
    <TouchableOpacity
      onPress={onLikePress}
      style={{position: 'absolute', top: 10, right: 10}}>
      {like ? <LikeActiveSvg /> : <LikeSvg />}
    </TouchableOpacity>
  )
}
