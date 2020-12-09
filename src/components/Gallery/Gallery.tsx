/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect, useState} from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'
import {detailStyles} from './styles'
import {Dimensions} from 'react-native'
import FastImage from 'react-native-fast-image'
import LikeActiveSvg from '../../assets/icons/heart (2).svg'
import {IPictures} from '../../redux/reducers/picturesReducer'

interface IDetailsProps {
  picturesArray: IPictures[]
}

export interface IImageSize {
  height: number
  width: number
  ratio: number
}

export interface IImageWithSize extends IPictures, IImageSize {}

const columnWidth: number = Dimensions.get('window').width / 2

export const Gallery: FunctionComponent<IDetailsProps> = (picturesArray) => {
  const [columns, setColumns] = useState<Array<Array<IImageWithSize>>>([[], []])

  console.log(picturesArray.picturesArray, 'arrrr')

  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const imagesWithSize: IImageWithSize[] = await Promise.all(
        picturesArray.picturesArray.map(async (item: IPictures) => {
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
  }, [picturesArray])

  const imagesColumns = columns.map((column, index) => (
    <View key={index} style={{width: '49%', marginRight: 5}}>
      {column.map((item: IImageWithSize) => {
        return (
          <FastImage
            key={item.id}
            style={{
              width: columnWidth,
              height: item.ratio * columnWidth,
              margin: 1,
            }}
            source={{
              uri: `${item.uri}`,
            }}>
            <TouchableOpacity>
              <LikeActiveSvg
                style={{position: 'absolute', top: 10, right: 10}}
              />
            </TouchableOpacity>
          </FastImage>
        )
      })}
    </View>
  ))

  return (
    <SafeAreaView style={detailStyles.container}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}>
          <View style={{width: '49%', marginRight: 5}}>{imagesColumns[0]}</View>
          <View style={{width: '49%'}}>{imagesColumns[1]}</View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
