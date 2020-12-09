import React, {FunctionComponent, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {Gallery} from '../../components/Gallery/Gallery'
import {getPictures} from '../../redux/actions/picturesActions'
import {RootState} from '../../redux/rootReducer'

export const GalleryAll: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getPictures())
  }, [dispatch])

  const pictures = useSelector((state: RootState) => state.pictures.pictures)
  //console.log(pictures)

  return (
    <>
      <Gallery picturesArray={pictures} />
    </>
  )
}
