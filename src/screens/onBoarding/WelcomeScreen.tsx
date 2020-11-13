/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useState} from 'react'
import AppIntroSlider from 'react-native-app-intro-slider'
import {View, Button, Text, Image} from 'react-native'
import {RegisterScreen} from '../auth/RegisterScreen'
import {slides} from '../../assets/onBoarding/slides'
import {styles} from './styles'

export const WelcomeScreen: FunctionComponent = () => {
  const [showRealApp, setShowRealApp] = useState(false)

  const onDone = () => {
    setShowRealApp(true)
  }
  const onSkip = () => {
    setShowRealApp(true)
  }

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
          paddingTop: 60,
          height: '100%',
        }}>
        <View
          style={{
            alignItems: 'flex-end',
            marginBottom: 25,
            marginHorizontal: 16,
          }}>
          <Button color="#af6b58" title="Skip" onPress={onSkip} />
        </View>
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
    <>
      {showRealApp ? (
        <RegisterScreen />
      ) : (
        <AppIntroSlider
          data={slides}
          renderItem={RenderItem}
          onDone={onDone}
          bottomButton={true}
          renderNextButton={_renderNextButton}
          renderDoneButton={_renderDoneButton}
          activeDotStyle={{ backgroundColor: '#af6b58' }}
          dotStyle={{ backgroundColor: 'white' }}
        
        />
      )}
    </>
  )
}
