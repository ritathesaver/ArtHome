import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 15,
  
  },
   box: {
    width: 180,
    height: 200,
    
  },
  overlayBoxWhite: {
     ...StyleSheet.absoluteFillObject,
            opacity: 0.5
  },
   overlayBoxBlack: {
     ...StyleSheet.absoluteFillObject,
            backgroundColor: 'black',
            opacity: 0.5
   },
  image: {
    width: '100%',
    height: '100%',
    overflow: "hidden",
    alignItems: "center"
  },
  wrapper: {
    marginVertical: 10,
    alignItems: 'center',
    width: 200
  },
  title: {
    position: 'absolute',
    color: "white",
    textAlign: "center",
    fontSize: 20,
    margin: 20,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    fontWeight: '600'
  },
  titleDark: {
    position: 'absolute',
    color: "black",
    textAlign: "center",
    fontSize: 20,
    margin: 20,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    fontWeight: '600'
  }
})
