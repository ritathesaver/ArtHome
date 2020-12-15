/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import SearchBox from '../../components/SearchBox/SearchBox'
import {detailStyles} from './styles'
import {IImageWithSize, IImageSize} from '../creators/CreatorDetails'
import LikeActiveSvg from '../../assets/icons/heart (2).svg'
import FastImage from 'react-native-fast-image'
import {useNavigation} from '@react-navigation/native'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {getPicturesByCategory} from '../../redux/actions/picturesActions'
import {RootState} from '../../redux/rootReducer'
import {IPictures} from '../../redux/reducers/picturesReducer'

interface IDetailsProps {
  route: any
}
const columnWidth: number = Dimensions.get('window').width * 0.75

export const ArtworksDetails: FunctionComponent<IDetailsProps> = ({route}) => {
  const navigation = useNavigation()
  const dispatch: AppDispatch = useDispatch()
  const [search, setSearch] = useState('')

  const clearSearch = () => {
		setSearch('')
	}

  useEffect(() => {
    dispatch(getPicturesByCategory(route.params.id))
  }, [route.params.id, dispatch])

  const loading = useSelector((state: RootState) => state.pictures.loading)

  const pictures = useSelector((state: RootState) => state.pictures.pictures.filter(((pic) => pic.title.toLowerCase().includes(search.toLowerCase()))))



  // console.log(pictures, 'dddd')

  const [column, setColumn] = useState<Array<IImageWithSize>>([])



  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const imagesWithSize: IImageWithSize[] = await Promise.all(
        pictures.map(async (item: IPictures) => {
          // console.log(item)
          const result: IImageSize = await new Promise((resolve) => {
            Image.getSize(item.uri, (width, height) =>
              resolve({
                height,
                width,
                ratio: height / width,
              }),
            )
          })
          return {...result, ...item}
        }),
      )
      // console.log(imagesWithSize)
      setColumn(imagesWithSize)
    })()
  }, [pictures, route.params])


  return (
    <SafeAreaView style={detailStyles.container}>
      <SearchBox setSearch={setSearch} search={search} />
      {loading ? (
        <ActivityIndicator size="large" color="#af6b58" />
      ) : (
          <FlatList
            data={column}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => { clearSearch(); navigation.navigate('Cart', item)}}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  padding: 5,
                  width: Dimensions.get('window').width,
                  alignItems: 'center',
                }}>
                <FastImage
                  style={{
                    width: columnWidth,
                    height: item.ratio * columnWidth,
                    margin: 1,
                  }}
                  source={{ uri: item.uri }}>
                  <TouchableOpacity>
                    <LikeActiveSvg
                      style={{ position: 'absolute', top: 10, right: 10 }}
                    />
                  </TouchableOpacity>
                </FastImage>
                <View
                  style={{
                    alignItems: 'center',
                    width: Dimensions.get('window').width,
                  }}>
                  <Text>{item.title}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  )
}
