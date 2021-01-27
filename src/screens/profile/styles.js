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
    marginTop: 16,
    width: 280,
    height: 280,
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
    borderBottomColor: '#f7f7f7',
    marginVertical: 10,
    width: '100%',
    alignSelf: 'center',
  },
  aboutWrapper: {
    flex: 1,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  title: {
    fontSize: 20,
    margin: 15,
    textAlign: 'center',
    fontWeight: '500',
    color: '#f7f7f7',
  },
  aboutText: {
    fontSize: 18,
    color: '#f7f7f7',
    margin: 3,
  },
  aboutTextTitle: {
    fontSize: 14,
    color: '#f7f7f7',
    margin: 3,
  },
  box: {
    marginBottom: 16,
    width: '100%',
  },
})