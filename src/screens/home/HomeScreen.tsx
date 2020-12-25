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
import {IPictures} from '../../redux/reducers/picturesReducer'
import {IImageWithSize, IImageSize} from '../creators/CreatorDetails'

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

  //const [column, setColumn] = useState<Array<IImageWithSize>>([])

  // useEffect(() => {
  //   // eslint-disable-next-line prettier/prettier
  //   (async () => {
  //     const imagesWithSize: IImageWithSize[] = await Promise.all(
  //       searchedPictures.map(async (item: IPictures) => {
  //         // console.log(item)
  //         const result: IImageSize = await new Promise((resolve) => {
  //           Image.getSize(item.uri, (width, height) =>
  //             resolve({
  //               height,
  //               width,
  //               ratio: height / width,
  //             }),
  //           )
  //         })
  //         return {...result, ...item}
  //       }),
  //     )
  //     // console.log(imagesWithSize)
  //     setColumn(imagesWithSize)
  //   })()
  // }, [searchedPictures])

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
          <FlatList
            data={searchedPictures}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            numColumns={1}
            ListHeaderComponent={
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
                      style={{paddingHorizontal: 16, alignItems: 'center'}}>
                      <FastImage
                        style={{width: 70, height: 70, borderRadius: 35}}
                        source={{uri: item.avatarUri}}
                      />
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
                <Text style={{fontSize: 20, margin: 15}}>Artworks:</Text>
              </>
            }
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Cart', { id: item.id })
                }}
                style={{
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 3,
                }}>
                <FastImage
                  style={{width: 120, height: 120, borderRadius: 10}}
                  source={{uri: item.uri}}
                />
                <View
                  style={{
                    flex: 1,
                    padding: 10,
                    justifyContent: 'space-evenly',
                  }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    {item.title}
                  </Text>
                  <Text>{item.description}</Text>
                </View>
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
