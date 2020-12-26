/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react'
import {Image, Text, View} from 'react-native'
import {pageStyles} from './styles'
import LocSvg from '../../assets/icons/location.svg'
import PhoneSvg from '../../assets/icons/phone-call (1).svg'
import MailSvg from '../../assets/icons/email.svg'

interface ICreatorPageProps {
  route: any
}

export const AboutCreatorScreen: FunctionComponent<ICreatorPageProps> = ({
  route,
}) => {
  return (
    <View style={pageStyles.container}>
      <View style={{alignItems: 'center', width: '100%'}}>
        <View style={pageStyles.imageContainer}>
          <Image style={pageStyles.image} source={{uri: route.avatarUri}} />
        </View>
      </View>
      <Text style={pageStyles.title}> {route.name}</Text>

      <View style={{justifyContent: 'center', marginLeft: 15}}>
        <View style={pageStyles.box}>
          <LocSvg />
          <Text style={pageStyles.aboutText}>{route.address}</Text>
        </View>
        <View style={pageStyles.box}>
          <MailSvg />
          <Text style={pageStyles.aboutText}>{route.email}</Text>
        </View>
        <View style={pageStyles.box}>
          <PhoneSvg />
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
              borderColor: '#af6b58',
            }}>
            <Text style={{color: '#f7f7f7'}}>{item}</Text>
          </View>
        ))}
      </View>

      <View style={pageStyles.aboutWrapper}>
        <View>
          <View style={pageStyles.line} />
          <Text style={pageStyles.title}>ABOUT ME</Text>
          <Text style={pageStyles.aboutText}>{route.about}</Text>
        </View>
      </View>
    </View>
  )
}
