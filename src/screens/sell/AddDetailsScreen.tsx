/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native'
import React, {FunctionComponent, useCallback} from 'react'
import {useState} from 'react'
import {View, Text, ImageBackground, Button} from 'react-native'
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import NextIcon from '../../assets/icons/next.svg'
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
      return <Text>All fields are required</Text>
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
    <ScrollView style={{flex: 1, backgroundColor: '#202122'}}>
      <ImageBackground
        blurRadius={50}
        style={{
          width: '100%',
          height: 200,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
        source={{uri: route.params.uri}}>
        <Text style={{color: 'white', fontSize: 30, backgroundColor: 'black'}}>
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
          marginBottom: 40,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 20, margin: 15}}>Category</Text>
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
                fontSize: 20,
                paddingRight: 15,
              },

              placeholder: {color: 'gray'},
              iconContainer: {
                top: 15,
                right: 0,
              },
            }}
            onValueChange={setCategoryTitle}
            items={categoriesTitles.map((item) => ({label: item, value: item}))}
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
      <View style={{backgroundColor: 'white', marginBottom: 40}}>
        <Text style={{fontSize: 20, margin: 15}}>
          BYN: {route.params.price}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 17,
          color: 'white',
          marginHorizontal: 15,
          marginBottom: 5,
        }}>
        TITLE
      </Text>
      <View style={{backgroundColor: 'white', marginBottom: 40}}>
        <TextInput
          onChangeText={(text) => setTitleValue(text)}
          value={titleValue}
          placeholder="Additional informamtion"
          style={{fontSize: 17, margin: 15}}
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
        DESCRIPTION
      </Text>
      <View style={{backgroundColor: 'white', marginBottom: 40}}>
        <TextInput
          onChangeText={(text) => setDescriptionValue(text)}
          value={descriptionValue}
          placeholder="Additional informamtion"
          style={{fontSize: 17, margin: 15}}
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
          marginBottom: 40,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 20, margin: 15}}> {route.params.res}</Text>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={() => {
            navigation.navigate('Map')
          }}>
          <Text style={{fontSize: 20, margin: 15, color: 'gray'}}>Change</Text>
          <NextIcon />
        </TouchableOpacity>
      </View>
      <Button title="SUBMIT" onPress={() => onAdd()} />
    </ScrollView>
  )
}
