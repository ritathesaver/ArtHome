import React, {FunctionComponent, memo} from 'react'
import {View, TextInput} from 'react-native'
import SearchIcon from '../../assets/icons/loupe.svg'
import {styles} from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'

Icon.loadFont()

const SearchBox: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <SearchIcon />
        <TextInput style={styles.inputForm} placeholder="Search..." />
      </View>
    </View>
  )
}

export default memo(SearchBox)
