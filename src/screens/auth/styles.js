import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ebebe3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200
  },
  formContainer: {
    marginVertical: 100,
    width: '100%',
    marginBottom: 30,
    alignItems: 'center'
  },
  input: {
    width: '70%',
    margin: 15,
    padding: 3,
    borderColor: '#2b2b28',
    borderBottomWidth: 1
  },
  submitButton: {
    width: '80%',
    marginVertical: 30,
    padding: 14,
    borderRadius: 20,
    backgroundColor: '#888888'
  },
  submitButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17
  },
  labelText: {
    width: '80%'
  },
  textContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  subTitleText: {
    color: '#4a4a48'
  }
})