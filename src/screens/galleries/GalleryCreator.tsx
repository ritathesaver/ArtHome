import React, {FunctionComponent, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {Gallery} from '../../components/Gallery/Gallery'
import {getPicturesByUser} from '../../redux/actions/picturesActions'
import {RootState} from '../../redux/rootReducer'

interface ICreatorPageProps {
  route: any
}
export const GalleryCreator: FunctionComponent<ICreatorPageProps> = ({
  route,
}) => {
  // console.log(route.params.id)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getPicturesByUser(route.params.id))
  }, [dispatch, route.params.id])

  const pictures = useSelector((state: RootState) => state.pictures.pictures)
  //console.log(pictures)

  return (
    <>
      <Gallery picturesArray={pictures} />
    </>
  )
}
