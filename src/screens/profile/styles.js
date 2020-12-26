import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    height: 120,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(52, 52, 52, 0.7)',
    padding: 5,
  },

  infoWrapper: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    alignItems: 'center',
  },
  imageContainer: {
    width: 90,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 80,
  },
  title: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    margin: 5,
    fontWeight: '500',
  },
})

export const pageStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202122',
  },
  infoWrapper: {
    flexDirection: 'row',
    margin: 10,
  },
  imageContainer: {
    width: 320,
    height: 320,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
    borderRadius: 175,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: '#af6b58',
    marginVertical: 10,
    width: '100%',
    alignSelf: 'center',
  },
  aboutWrapper: {
    flex: 1,
    margin: 10,
  },
  title: {
    fontSize: 20,
    margin: 15,
    textAlign: 'center',
    fontWeight: '500',
    color: '#f7f7f7',
  },
  aboutText: {
    fontSize: 17,
    textAlign: 'center',
    marginLeft: 4,
    color: '#f7f7f7',
  },
  box: {
    flexDirection: 'row',
    marginBottom: 5,
  },
})
