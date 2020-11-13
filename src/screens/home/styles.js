import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
   box: {
    width: 180,
    height: 200,
    
  },
  overlayBoxWhite: {
     ...StyleSheet.absoluteFillObject,
            opacity: 0.6
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
    top: 75,
    color: "white",
    textAlign: "center",
    fontSize: 20,
    margin: 20,
    fontWeight: '600'
  }
})
