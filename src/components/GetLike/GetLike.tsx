/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useCallback, useEffect} from 'react'
import {TouchableOpacity} from 'react-native'
import {getLikes, putLike, deleteLike} from '../../redux/actions/likesActions'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {AppDispatch} from '../../App'
import LikeActiveSvg from '../../assets/icons/heart (2).svg'
import LikeSvg from '../../assets/icons/like (1).svg'

interface IGetLikeProps {
  itemId: string
}

export const GetLike: FunctionComponent<IGetLikeProps> = ({itemId}) => {
  const authId = useSelector((state: RootState) => state.auth.id)
  const dispatch: AppDispatch = useDispatch()
  const likes = useSelector((state: RootState) => state.likes.likes)
  const like = likes.find(
    (l) => l.creatorId === authId && l.pictureId === itemId,
  )

  useEffect(() => {
    dispatch(getLikes())
  }, [dispatch])

  const onLike = useCallback(
    (id) => {
      dispatch(putLike(id, authId))
    },
    [dispatch, authId],
  )

  const onDislike = useCallback(
    (likeId) => {
      console.log('deleteLike', likeId)
      dispatch(deleteLike(likeId))
    },
    [dispatch],
  )

  return like ? (
    <TouchableOpacity
      style={{position: 'absolute', top: 10, right: 10}}
      onPress={() => onDislike(like.id)}>
      <LikeActiveSvg />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      onPress={() => onLike(itemId)}
      style={{position: 'absolute', top: 10, right: 10}}>
      <LikeSvg />
    </TouchableOpacity>
  )
}
