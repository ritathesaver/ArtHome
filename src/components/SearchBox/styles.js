import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#202122',
    padding: 20,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputForm: {
    flex: 1,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000',
    backgroundColor: '#fff',
    padding: 15,
    width: '80%',
  },
  searchIcon: {
    padding: 10,
  },
})
