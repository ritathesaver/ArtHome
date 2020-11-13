import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  
  },
  wrapper: {
    borderBottomWidth: 1,
    padding: 10,
    
  },
  infoWrapper: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center'

  },
  imageContainer: {
    width: 90,
    height: '100%'

  },
  image: {
    width: '100%',
    height: '100%',
    overflow: "hidden",
    alignItems: "center",
    borderRadius: 80
  },
  title: {
    color: "black",
    textAlign: "center",
    fontSize: 15,
    margin: 5,
    fontWeight: '500'
  }
})
