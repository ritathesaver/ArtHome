import React, { FunctionComponent } from 'react';
import { FlatList, Image, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { styles } from './styles'
import invert from 'invert-color';

import { categories } from '../../assets/categories/categories'


export const HomeScreen: FunctionComponent = () => {

  return (
     <SafeAreaView style={styles.container}>
        <FlatList
        data={categories}
        renderItem={({ item }) => (
          <View style={{ flex: 1, flexDirection: 'column', margin: 12, width:200, height:200, alignItems: 'center'}}>
            <Image style={styles.image} source={{ uri: item.image.uri }} />
            <View style={{
              ...styles.overlayBoxWhite,
              backgroundColor: item.overlayColor
            }} />
            <Text style={{
              ...styles.title,
              color: `${invert(item.overlayColor, true)}`
            }}>{item.title}</Text>
          </View>
        )}
        numColumns={2}
      />
        { /*
      <View style={styles.wrapper}>
          <View style={styles.box}>
            <Image style={styles.image} source={{ uri: 'https://images.pexels.com/photos/4046710/pexels-photo-4046710.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} />
            <View style={styles.overlayBoxWhite}/></View>
            <Text style={styles.titleDark}>Artworks</Text>
          </View>
          <View style={styles.wrapper}>
          <View style={styles.box}>
            <Image style={styles.image} source={{ uri: 'https://images.pexels.com/photos/3817583/pexels-photo-3817583.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} />
             <View style={styles.overlayBoxBlack} />
            </View>
            <Text style={styles.titleLight}>Creators</Text>
          </View>
          <View style={styles.wrapper}>
          <View style={styles.box}>
            <Image style={styles.image} source={{ uri: 'https://images.pexels.com/photos/3214692/pexels-photo-3214692.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} />
              <View style={styles.overlayBoxBlack} />
            </View>
            <Text style={styles.titleLight}>Hire creator</Text>
          </View>
          <View style={styles.wrapper}>
          <View style={styles.box}>
            <Image style={styles.image} source={{ uri: 'https://images.pexels.com/photos/139764/pexels-photo-139764.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} ></Image>
              <View style={styles.overlayBoxWhite} />
          </View>
           <Text style={styles.titleDark}>Gallery</Text>
          </View>
          <View style={styles.wrapper}>
          <View style={styles.box}>
            <Image style={styles.image} source={{ uri: 'https://images.pexels.com/photos/4906326/pexels-photo-4906326.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} ></Image>
              <View style={styles.overlayBoxWhite} />
            </View>
            <Text style={styles.titleDark}>Trending</Text>
          </View>
           <View style={styles.wrapper}>
          <View style={styles.box}>
            <Image style={styles.image} source={{ uri: 'https://images.pexels.com/photos/207691/pexels-photo-207691.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }} ></Image>
               <View style={styles.overlayBoxBlack} />
            </View>
            <Text style={styles.titleLight}>Events</Text>
        </View>*/}
        </SafeAreaView>
  
  )
}
