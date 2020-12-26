import {StyleSheet, Dimensions} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: '#202122',
  },

  wrapper: {
    marginTop: 15,
    width: Dimensions.get('window').width * 0.85,
    alignItems: 'center',
  },

  price: {
    color: '#f7f7f7',
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 25,
    fontWeight: '600',
  },
  description: {
    color: '#f7f7f7',
    fontSize: 15,
    marginVertical: 10,
    textAlign: 'justify',
  },
  submitButton: {
    width: '50%',
    marginVertical: 40,
    padding: 14,
    borderRadius: 25,
    backgroundColor: '#af6b58',
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
})
