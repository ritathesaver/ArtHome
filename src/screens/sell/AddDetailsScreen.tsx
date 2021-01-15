/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native'
import React, {FunctionComponent, useCallback} from 'react'
import {useState} from 'react'
import {View, Text, ImageBackground, KeyboardAvoidingView, Alert} from 'react-native'
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import NextIcon from '../../assets/icons/next copy 3.svg'
import {RootState} from '../../redux/rootReducer'
import {addPicture} from '../../redux/actions/picturesActions'

interface IAddDetailsProps {
  route: any
}

export const AddDetailsScreen: FunctionComponent<IAddDetailsProps> = ({
  route,
}) => {
  const [descriptionValue, setDescriptionValue] = useState('')
  const [titleValue, setTitleValue] = useState('')
  const [categoryTitle, setCategoryTitle] = useState(route.params.title)
  const navigation = useNavigation()
  const dispatch: AppDispatch = useDispatch()
  const categoriesTitles = useSelector((state: RootState) =>
    state.categories.categories.map((category) => category.title),
  )
  const authId = useSelector((state: RootState) => state.auth.id)

  const categoryId = useSelector(
    (state: RootState) =>
      state.categories.categories
        .filter((category) => category.title === categoryTitle)
        .map((category) => category.id)[0],
  )
  const onAdd = useCallback(() => {
    if (titleValue && descriptionValue) {
      dispatch(
        addPicture(
          authId,
          categoryId,
          titleValue,
          descriptionValue,
          route.params.uri,
          route.params.price,
          route.params.res,
        ),
      )
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      })
    } else {
      Alert.alert('Please, add title and description')
    }
  }, [
    authId,
    categoryId,
    descriptionValue,
    dispatch,
    navigation,
    route.params.price,
    route.params.res,
    route.params.uri,
    titleValue,
  ])

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: '#202122'}}
      behavior="padding">
      <ScrollView style={{flex: 1, backgroundColor: '#202122'}}>
        <ImageBackground
          blurRadius={20}
          style={{
            width: '100%',
            height: 180,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
          source={{uri: route.params.uri}}>
          <Text
            style={{color: 'white', fontSize: 28, backgroundColor: 'black'}}>
            Things buyers want to know
          </Text>
        </ImageBackground>

        <Text
          style={{
            fontSize: 17,
            color: 'white',
            marginHorizontal: 15,
            marginBottom: 5,
          }}>
          SPECIFICATIONS
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            marginBottom: 40,
            marginHorizontal: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10
          }}>
          <Text style={{fontSize: 17}}>Category</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <RNPickerSelect
              placeholder={{
                label: categoryTitle,
                value: categoryTitle,
              }}
              style={{
                inputIOS: {
                  color: 'black',
                  margin: 15,
                  fontSize: 17,
                },

                placeholder: {color: 'gray'},
                iconContainer: {
                  top: 16,
                  right: -6,
                },
              }}
              onValueChange={setCategoryTitle}
              items={categoriesTitles.map((item) => ({
                label: item,
                value: item,
              }))}
              Icon={() => {
                return <NextIcon />
              }}
            />
          </View>
        </View>

        <Text
          style={{
            fontSize: 17,
            color: 'white',
            marginHorizontal: 15,
            marginBottom: 5,
          }}>
          PRICE
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            marginBottom: 40,
            marginHorizontal: 13,
            paddingHorizontal: 10,
            paddingVertical: 15, 
          }}>
          <Text style={{fontSize: 17}}>
            ${route.params.price}
          </Text>
        </View>

        <Text
          style={{
            fontSize: 17,
            color: 'white',
            marginHorizontal: 15,
            marginBottom: 5,
          }}>
          TITLE *
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            marginBottom: 40,
            marginHorizontal: 13,
            paddingVertical: 13, 
            paddingHorizontal: 10
          }}>
          <TextInput
            onChangeText={(text) => setTitleValue(text)}
            value={titleValue}
            placeholder="Additional informamtion"
            style={{fontSize: 17}}
            maxLength={17}
            multiline
            numberOfLines={2}
          />
          
        </View>
        <Text
          style={{
            fontSize: 17,
            color: 'white',
            marginHorizontal: 15,
            marginBottom: 5,
          }}>
          DESCRIPTION *
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            marginBottom: 40,
            marginHorizontal: 13,
            paddingVertical: 13, 
            paddingHorizontal: 10
          }}>
          <TextInput
            onChangeText={(text) => setDescriptionValue(text)}
            value={descriptionValue}
            placeholder="Additional informamtion"
            style={{ fontSize: 17 }}
            maxLength={50}
            multiline
            numberOfLines={3}
          />
        </View>
        <Text
          style={{
            fontSize: 17,
            color: 'white',
            marginHorizontal: 15,
            marginBottom: 5,
          }}>
          LOCATION
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 8,
            marginBottom: 40,
            marginHorizontal: 13,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 15, 
            paddingHorizontal: 5
          }}>
          <Text style={{fontSize: 17}}> {route.params.res}</Text>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={() => {
              navigation.navigate('Map')
            }}>
            <Text style={{fontSize: 17, color: 'gray'}}>
              Change
            </Text>
            <NextIcon />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: '25%',
            marginVertical: 5,
            padding: 14,
            borderRadius: 8,
            backgroundColor: '#fbf7f0',
            alignSelf: 'center',
          }}
          onPress={() => onAdd()}>
          <Text style={{color: 'black', fontSize: 17, textAlign: 'center'}}>
            SUBMIT
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}
