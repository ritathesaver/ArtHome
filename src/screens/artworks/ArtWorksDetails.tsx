import React, {FunctionComponent, useEffect, useState} from 'react'
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
import { detailStyles } from './styles'
import { IImageWithSize, IImageSize } from '../creators/CreatorDetails'
import LikeActiveSvg from '../../assets/icons/heart (2).svg'
import FastImage from 'react-native-fast-image'
import { useNavigation } from '@react-navigation/native'

interface IDetailsProps {
  route: any
}
const columnWidth: number = Dimensions.get('window').width * 0.75

export const ArtworksDetails: FunctionComponent<IDetailsProps> = ({ route }) => {
  const navigation = useNavigation()

  const [column, setColumn] = useState<Array<IImageWithSize>>([])

  const concatedArray  = [].concat.apply([], route.params)

  useEffect(() => {

    (async () => {
      const imagesWithSize: IImageWithSize[] = await Promise.all(
        concatedArray.map(
          async (item: any) => {
            console.log(item)
            const result: IImageSize = await new Promise((resolve) => {
              Image.getSize(item.url, (width, height) =>
                resolve({
                  height,
                  width,
                  ratio: height / width,
                }),
              )
            })
            return { ...result, ...item }
          },
        ))
      console.log(imagesWithSize)
      setColumn(imagesWithSize)
  })()
  }, [route.params])
    
  return (
    <SafeAreaView style={detailStyles.container}>
      <SearchBox />
      <FlatList
        keyExtractor={(column, index) => index.toString()}
        data={column}
        renderItem={({item}) => (
          <TouchableOpacity  onPress={() => navigation.navigate('Cart', item)}>
            <View
              style={{
                flex: 1,
                flexDirection: 'column',
                padding: 5,
                width: Dimensions.get('window').width,
                alignItems: 'center'
              }}>
             
                <FastImage
                  style={{
                    width: columnWidth,
                    height: item.ratio * columnWidth,
                    margin: 1,
                  }}
                  source={{ uri: item.url }}>
                  <TouchableOpacity>
                    <LikeActiveSvg style={{ position: 'absolute', top: 10, right: 10 }} />
                  </TouchableOpacity>
                </FastImage>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: Dimensions.get('window').width }}>
                
                    <Text>some description</Text>
                 
                    <Text>by @creator</Text>
                 
                </View>
              </View>
            
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}
