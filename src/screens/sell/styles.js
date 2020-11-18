import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  cameraWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  takePictureButton: {
     flex: 0,
     backgroundColor: '#fff',
     height: 60,
     width: 60,
     borderRadius: 30,
     alignSelf: 'center',
     margin: 20
  },

  buttonGalleryContainer: {
    marginVertical: 8
  },
  afterShootContainer: {
    flex: 1
  },

  nextButtonContainer: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'

  },
  nextText: {
    color: 'white',
    fontSize: 30,
    marginLeft: 20 
  },
  choseContainer: {
    alignItems: 'center',
  }

})
  
export const priceStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 15 
  },
  headerWrapper: {
    marginBottom: 10,
    width: '60%'
  },
  header: {
    fontSize: 26,
    textAlign: 'center'
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 20 
  },
  priceText: {
    fontSize: 20
  },
  priceInput: {
     width: '30%',
     padding: 3,
     borderColor: 'black',
     borderBottomWidth: 1,
     color: 'black',
     fontSize: 20,
  }

})