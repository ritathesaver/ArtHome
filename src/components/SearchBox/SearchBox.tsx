import React, { FunctionComponent, memo } from 'react'
import { View, TextInput, Text } from 'react-native'
import SearchIcon from '../../assets/icons/loupe.svg'
import Icon from 'react-native-vector-icons/FontAwesome'
import { styles } from './styles'


const SearchBox: FunctionComponent = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}> Home </Text>
			<View style={styles.searchBox}>
				<SearchIcon/>
				<TextInput style={styles.inputForm} placeholder="Search..." />			
				</View>
		</View>
	)
}

export default memo(SearchBox)