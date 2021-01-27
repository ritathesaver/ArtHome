/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useCallback, useEffect, useState} from 'react'
import ImagePicker from 'react-native-image-picker'
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native'
import {pageStyles} from './styles'
import {RootState} from '../../redux/rootReducer'
import {useDispatch, useSelector} from 'react-redux'
import {IUsers} from '../../redux/reducers/usersReducer'
import {signOut} from '../../redux/actions/authActions'
import {AppDispatch} from '../../App'
import {editUser, getUsers} from '../../redux/actions/usersActions'
import AddSvg from '../../assets/icons/add.svg'
import { useNavigation } from '@react-navigation/native'

export const ProfileScreen: FunctionComponent = () => {
  const dispatch: AppDispatch = useDispatch()
  const authId = useSelector((state: RootState) => state.auth.id)
  const [text, setText] = useState('')

  const [inputActive, setInputActive] = useState(false)
  const [inputActiveAbout, setInputActiveAbout] = useState(false)
  const [inputActiveAddress, setInputActiveAddress] = useState(false)
  const [inputActivePhone, setInputActivePhone] = useState(false)

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const currentUser = useSelector(
    (state: RootState) =>
      state.users.users.filter((user: IUsers) => user.id === authId)[0],
  )

  const [about, setAbout] = useState(currentUser.about)
  const [address, setAddress] = useState(currentUser.address)
  const [phone, setPhone] = useState(currentUser.phone)
  const navigation = useNavigation()

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
        dispatch(editUser({avatarUri: response.uri}, currentUser))
      }
    })
  }

  const onAdd = useCallback(() => {
    if (text) {
      const specialization = currentUser.specialization.concat(text)
      dispatch(editUser({specialization}, currentUser))
    }
    setInputActive(false)

    setText('')
  }, [currentUser, dispatch, text])

  const onChangeAbout = useCallback(() => {
    console.log(about)
    if (about) {
      dispatch(editUser({about}, currentUser))
    }
    setInputActiveAbout(false)
  }, [currentUser, dispatch, about])

  const onChangeAddress = useCallback(() => {
    console.log(address)
    if (address) {
      dispatch(editUser({address}, currentUser))
    }
    setInputActiveAddress(false)
  }, [currentUser, dispatch, address])

  const onChangePhone = useCallback(() => {
    if (phone) {
      dispatch(editUser({phone}, currentUser))
    }
    setInputActivePhone(false)
  }, [currentUser, dispatch, phone])

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: '#202122'}}
      behavior="height">
      <ScrollView>
        <SafeAreaView style={pageStyles.container}>
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
              <Text style={pageStyles.aboutTextTitle}>Email:</Text>
              <Text style={pageStyles.aboutText}>{currentUser?.email}</Text>
            </View>

            <Text style={pageStyles.aboutTextTitle}>Phone:</Text>

            {inputActivePhone ? (
              <View style={{flex: 1, margin: 3}}>
                <TextInput
                  autoFocus
                  multiline
                  maxLength={50}
                  numberOfLines={4}
                  onChangeText={setPhone}
                  value={phone}
                  placeholder={phone}
                  onSubmitEditing={onChangePhone}
                  style={{
                    borderBottomColor: '#f7f7f7',
                    borderBottomWidth: 1,
                    marginBottom: 20,
                    fontSize: 17,
                    color: '#f7f7f7',
                    width: '95%',
                  }}
                />
              </View>
            ) : (
              <View style={pageStyles.box}>
                <TouchableOpacity
                  onPress={() => {
                    setInputActivePhone(true)
                  }}>
                  <Text style={pageStyles.aboutText}>
                    {currentUser?.phone ? currentUser.phone : 'None'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <Text style={pageStyles.aboutTextTitle}>Address:</Text>

            {inputActiveAddress ? (
              <View style={{flex: 1, margin: 3}}>
                <TextInput
                  autoFocus
                  maxLength={50}
                  numberOfLines={4}
                  onChangeText={setAddress}
                  defaultValue={address}
                  placeholder={address}
                  onSubmitEditing={onChangeAddress}
                  style={{
                    borderBottomColor: '#f7f7f7',
                    borderBottomWidth: 1,
                    marginBottom: 20,
                    fontSize: 17,
                    color: '#f7f7f7',
                    width: '95%',
                  }}
                />
              </View>
            ) : (
              <View style={pageStyles.box}>
                <TouchableOpacity
                  onPress={() => {
                    setInputActiveAddress(true)
                  }}>
                  <Text style={pageStyles.aboutText}>
                    {currentUser?.address ? currentUser.address : 'None'}
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <Text style={pageStyles.aboutTextTitle}>About:</Text>

            {inputActiveAbout ? (
              <View style={{flex: 1, margin: 3}}>
                <TextInput
                  autoFocus
                  maxLength={50}
                  numberOfLines={4}
                  onChangeText={setAbout}
                  defaultValue={about}
                  placeholder={about}
                  onSubmitEditing={onChangeAbout}
                  style={{
                    borderBottomColor: '#f7f7f7',
                    borderBottomWidth: 1,
                    marginBottom: 20,
                    fontSize: 17,
                    color: '#f7f7f7',
                    width: '95%',
                  }}
                />
              </View>
            ) : (
              <View style={pageStyles.box}>
                <TouchableOpacity
                  onPress={() => {
                    setInputActiveAbout(true)
                  }}>
                  <Text style={pageStyles.aboutText}>{currentUser?.about}</Text>
                </TouchableOpacity>
              </View>
            )}
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
                    margin: 8,
                    padding: 10,
                    borderColor: '#f7f7f7',
                  }}>
                  <Text style={{color: '#f7f7f7'}}>{item}</Text>
                </View>
              ))}
              {inputActive && (
                <TextInput
                  autoFocus
                  style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    margin: 15,
                    padding: 10,
                    fontSize: 17,
                    borderColor: '#f7f7f7',
                    width: '30%',
                    color: '#f7f7f7',
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
              <Text style={{color: '#f7f7f7', paddingTop: 16}}>
                Add your specializations
              </Text>
              {inputActive && (
                <TextInput
                  autoFocus
                  style={{
                    borderRadius: 10,
                    borderWidth: 1,
                    margin: 15,
                    fontSize: 17,
                    padding: 10,
                    borderColor: '#f7f7f7',
                    width: '30%',
                    color: '#f7f7f7',
                  }}
                  maxLength={15}
                  onChangeText={setText}
                  value={text}
                  placeholder=""
                  onSubmitEditing={onAdd}
                />
              )}
            </View>
          )}

          <View style={pageStyles.aboutWrapper}>
          <TouchableOpacity
            style={{
              marginBottom: 18,
              width: '35%',
              padding: 12,
              borderRadius: 8,
              backgroundColor: '#f7f7f7',
              alignSelf: 'center',
            }}
            onPress={() => dispatch(signOut())}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 17,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginBottom: 18,
              width: '35%',
              padding: 12,
              borderRadius: 8,
              backgroundColor: '#af6b58',
              alignSelf: 'center',
            }}
            onPress={() => navigation.navigate('Orders')}>
            <Text
              style={{
                color: '#f7f7f7',
                textAlign: 'center',
                fontSize: 17,
              }}>
                My orders
            </Text>
            
            </TouchableOpacity>
            </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
