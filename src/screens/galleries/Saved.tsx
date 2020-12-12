import React, {FunctionComponent, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {Gallery} from '../../components/Gallery/Gallery'
import { getLikes } from '../../redux/actions/likesActions'
import { getPictures } from '../../redux/actions/picturesActions'
import {RootState} from '../../redux/rootReducer'

export const Saved: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()
  const authId = useSelector((state: RootState) => state.auth.id)

  useEffect(() => {
    dispatch(getLikes())
      dispatch(getPictures())
  }, [dispatch])

  const likedPicturesIds = useSelector((state: RootState) => state.likes.likes.filter(likes => likes.creatorId === authId).map(likes => likes.pictureId))

  const pictures = useSelector((state: RootState) => state.pictures.pictures)

  const likedPictures = pictures.filter(pic => {
    return likedPicturesIds.find(id => id === pic.id)
  })

  console.log(likedPictures, 'aa')


  //console.log(pictures)

  return (
    <>
      <Gallery picturesArray={likedPictures} />
    </>
  )
}