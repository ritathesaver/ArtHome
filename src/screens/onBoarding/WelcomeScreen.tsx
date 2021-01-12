/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import {slides} from '../../assets/onBoarding/slides'
import {styles} from './styles'

interface IWelcomeScreenProps {
  onFinish: () => void
}

export const WelcomeScreen: FunctionComponent<IWelcomeScreenProps> = ({
  onFinish,
}) => {
  const _renderNextButton = () => {
    return (
      <View style={styles.buttonNextContainer}>
        <Text style={styles.buttonNextText}>Next</Text>
      </View>
    )
  }

  const _renderDoneButton = () => {
    return (
      <View style={styles.buttonNextContainer}>
        <Text style={styles.buttonNextText}>Start</Text>
      </View>
    )
  }

  interface IProps {
    item: {
      key: string
      title: string
      text: string
      image: {uri: string}
      backgroundColor: string
    }
  }

  const RenderItem: FunctionComponent<IProps> = ({item}) => {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: item.backgroundColor,
          paddingBottom: 200,
          paddingTop: 30,
          height: '100%',
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'flex-end',
            marginBottom: 25,
            marginHorizontal: 16,
          }}
        />
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image style={styles.introImageStyle} source={item.image} />
        </View>
        <Text style={styles.introTitleStyle}>{item.title}</Text>
        <Text style={styles.introTextStyle}>{item.text}</Text>
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        onDone={onFinish}
        bottomButton
        renderNextButton={_renderNextButton}
        renderDoneButton={_renderDoneButton}
        activeDotStyle={{backgroundColor: '#af6b58'}}
        dotStyle={{backgroundColor: 'white'}}
      />
      <TouchableOpacity
        style={{position: 'absolute', top: 40, right: 25}}
        onPress={onFinish}>
        <Text style={{color: '#af6b58', fontSize: 18}}>Skip</Text>
      </TouchableOpacity>
    </View>
  )
}
