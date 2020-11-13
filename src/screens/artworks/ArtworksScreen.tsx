/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import invert from 'invert-color';
import React, {FunctionComponent} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {artworks} from '../../assets/artworks/artworks';
import SearchBox from '../../components/SearchBox/SearchBox';
import { styles } from './styles';
import {authors} from '../../assets/authors/authors'

export const ArtworksScreen: FunctionComponent = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <SearchBox />
      <FlatList
        data={artworks}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'column',
              marginVertical: 15,
              marginHorizontal: 5,
              width: Dimensions.get('window').width / 2,
              height: 140,
            }}
            onPress={() => navigation.navigate('ArtworksDetails', authors.map(item => item.pictures))}>
            <Image style={styles.image} source={{uri: item.image.uri}} />
            <View
              style={{
                backgroundColor: item.overlayColor,
                height: 45,
              }}>
              <Text
                style={{
                  ...styles.title,
                  color: `${invert(item.overlayColor, true)}`,
                }}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
      />
    </SafeAreaView>
  );
};
