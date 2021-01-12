/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react'
import {Image, ScrollView, Text, View} from 'react-native'
import {pageStyles} from './styles'

interface ICreatorPageProps {
  route: any
}

export const AboutCreatorScreen: FunctionComponent<ICreatorPageProps> = ({
  route,
}) => {
  return (
    <ScrollView style={pageStyles.container}>
      <View style={{alignItems: 'center', width: '100%'}}>
        <View style={pageStyles.imageContainer}>
          <Image style={pageStyles.image} source={{uri: route.avatarUri}} />
        </View>
      </View>
      <Text style={pageStyles.nameTitle}> {route.name}</Text>

      <View style={{justifyContent: 'center', marginLeft: 15}}>
        <View style={pageStyles.box}>
          <Text style={pageStyles.aboutText}>{route.address}</Text>
        </View>
        <View style={pageStyles.box}>
          <Text style={pageStyles.aboutText}>{route.email}</Text>
        </View>
        <View style={pageStyles.box}>
          <Text style={pageStyles.aboutText}>{route.phone}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {route.specialization.map((item: any, index: number) => (
          <View
            key={index}
            style={{
              borderRadius: 10,
              borderWidth: 1,
              margin: 15,
              padding: 10,
              borderColor: '#f7f7f7',
            }}>
            <Text style={{color: '#f7f7f7'}}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={pageStyles.aboutWrapper}>
          <View style={pageStyles.line} />
          <Text style={pageStyles.title}>About Me</Text>
          <Text style={pageStyles.aboutText}>{route.about}</Text>
        </View>
    </ScrollView>
  )
}
