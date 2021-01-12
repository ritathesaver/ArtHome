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
import {SearchAll} from '../../components/SearchAll/SearchAll'
import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch} from '../../App'
import {getPictures} from '../../redux/actions/picturesActions'
import {getUsers} from '../../redux/actions/usersActions'
import {RootState} from '../../redux/rootReducer'
import {CreatorSearchedItem} from './CreatorSearchedItem'
import {PictureSearchedItem} from './PictureSearchedItem'

export const HomeScreen: FunctionComponent = () => {
  const navigation = useNavigation()

  const [isFocused, setIsFocused] = useState(false)
  const [search, setSearch] = useState('')

  const dispatch: AppDispatch = useDispatch()

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
          <SearchAll
            setSearch={setSearch}
            search={search}
            setIsFocused={setIsFocused}
          />
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
                    <CreatorSearchedItem
                      itemId={item.id}
                      onPress={() => navigation.navigate('CreatorPage', item)}
                    />
                  )}
                />
              </>
            }
            renderItem={({item}) => (
              <PictureSearchedItem
                onPress={() => navigation.navigate('Cart', {id: item.id})}
                itemId={item.id}
              />
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
