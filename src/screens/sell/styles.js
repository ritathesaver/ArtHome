import {Dimensions, StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202122',
  },
  cameraWrapper: {
    width: '100%',
    height: Dimensions.get('window').height * 0.75,
    alignItems: 'center',
    marginBottom: 10,
  },
  takePictureButton: {
    flex: 0,
    backgroundColor: '#fff',
    height: 50,
    width: 50,
    borderRadius: 25,
    margin: 10,
    borderColor: 'black',
    borderWidth: 1,
  },

  takePictureButtonWrapper: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 60,
    width: 60,
    borderRadius: 30,
    alignSelf: 'center',
    borderColor: 'black',
  },

  buttonGalleryContainer: {
    marginVertical: 8,
  },
  afterShootContainer: {
    flex: 1,
  },

  nextButtonContainer: {
    marginBottom: 30,
    flexDirection: 'row',
  },
  nextText: {
    color: 'white',
    fontSize: 30,
    marginLeft: 20,
  },
  choseContainer: {
    alignItems: 'center',
  },
})

export const priceStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: '#202122',
  },
  headerWrapper: {
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    textAlign: 'center',
    color: '#f7f7f7',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  priceText: {
    fontSize: 20,
    marginHorizontal: 3,
    color: '#f7f7f7',
  },
  priceInput: {
    width: '30%',
    padding: 3,
    borderColor: '#f7f7f7',
    borderBottomWidth: 1,
    color: '#f7f7f7',
    fontSize: 20,
  },
})
