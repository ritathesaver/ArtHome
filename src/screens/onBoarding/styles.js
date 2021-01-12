import {StyleSheet, Dimensions} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: Dimensions.get('window').width * 0.8,
    height: Dimensions.get('window').width * 0.8,
    borderRadius: 200,
  },
  introTextStyle: {
    fontSize: 18,
    color: '#2b2b28',
    textAlign: 'center',
    marginHorizontal: 10,
  },
  introTitleStyle: {
    marginTop: 30,
    fontSize: 27,
    color: '#2b2b28',
    textAlign: 'center',
    fontWeight: '800',
    textTransform: 'uppercase',
    paddingBottom: 20,
  },
  buttonNextContainer: {
    marginVertical: 20,
    backgroundColor: '#af6b58',
    paddingHorizontal: 18,
    paddingVertical: 12,
    alignItems: 'flex-end',
  },
  buttonNextText: {
    fontSize: 18,
    color: 'white',
  },
  buttonSkipContainer: {
    color: '#2b2b28',
  },
})
