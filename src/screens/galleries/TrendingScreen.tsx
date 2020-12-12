import React, {FunctionComponent, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {Gallery} from '../../components/Gallery/Gallery'
import { getLikes } from '../../redux/actions/likesActions'
import {RootState} from '../../redux/rootReducer'

export const TrendingScreen: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getLikes())
  }, [dispatch])

  const likedPicturesIds = useSelector((state: RootState) => state.likes.likes.map(likes => likes.pictureId))
  const pictures = useSelector((state: RootState) => state.pictures.pictures)

  const counts = likedPicturesIds.reduce((prev: any, cur: string) => {
    
    prev[cur] = (prev[cur] || 0) + 1
    
  return prev
  }, {})
  
  const sortedCounts = Object.keys(counts).sort( (a, b) => { return counts[b] - counts[a] })
  
   const mostLikedPictures = pictures.filter(pic => {
    return sortedCounts.find(id => id === pic.id)
     }).sort((a, b) => {  
        return sortedCounts.indexOf(a.id) - sortedCounts.indexOf(b.id)
  })

  return (
    <>
      <Gallery picturesArray={mostLikedPictures}></Gallery>
    </>
  )
}