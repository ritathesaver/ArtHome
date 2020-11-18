/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect, useState} from 'react'
import { Text, View, Button, Image, Alert, TouchableOpacity, Dimensions } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { RNCamera} from 'react-native-camera'
import { styles } from './styles'



import { useNavigation } from '@react-navigation/native'
import { IImageSize } from '../creators/CreatorDetails';


export const OpenCameraScreen: FunctionComponent = () => {
  const navigation = useNavigation()

  const [camera, setCamera] = useState<RNCamera|null>(null)

  const [fileData, setFileData] = useState('')

  const [size, setSize] = useState({ratio: 0})

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
        console.log('User cancelled image picker')
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error)
      } else {
        setFileData(response.uri)
      }
    })
  }

  const onBackToCamera = () => {
    setFileData('')
  }

  const takePicture = async () => {
    if (camera) {
      const options = { quality: 0.7, base64: true }
     
      try {
        const data = await camera.takePictureAsync(options)
        Alert.alert('Success', JSON.stringify(data));
        setFileData(data.uri)
      }
      catch (err) {
        console.log(err.message)
      }
      
    
    }
  }

  useEffect(() => {
    (async () => {
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
          ratio: result.ratio
        })
      }
     })()
   }, [fileData])
   

    return (
      <View style={styles.container}>
        { fileData ?
        
          (<View style={styles.afterShootContainer}>
            <View style={{width: Dimensions.get('window').width }}>
              <Image style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width*size.ratio}} source={{ uri: fileData }} />
            </View>
            <Button title="Take one more shot" color="white" onPress={onBackToCamera}></Button>
            <View style={styles.choseContainer}>
              <Text style={{ color: 'white' }}>or</Text>
            </View>
            <Button title='Choose from gallery' color='white' onPress={launchImageLibrary}></Button>
          </View>
            
          ) : (
          
        <><RNCamera
              ref={ref => {
                setCamera(ref);
              }}
              captureAudio={false}
              style={styles.cameraWrapper}
              type={RNCamera.Constants.Type.back}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }} />
              <TouchableOpacity onPress={takePicture} style={styles.takePictureButton} />
              <View style={styles.buttonGalleryContainer}>
                <Button title='Choose from gallery' color='white' onPress={launchImageLibrary}></Button>
              </View>
            </>)
      
        }
    </View>

    )
  }
