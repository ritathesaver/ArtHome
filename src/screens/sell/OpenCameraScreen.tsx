/* eslint-disable react-native/no-inline-styles */

import React, {FunctionComponent, useEffect, useState} from 'react'
import {
  Text,
  View,
  Button,
  Image,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import ImagePicker from 'react-native-image-picker'
import {RNCamera} from 'react-native-camera'
import {styles} from './styles'
import CameraRoll from '@react-native-community/cameraroll'
import {useNavigation} from '@react-navigation/native'
import {IImageSize} from '../creators/CreatorDetails'
import axios from 'axios'

export const OpenCameraScreen: FunctionComponent = () => {
  const navigation = useNavigation()

  const [camera, setCamera] = useState<RNCamera | null>(null)

  const [fileData, setFileData] = useState('')

  const [size, setSize] = useState({ratio: 0})

  const [lastPhoto, setLastPhoto] = useState<CameraRoll.PhotoIdentifiersPage>()

  const launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
        base64: true,
      },
    }
    ImagePicker.launchImageLibrary(options, (response) => {
      //console.log('Response = ', response);

      if (response.didCancel) {
        // console.log('User cancelled image picker')
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error)
      } else {
        setFileData(response.uri)
        cloudinaryUpload(fileData)
      }
    })
  }

  const onBackToCamera = () => {
    setFileData('')
  }

  const cloudinaryUpload = async (dataUri: string) => {
    const data = new FormData()
    data.append('file', {uri: dataUri, type: 'image/png', name: `${dataUri}`})
    data.append('upload_preset', 'x6a3whk4')
    data.append('cloud_name', 'dwucj2mkl')

    // console.log(data)

    const res = await axios({
      url: 'https://api.cloudinary.com/v1_1/dwucj2mkl/image/upload',
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      data: data,
    })
    // console.log(res.data.secure_url)
    setFileData(res.data.secure_url)
  }

  // console.log(fileData)

  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.7, base64: true}

      try {
        const data = await camera.takePictureAsync(options)
        Alert.alert('Success', JSON.stringify(data))
        setFileData(data.uri)
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
      {fileData ? (
        <View style={styles.afterShootContainer}>
          <View style={{width: Dimensions.get('window').width}}>
            <Image
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').width * size.ratio,
              }}
              source={{uri: fileData}}
            />
          </View>
          <Button
            title="Take one more shot"
            color="white"
            onPress={onBackToCamera}
          />
          <View style={styles.choseContainer}>
            <Text style={{color: 'white'}}>or</Text>
          </View>
          <Button
            title="Choose from gallery"
            color="white"
            onPress={launchImageLibrary}
          />
        </View>
      ) : (
        <View
          style={{
            backgroundColor: 'black',

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
