/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect, useState} from 'react'
import {
  Text,
  View,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import {RNCamera} from 'react-native-camera'
import {styles} from './styles'
import CameraRoll from '@react-native-community/cameraroll'
import {useNavigation} from '@react-navigation/native'
import {IImageSize} from '../creators/CreatorDetails'
import axios from 'axios'

import FastImage from 'react-native-fast-image'

export const OpenCameraScreen: FunctionComponent = () => {
  const [camera, setCamera] = useState<RNCamera | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const [fileData, setFileData] = useState('')

  const [size, setSize] = useState({ratio: 0})

  const [lastPhoto, setLastPhoto] = useState<CameraRoll.PhotoIdentifiersPage>()

  const navigation = useNavigation()

  navigation.addListener('blur', () => {
    setFileData('')
  })

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        base64: true,
      },
      maxWidth: 1200,
      maxHeight: 1200,
    }
    ImagePicker.launchImageLibrary(options, (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        //setFileData(response.uri)
        setIsLoading(true)
        cloudinaryUpload(response.uri)
      }
    })
  }

  const onBackToCamera = () => {
    setFileData('')
  }

  const cloudinaryUpload = async (dataUri: string) => {
    const data = new FormData()
    console.log(dataUri)
    data.append('file', {
      uri: dataUri,
      type: 'image/jpeg;base64',
      name: Date.now() + '.jpg',
    })
    data.append('upload_preset', 'rzdv03b3')
    data.append('cloud_name', 'dnjmif1av')
    // console.log(data)

    const res = await axios({
      url: 'https://api.cloudinary.com/v1_1/dnjmif1av/image/upload',
      method: 'POST',
      data: data,
    })
    console.log(res.data.secure_url)
    setFileData(res.data.secure_url)
  }

  // console.log(fileData)

  const takePicture = async () => {
    if (camera) {
      const options = {base64: true, width: 1200, height: 1200}

      try {
        const data = await camera.takePictureAsync(options)
        Alert.alert('Success', JSON.stringify(data))
        cloudinaryUpload(data.uri)
      } catch (err) {
        // console.log(err.message)
      }
    }
  }

  useEffect(() => {
    // eslint-disable-next-line no-extra-semi
    ;(async () => {
      const nod = await CameraRoll.getPhotos({
        first: 1,
        assetType: 'Photos',
      })
      setLastPhoto(nod)

      if (fileData) {
        const result: IImageSize = await new Promise((resolve) => {
          Image.getSize(fileData, (width, height) =>
            resolve({
              height,
              width,
              ratio: height / width,
            }),
          )
          return result
        })
        console.log(result, 'size')
        setSize(result)
        navigation.setParams({
          uri: fileData,
          ratio: result.ratio,
        })
      }
    })()
  }, [fileData, navigation])

  return (
    <View style={styles.container}>
      <ActivityIndicator
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 25,
        }}
        size="large"
        color="#af6b58"
        animating={isLoading}
      />
      {fileData ? (
        <ScrollView style={styles.afterShootContainer}>
          <View
            style={{
              margin: 24,
              width: Dimensions.get('window').width - 50,
            }}>
            <FastImage
              onLoadEnd={() => setIsLoading(false)}
              style={{
                width: '100%',
                height: Dimensions.get('window').width * size.ratio,
              }}
              source={{uri: fileData}}
            />
          </View>
          <TouchableOpacity
            style={{
              marginVertical: 10,
              width: '45%',
              padding: 12,
              borderRadius: 8,
              backgroundColor: '#fbf7f0',
              alignSelf: 'center',
            }}
            onPress={onBackToCamera}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 17,
              }}>
              Take one more shot
            </Text>
          </TouchableOpacity>
          <View style={styles.choseContainer}>
            <Text style={{color: 'white'}}>or</Text>
          </View>
          <TouchableOpacity
            style={{
              marginVertical: 10,
              width: '45%',
              padding: 12,
              borderRadius: 8,
              backgroundColor: '#fbf7f0',
              alignSelf: 'center',
            }}
            onPress={launchImageLibrary}>
            <Text
              style={{
                color: 'black',
                textAlign: 'center',
                fontSize: 17,
              }}>
              Choose from gallery
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <View
          style={{
            backgroundColor: '#202122',

            justifyContent: 'center',
          }}>
          <RNCamera
            ref={(ref) => {
              setCamera(ref)
            }}
            captureAudio={false}
            style={styles.cameraWrapper}
            type={RNCamera.Constants.Type.back}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '50%',
              marginLeft: 30,
            }}>
            <TouchableOpacity
              onPress={launchImageLibrary}
              style={{
                width: 50,
                height: 50,
              }}>
              <Image
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 5,
                }}
                source={{
                  uri: lastPhoto?.edges.map((item) => item.node.image.uri)[0],
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={takePicture}
              style={styles.takePictureButtonWrapper}>
              <View style={styles.takePictureButton} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  )
}
