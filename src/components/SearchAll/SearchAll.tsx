/* eslint-disable react-native/no-inline-styles */
import React, {createRef, FunctionComponent} from 'react'
import {View, Text} from 'react-native'
import {TextInput, TouchableOpacity} from 'react-native'
import {styles} from '../../screens/home/styles'
import SearchIcon from '../../assets/icons/loupe.svg'

interface ISearchAllProps {
  setSearch: (value: string) => void
  search: string
  setIsFocused: any
}

export const SearchAll: FunctionComponent<ISearchAllProps> = ({
  setSearch,
  search,
  setIsFocused,
}) => {
  const textInputRef = createRef<TextInput>()

  return (
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
    </>
  )
}
