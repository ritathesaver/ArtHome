import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 50,
  },
  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 10,
    margin: 10,
    fontWeight: '500',
  },
})

export const detailStyles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'column',
  },
  wrapper: {
    flex: 1,
    width: '100%'
  },
})
