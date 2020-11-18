/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react'
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import FastImage from 'react-native-fast-image'
import { styles } from './styles'
import LikeActiveSvg from '../../assets/icons/heart (2).svg'

interface ICartProps {
  route: any
}

export const CartScreen: FunctionComponent<ICartProps> = ({route}) => {
  const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.wrapper} >

        <FastImage style={{width: Dimensions.get('window').width*0.85, height: (Dimensions.get('window').width * route.params.ratio)*0.85}} source={{ uri: route.params.url }}>
          <LikeActiveSvg style={{ position: 'absolute', top: 10, right: 10 }}/>
        </FastImage>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                
          <Text>by @creator</Text>
          <View style={{ alignItems: 'flex-end'}}>    
            <Text>Size - {route.params.width} x {route.params.height}</Text>
            <Text style={styles.price}>Price: 5$</Text>
          </View>
        </View>
        
       <View>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vestibulum, libero sed aliquet condimentum, tellus nunc fringilla mauris, at tempor.</Text>
        </View>
        <TouchableOpacity
            style={styles.submitButton}
            onPress={()=> console.log('rr')}>
            <Text style={styles.submitButtonText}>Buy</Text>
        </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
  )
}
