import React, {FunctionComponent, useEffect} from 'react'
import { ActivityIndicator, View, Alert } from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {Gallery} from '../../components/Gallery/Gallery'
import {getPictures} from '../../redux/actions/picturesActions'
import {RootState} from '../../redux/rootReducer'

export const GalleryAll: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    try {
      dispatch(getPictures())
    }
    catch {
      Alert.alert('Error while loading', 'Check your internet connection')
    }
  }, [dispatch])

  const loading = useSelector((state: RootState) => state.pictures.loading)
  // console.log(loading)
  const pictures = useSelector((state: RootState) => state.pictures.pictures)
  //console.log(pictures)
  if (loading) {
    return <View style={{flex:1 }}><ActivityIndicator size="large" color="#f8b500" /></View>
	}

  return (
    <>
     <Gallery picturesArray={pictures} />
    </>
  )
}
