/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect} from 'react'
import {Text, View} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {Gallery} from '../../components/Gallery/Gallery'
import {getPicturesByUser} from '../../redux/actions/picturesActions'
import {RootState} from '../../redux/rootReducer'

export const MyGallery: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()
  const authId = useSelector((state: RootState) => state.auth.id)
  const pictures = useSelector((state: RootState) =>
    state.pictures.pictures.filter((pic) => pic.creatorId === authId),
  )

  useEffect(() => {
    dispatch(getPicturesByUser(authId))
  }, [dispatch])

  //console.log(pictures)

  return (
    <>
      {pictures.length ? (
        <Gallery picturesArray={pictures} />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#202122',
          }}>
          <Text style={{color: '#f7f7f7'}}>No pictures found</Text>
        </View>
      )}
    </>
  )
}
