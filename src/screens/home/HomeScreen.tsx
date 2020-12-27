/* eslint-disable react-native/no-inline-styles */
import React, {createRef, FunctionComponent, useEffect, useState} from 'react'
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
  const textInputRef = createRef<TextInput>()

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
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      {isFocused ? (
        <>
          <View style={styles.searchContainer}>
            <View style={{...styles.searchBox, width: '90%'}}>
              <SearchIcon />
              <TextInput
                style={{flex: 1, marginHorizontal: 5}}
                underlineColorAndroid="transparent"
                placeholder="Search..."
                onFocus={() => setIsFocused(true)}
                onChangeText={setSearch}
                value={search}
                ref={textInputRef}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setSearch('')
                setIsFocused(false)
                textInputRef.current?.blur()
              }}>
              <Text style={{fontSize: 16, color: 'white', marginLeft: 10}}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={searchedPictures}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            numColumns={1}
            ListHeaderComponent={
              <>
                <FlatList
                  style={{marginVertical: 16}}
                  data={searchedUsers}
                  keyExtractor={(item) => '_' + item.id}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  numColumns={1}
                  contentContainerStyle={{paddingHorizontal: 16}}
                  ItemSeparatorComponent={() => <View style={{width: 32}} />}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('CreatorPage', item)
                      }}
                      style={{alignItems: 'center', justifyContent: 'center'}}>
                      <FastImage
                        style={{width: 70, height: 70, borderRadius: 35}}
                        source={{uri: item.avatarUri}}
                      />
                      <Text
                        numberOfLines={1}
                        style={{color: '#f7f7f7', width: 70, paddingTop: 8}}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </>
            }
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Cart', {id: item.id})
                }}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 3,
                }}>
                <FastImage
                  style={{width: 120, height: 120, borderRadius: 8}}
                  source={{uri: item.uri}}
                />
                <View
                  style={{
                    flex: 1,
                    paddingLeft: 16,
                  }}>
                  <Text
                    numberOfLines={3}
                    style={{
                      fontSize: 18,
                      fontWeight: 'bold',
                      color: '#f7f7f7',
                      paddingBottom: 6,
                    }}>
                    {item.title}
                  </Text>
                  <Text style={{color: '#f7f7f7'}}>{item.description}</Text>
                </View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#f7f7f7',
                    paddingLeft: 16,
                  }}>
                  {`$${item.price}`}
                </Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <>
          <View style={styles.searchContainer}>
            <View style={{...styles.searchBox, width: '100%'}}>
              <SearchIcon />
              <TextInput
                style={{flex: 1, marginHorizontal: 5}}
                underlineColorAndroid="transparent"
                placeholder="Search..."
                onFocus={() => setIsFocused(true)}
                onChangeText={setSearch}
                value={search}
              />
            </View>
          </View>
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
        </>
      )}
    </KeyboardAvoidingView>
  )
}
