import { useCallback } from 'react'
import {useDispatch} from 'react-redux'
import { AppDispatch } from '../App'
import { putLike } from '../redux/actions/likesActions'

export const useOnLike = (id: string, authId: string) => {
  const dispatch: AppDispatch = useDispatch()

   const onLike = useCallback(
    () => {
      dispatch(putLike(id, authId))
    },
    [dispatch],
   )
 
  return onLike 
}