/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native'
import invert from 'invert-color'
import React, {FunctionComponent, useEffect} from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import SearchBox from '../../components/SearchBox/SearchBox'
import {styles} from './styles'
import {useDispatch, useSelector} from 'react-redux'
import {RootState} from '../../redux/rootReducer'
import {getCategories} from '../../redux/actions/cateroriesActions'
import {AppDispatch} from '../../App'

export const ArtworksScreen: FunctionComponent = () => {
  const navigation = useNavigation()
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  const categories = useSelector((state: RootState) =>
    state.categories.categories.map((category) => category),
  )

  return (
    <SafeAreaView style={styles.container}>
      <SearchBox />
      <FlatList
        data={categories}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'column',
              marginVertical: 15,
              marginHorizontal: 5,
              width: Dimensions.get('window').width / 2,
              height: 140,
            }}
            onPress={() => navigation.navigate('ArtworksDetails')}>
            <Image style={styles.image} source={{uri: item.coverUri}} />
            <View
              style={{
                backgroundColor: item.overlayColor,
                height: 45,
              }}>
              <Text
                style={{
                  ...styles.title,
                  color: `${invert(item.overlayColor, true)}`,
                }}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </SafeAreaView>
  )
}
