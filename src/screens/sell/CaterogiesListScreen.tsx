/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native'
import React, {FunctionComponent, useEffect} from 'react'
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {getCategories} from '../../redux/actions/cateroriesActions'
import {RootState} from '../../redux/rootReducer'

interface ISetCategoryProps {
  route: any
}

export const CategoriesListScreen: FunctionComponent<ISetCategoryProps> = ({
  route,
}) => {
  // console.log(route.params.uri)
  const navigation = useNavigation()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const categories = useSelector((state: RootState) =>
    state.categories.categories.map((category) => category),
  )

  return (
    <View style={{flex: 1, paddingHorizontal: 10, backgroundColor: '#202122'}}>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        data={categories}
        renderItem={({item}) => (
          <>
            <TouchableOpacity
              style={{width: '100%'}}
              onPress={() => {
                navigation.navigate('AddDetails', {
                  categoryId: item.id,
                  title: item.title,
                  uri: route.params.uri,
                  price: route.params.price,
                })
              }}>
              <View style={{backgroundColor: '#202122'}}>
                <Text
                  style={{fontSize: 20, paddingVertical: 15, color: '#f7f7f7'}}>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                borderBottomWidth: StyleSheet.hairlineWidth,
                borderColor: '#f7f7f7',
              }}
            />
          </>
        )}
      />
    </View>
  )
}
