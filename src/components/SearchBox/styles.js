import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#161718',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#ccc',
    height: 45,
    borderRadius: 8,
    padding: 10,
  },
  inputForm: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#000',
    backgroundColor: '#fff',
    padding: 15,
    width: '80%',
  },
})
