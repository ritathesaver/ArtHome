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
        <TextInput
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flex: 1, marginHorizontal: 5}}
          underlineColorAndroid="transparent"
          placeholder="Search..."
        />
      </View>
    </View>
  )
}

export default memo(SearchBox)
