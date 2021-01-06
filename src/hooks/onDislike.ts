import { useCallback } from 'react'
import {useDispatch} from 'react-redux'
import { AppDispatch } from '../App'
import { deleteLike } from '../redux/actions/likesActions'

export const useOnDislike = (likeId: string) => {
  const dispatch: AppDispatch = useDispatch()

  const onDislike = useCallback(
    () => {
      dispatch(deleteLike(likeId))
    },
    [dispatch],
  )
  
  return onDislike 
}