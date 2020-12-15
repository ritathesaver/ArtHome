import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
   

  image: {
    width: '100%',
    height: '80%',
    overflow: "hidden",
    alignItems: "center"
  },
  wrapper: {
    justifyContent: 'flex-end',
    
  },
  title: {

    color: "white",
    textAlign: "center",
    fontSize: 20,
    marginVertical: 10,
    fontWeight: '600'
  }
})

export const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '80%',
   
  },
  title: {
    color: "black",
    fontSize: 20,
    marginVertical: 10,
    fontWeight: '600'
  }
  
  
})
