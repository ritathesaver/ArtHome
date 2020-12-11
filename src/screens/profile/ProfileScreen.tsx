/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useCallback, useEffect, useState} from 'react'
import ImagePicker from 'react-native-image-picker'
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {pageStyles} from './styles'
import LocSvg from '../../assets/icons/location.svg'
import PhoneSvg from '../../assets/icons/phone-call (1).svg'
import MailSvg from '../../assets/icons/email.svg'
import {RootState} from '../../redux/rootReducer'
import {useDispatch, useSelector} from 'react-redux'
import {IUsers} from '../../redux/reducers/usersReducer'
import {signOut} from '../../redux/actions/authActions'
import {AppDispatch} from '../../App'
import {
  addSpecialization,
  editUserAvatar,
  getUsers,
} from '../../redux/actions/usersActions'
import AddSvg from '../../assets/icons/add.svg'

export const ProfileScreen: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()
  const authId = useSelector((state: RootState) => state.auth.id)
  const [text, setText] = useState('')
  const [inputActive, setInputActive] = useState(false)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const currentUser = useSelector(
    (state: RootState) =>
      state.users.users.filter((user: IUsers) => user.id === authId)[0],
  )

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }
    ImagePicker.launchImageLibrary(options, (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker')
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error)
      } else {
        dispatch(editUserAvatar(response.uri, currentUser))
      }
    })
  }

  const onAdd = useCallback(() => {
    if (text) {
      const newArr = currentUser.specialization.concat(text)
      dispatch(addSpecialization(newArr, currentUser))
    }

    setText('')
  }, [currentUser, dispatch, text])

  return (
    <View style={pageStyles.container}>
      <TouchableOpacity
        onPress={() => launchImageLibrary()}
        style={pageStyles.imageContainer}>
        <Image
          style={pageStyles.image}
          source={{uri: currentUser?.avatarUri}}
        />
      </TouchableOpacity>
      <Text style={pageStyles.title}> {currentUser?.name}</Text>

      <View style={{justifyContent: 'center', marginLeft: 15}}>
        <View style={pageStyles.box}>
          <LocSvg />
          <Text style={pageStyles.aboutText}>{currentUser?.address}</Text>
        </View>
        <View style={pageStyles.box}>
          <MailSvg />
          <Text style={pageStyles.aboutText}>{currentUser?.email}</Text>
        </View>
        <View style={pageStyles.box}>
          <PhoneSvg />
          <Text style={pageStyles.aboutText}>{currentUser?.phone}</Text>
        </View>
      </View>

      {currentUser?.specialization.length ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {currentUser?.specialization.map((item: string) => (
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
          <TouchableOpacity
            onPress={() => {
              setInputActive(true)
            }}>
            <AddSvg />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => {
              setInputActive(true)
            }}>
            <AddSvg />
          </TouchableOpacity>
          <Text>Add your specializations</Text>
          {inputActive && (
            <TextInput
              style={{
                borderRadius: 10,
                borderWidth: 1,
                margin: 15,
                padding: 10,
                borderColor: '#af6b58',
                width: '30%',
              }}
              onChangeText={setText}
              defaultValue={text}
              placeholder=""
              onSubmitEditing={onAdd}
            />
          )}
        </View>
      )}

      <View style={pageStyles.aboutWrapper}>
        <View>
          <View style={pageStyles.line} />
          <Text style={pageStyles.title}>ABOUT ME</Text>
          <Text style={pageStyles.aboutText}>{currentUser?.about}</Text>
        </View>
      </View>
      <Button
        color="black"
        title="LOGOUT"
        onPress={() => dispatch(signOut())}
      />
    </View>
  )
}
