/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native'
import React, {FunctionComponent} from 'react'
import {useState} from 'react'
import {View, Text, ImageBackground} from 'react-native'
import {
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native-gesture-handler'
import RNPickerSelect from 'react-native-picker-select'
import {useSelector} from 'react-redux'
import NextIcon from '../../assets/icons/next.svg'
import {RootState} from '../../redux/rootReducer'

interface IAddDetailsProps {
  route: any
}

export const AddDetailsScreen: FunctionComponent<IAddDetailsProps> = ({
  route,
}) => {
  const [value, onChangeText] = useState('')
  const navigation = useNavigation()
  const categoriesTitles = useSelector((state: RootState) =>
    state.categories.categories.map((category) => category.title),
  )

  /*const selectCategory = () => {
    return (
      <RNPickerSelect
        onValueChange={(val) => console.log(val)}
        items={[
          {label: 'Football', value: 'football'},
          {label: 'Baseball', value: 'baseball'},
          {label: 'Hockey', value: 'hockey'},
        ]}
      />
    )
  }*/
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
              label: `${route.params.title}`,
              value: null,
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
            onValueChange={(val) => console.log(val)}
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
        DESCRIPTION
      </Text>
      <View style={{backgroundColor: 'white', marginBottom: 40}}>
        <TextInput
          onChangeText={(text) => onChangeText(text)}
          value={value}
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
    </ScrollView>
  )
}
