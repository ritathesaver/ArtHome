import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    marginTop: 100,
    width: 200,
    height: 200,
  },

  formContainer: {
    width: '100%',
    marginVertical: 30,
    alignItems: 'center',
  },
  inputWrapper: {
    width: '75%',
    justifyContent: 'center',
    marginVertical: 10,
  },
  input: {
    width: '100%',
    marginTop: 10,
    marginBottom: 3,
    padding: 3,
    borderColor: '#fbf7f0',
    borderBottomWidth: 1,
    color: '#fbf7f0',
  },
  submitButton: {
    width: '85%',
    marginVertical: 40,
    padding: 14,
    borderRadius: 25,
    backgroundColor: '#fbf7f0',
  },
  submitButtonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 17,
  },
  labelText: {
    width: '80%',
    color: '#fbf7f0',
    paddingHorizontal: 3,
  },
  textContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subTitleText: {
    color: '#fbf7f0',
  },
  signText: {
    color: '#fbf7f0',
    textDecorationLine: 'underline',
    textDecorationColor: '#fbf7f0',
  },
})
