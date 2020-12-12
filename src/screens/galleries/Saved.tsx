import React, {FunctionComponent, useEffect} from 'react'
import { Text } from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {Gallery} from '../../components/Gallery/Gallery'
import { getLikes } from '../../redux/actions/likesActions'
import {RootState} from '../../redux/rootReducer'

export const Saved: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()
  const authId = useSelector((state: RootState) => state.auth.id)

  useEffect(() => {
    dispatch(getLikes())
  }, [dispatch])

  const likedPicturesIds = useSelector((state: RootState) => state.likes.likes.filter(likes => likes.creatorId === authId).map(likes => likes.pictureId))

  const pictures = useSelector((state: RootState) => state.pictures.pictures)

  const likedPictures = pictures.map(pic => {
    likedPicturesIds.filter(id => id === pic.id)
  })
  console.log(likedPictures)
  

  //console.log(pictures)

  return (
    <>
      <Text>kek</Text>
    </>
  )
}