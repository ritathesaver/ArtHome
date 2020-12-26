import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#202122',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#111110',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  searchBox: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#ccc',
    height: 45,
    borderRadius: 25,
    padding: 10,
  },
  box: {
    width: 180,
    height: 200,
  },
  overlayBoxWhite: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.6,
  },

  image: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    alignItems: 'center',
  },
  wrapper: {
    marginVertical: 10,
    alignItems: 'center',
    width: 200,
  },
  title: {
    position: 'absolute',
    top: 75,
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
    fontWeight: '600',
  },
})
