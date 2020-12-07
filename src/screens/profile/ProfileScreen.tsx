/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react'
import {Button, Image, Text, View} from 'react-native'
import {pageStyles} from './styles'
import LocSvg from '../../assets/icons/location.svg'
import PhoneSvg from '../../assets/icons/phone-call (1).svg'
import MailSvg from '../../assets/icons/email.svg'
import { RootState } from '../../redux/rootReducer'
import { useDispatch, useSelector } from 'react-redux'
import { IUsers } from '../../redux/reducers/usersReducer'
import { signOut } from '../../redux/actions/authActions'
import { AppDispatch } from '../../App'



export const ProfileScreen: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()
  const authId = useSelector((state: RootState) => state.auth.id)

  console.log(authId, 'auth')

  const currentUser = useSelector((state: RootState) => state.users.users.filter((user: IUsers) => user.id === authId)[0])


  return (
    <View style={pageStyles.container}>
      <View style={pageStyles.imageContainer}>
        <Image style={pageStyles.image} source={{uri: currentUser.avatarUri}} />
      </View>
      <Text style={pageStyles.title}> {currentUser.name}</Text>

      <View style={{justifyContent: 'center', marginLeft: 15}}>
        <View style={pageStyles.box}>
          <LocSvg />
          <Text style={pageStyles.aboutText}>{currentUser.address}</Text>
        </View>
        <View style={pageStyles.box}>
          <MailSvg />
          <Text style={pageStyles.aboutText}>{currentUser.email}</Text>
        </View>
        <View style={pageStyles.box}>
          <PhoneSvg />
          <Text style={pageStyles.aboutText}>{currentUser.phone}</Text>
        </View>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {currentUser.specialization.map((item: any) => (
          <View
            style={{
              borderRadius: 10,
              borderWidth: 1,
              margin: 15,
              padding: 10,
              borderColor: '#af6b58',
            }}>
            <Text>{item}</Text>
          </View>
        ))}
      </View>

      <View style={pageStyles.aboutWrapper}>
        <View>
          <View style={pageStyles.line} />
          <Text style={pageStyles.title}>ABOUT ME</Text>
          <Text style={pageStyles.aboutText}>{currentUser.about}</Text>
        </View>
      </View>
      <Button color="black" title="LOGOUT" onPress={() => dispatch(signOut())}></Button>
    </View>
  )
}
