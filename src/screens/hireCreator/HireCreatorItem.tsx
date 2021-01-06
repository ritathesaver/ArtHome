/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react'
import {
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import { styles } from './styles'
import NextIcon from '../../assets/icons/next.svg'

interface IHireCreatorItemProps {
  itemId: string
  onPress: any
}


export const HireCreatorItem: FunctionComponent<IHireCreatorItemProps> = ({ itemId, onPress }) => {

  const user = useSelector((state: RootState) =>
    state.users.users.find((u) => u.id === itemId),
  )

  return (
    
       <View
            style={{
              ...styles.wrapper,
              width: Dimensions.get('window').width,
            }}>
            <View style={styles.infoWrapper}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: user?.avatarUri}} />
              </View>
              <View style={{flexDirection: 'column', marginLeft: 5}}>
                <Text style={styles.title}>{user?.name}</Text>
                <Text style={styles.title}>
                  {user?.specialization.map((spec) => spec + ' ')}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={onPress}>
              <View style={{height: '100%', justifyContent: 'center'}}>
                <NextIcon />
              </View>
            </TouchableOpacity>
          </View>
    
  )
}
