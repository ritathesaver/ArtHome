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
  addAboutText,
  addSpecialization,
  editUserAvatar,
  getUsers,
} from '../../redux/actions/usersActions'
import AddSvg from '../../assets/icons/add.svg'

export const ProfileScreen: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()
  const authId = useSelector((state: RootState) => state.auth.id)
  const [text, setText] = useState('')
  const [about, setAbout] = useState('')
  const [inputActive, setInputActive] = useState(false)
  const [inputActiveAbout, setInputActiveAbout] = useState(false)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch, about])

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
    setInputActive(false)

    setText('')
  }, [currentUser, dispatch, text])

  const onChangeAbout = useCallback(() => {
    console.log(about)
    if (about) {
      dispatch(addAboutText(about, currentUser))
    }
    setAbout('')
    setInputActiveAbout(false)
  }, [currentUser, dispatch, about])

  return (
    <View style={pageStyles.container}>
      <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        onPress={() => launchImageLibrary()}
        style={pageStyles.imageContainer}>
        <Image
          style={pageStyles.image}
          source={{uri: currentUser?.avatarUri}}
        />
        </TouchableOpacity>
     </View>
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
              key={item}
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
          <View style={{flex: 1}}>
            <TextInput
              style={{
                borderRadius: 10,
                borderWidth: 1,
                margin: 15,
                padding: 10,
                borderColor: '#af6b58',
                width: '30%',
                  }}
              maxLength={15}
              onChangeText={setText}
              value={text}
              placeholder=""
              onSubmitEditing={onAdd}
                />
         
           </View>
          )}
        </View>
      )}

      <View style={pageStyles.aboutWrapper}>
         <View>
   
          <View style={pageStyles.line} />
        
        </View>
        
          <Text style={pageStyles.title} >ABOUT ME</Text>
          <TouchableOpacity onPress={() => {
              setInputActiveAbout(true)
            }}>
          <Text style={pageStyles.aboutText} >{currentUser?.about}</Text>
        </TouchableOpacity>
        {inputActiveAbout && (
          <View  style={{flex: 1}}>
          <TextInput
            multiline
            maxLength={50}
            numberOfLines={4}
            onChangeText={setAbout}
            value={about}
            placeholder="Write smthing about you..."
            onSubmitEditing={onChangeAbout}
            style={{
              borderBottomColor: '#000000',
              borderBottomWidth: 1,
              margin: 15,
            }}
          >
            </TextInput>
            <TouchableOpacity onPress={onChangeAbout}>
              <AddSvg style={{alignSelf:'flex-end'}}/>
            </TouchableOpacity>
          </View>)
        }
          

      </View>
      <Button
        color="black"
        title="LOGOUT"
        onPress={() => dispatch(signOut())}
      />
    </View>
  )
}
