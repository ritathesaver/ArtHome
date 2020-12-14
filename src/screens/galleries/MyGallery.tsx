import React, {FunctionComponent, useEffect} from 'react'
import { Text, View } from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {Gallery} from '../../components/Gallery/Gallery'
import {getPicturesByUser} from '../../redux/actions/picturesActions'
import {RootState} from '../../redux/rootReducer'

export const MyGallery: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()
  const authId = useSelector((state: RootState) => state.auth.id)
    const pictures = useSelector((state: RootState) => state.pictures.pictures)

  useEffect(() => {
    dispatch(getPicturesByUser(authId))
  }, [dispatch, pictures])


  //console.log(pictures)

  return (
    <>
      {pictures.length ? 
        <Gallery picturesArray={pictures} />
        : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No pictures found</Text>
       </View>)
      }
   
    </>
  )
}
