import React, {FunctionComponent} from 'react'
import {
  Image,
  Text,
  View,
} from 'react-native'
import {pageStyles, styles} from './styles'


interface ICreatorPageProps{
  route: any
}


export const AboutCreatorScreen: FunctionComponent<ICreatorPageProps> = ({route}) => {
  //console.log(route, 'ff')

  return (
    <View style={pageStyles.container}>
      <View style={pageStyles.infoWrapper}>
              <View style={pageStyles.imageContainer}>
                <Image style={styles.image} source={{uri: route.avatar.uri}} />
              </View>
              <View style={{flexDirection: 'column', marginLeft: 5, justifyContent: 'center'}}>
                <Text style={styles.title}>{route.name}</Text>
                <Text style={styles.title}>Painter</Text>
              </View>
      </View>
      <View style={pageStyles.line}></View>
    </View>
      
  )
}
