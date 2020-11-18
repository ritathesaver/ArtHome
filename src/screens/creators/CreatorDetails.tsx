
import React, {FunctionComponent, useEffect, useState} from 'react'
import {Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View} from 'react-native'
import {detailStyles} from './styles'
import {Dimensions} from 'react-native'
import SearchBox from '../../components/SearchBox/SearchBox'
import FastImage from 'react-native-fast-image'
import LikeActiveSvg from '../../assets/icons/heart (2).svg'

interface IDetailsProps {
  route: any
}

export interface IImage {
  id: string
  url: string
}

export interface IImageSize {
  height: number
  width: number
  ratio: number
}

export interface IImageWithSize extends IImage, IImageSize {}

const columnWidth: number = Dimensions.get('window').width / 2

export const CreatorDetails: FunctionComponent<IDetailsProps> = ({route}) => {
  const [columns, setColumns] = useState<Array<Array<IImageWithSize>>>([[], []])

  console.log(route.params)

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const imagesWithSize: IImageWithSize[] = await Promise.all(
       route?.params.pictures.map(
        async (item: IImage) => {
           const result: IImageSize = await new Promise((resolve) => {
            Image.getSize(item.url, (width, height) =>
              resolve({
                height,
                width,
                ratio: height / width,
              }),
            )
          })
          return {...result, ...item}
        },
        ))
      
      const sum = [0, 0]

      const res: Array<Array<IImageWithSize>> = [[], []]

      imagesWithSize.forEach((item: IImageWithSize) => {
        const min = Math.min(...sum)
        const index = sum.indexOf(min)

        res[index].push(item)

        sum[index] += item.ratio
      })

      setColumns(res)
  
    })()
  }, [route.params.pictures])
 

  const imagesColumns = columns.map((column, index) => (
    <View key={index} style={{width: '49%', marginRight:5}}>
      {column.map((item: IImageWithSize) => {
        return (
          <FastImage
            key={item.id}
            style={{
              width: columnWidth,
              height: item.ratio * columnWidth,
              margin: 1
            }}
            source={{
              uri: `${item.url}`,
            }}>
            <TouchableOpacity>
              <LikeActiveSvg style={{ position: 'absolute', top: 10, right: 10 }} />
            </TouchableOpacity>
          </FastImage>
            
        )
      })}
    </View>
  ))


  return (
    <SafeAreaView style={detailStyles.container}>
      <ScrollView >
        <View style={{flex: 1,
         flexDirection: 'row',
         flexWrap: 'wrap',
         alignItems: 'flex-start'}}>
      <View style={{width: '49%', marginRight:5}}>{imagesColumns[0]}</View>
      <View style={{width: '49%'}}>{imagesColumns[1]}</View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}
