/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent, useEffect, useState} from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
} from 'react-native'
import {styles} from './styles'
import invert from 'invert-color'

import {categories} from '../../assets/categories/categories'
import {useNavigation} from '@react-navigation/native'
import SearchIcon from '../../assets/icons/loupe.svg'
import {getUsers} from '../../redux/actions/usersActions'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {RootState} from '../../redux/rootReducer'
import {getPictures} from '../../redux/actions/picturesActions'
import FastImage from 'react-native-fast-image'

export const HomeScreen: FunctionComponent = () => {
  const navigation = useNavigation()
  const dispatch: AppDispatch = useDispatch()
  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getPictures())
  }, [dispatch])

  const searchedUsers = useSelector((state: RootState) =>
    state.users.users
      .filter((user) => user.name.toLowerCase().includes(search.toLowerCase()))
      .map((user) => user),
  )

  const searchedPictures = useSelector((state: RootState) =>
    state.pictures.pictures.filter((pic) =>
      pic.title.toLowerCase().includes(search.toLowerCase()),
    ),
  )

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={120}
      style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <SearchIcon />
          <TextInput
            onSubmitEditing={() => setIsFocused(false)}
            style={{flex: 1, marginHorizontal: 5}}
            underlineColorAndroid="transparent"
            placeholder="Search..."
            onFocus={() => setIsFocused(true)}
            onChangeText={setSearch}
            value={search}
          />
        </View>
      </View>
      {isFocused ? (
        <>
          <Text style={{fontSize: 20, margin: 15}}>Creators:</Text>
          <FlatList
            data={searchedUsers}
            key={'_'}
            keyExtractor={(item) => '_' + item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            numColumns={1}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CreatorPage', item)
                }}
                style={{margin: 15, alignItems: 'center'}}>
                <FastImage
                  style={{width: 70, height: 70, borderRadius: 35}}
                  source={{uri: item.avatarUri}}
                />
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
          <Text style={{fontSize: 20, margin: 15}}>Artworks:</Text>
          <FlatList
            data={searchedPictures}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            numColumns={1}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CreatorPage', item)
                }}
                style={{margin: 15, alignItems: 'center'}}>
                <FastImage
                  style={{width: 120, height: 120, borderRadius: 10}}
                  source={{uri: item.uri}}
                />
                <Text>{item.title}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <FlatList
          data={categories}
          key={'#'}
          keyExtractor={(item) => '#' + item.key}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'column',
                margin: 3,
                width: Dimensions.get('window').width / 2,
                height: 200,
                alignItems: 'center',
              }}
              onPress={() => navigation.navigate(`${item.screen}`)}>
              <Image style={styles.image} source={{uri: item.image.uri}} />
              <View
                style={{
                  ...styles.overlayBoxWhite,
                  backgroundColor: item.overlayColor,
                }}
              />
              <Text
                style={{
                  ...styles.title,
                  color: `${invert(item.overlayColor, true)}`,
                }}>
                {item.title}
              </Text>
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      )}
    </KeyboardAvoidingView>
  )
}
