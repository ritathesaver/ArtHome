/* eslint-disable react-native/no-inline-styles */
import React, {FunctionComponent} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import {TouchableOpacity} from 'react-native-gesture-handler'

interface ICategoriesItemProps {
  onPress: any
  itemTitle: string
}

export const CategoriesListItem: FunctionComponent<ICategoriesItemProps> = ({
  onPress,
  itemTitle,
}) => {
  return (
    <>
      <TouchableOpacity style={{width: '100%'}} onPress={onPress}>
        <View style={{backgroundColor: '#202122'}}>
          <Text style={{fontSize: 20, paddingVertical: 15, color: '#f7f7f7'}}>
            {itemTitle}
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          width: '100%',
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderColor: '#f7f7f7',
        }}
      />
    </>
  )
}
