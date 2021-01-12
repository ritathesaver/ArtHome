import {call, put, takeLatest} from 'redux-saga/effects'
import {Alert} from 'react-native'
import api from '../../utilities/api'

async function getData() {
  const {data} = await api.get('categories')
  return data
}

function* workerGetCategories() {
  try {
    const resGet = yield call(getData)
    yield put({type: 'GET_CATEGORIES_SUCCESS', payload: resGet})
  } catch (err) {
    yield put({type: 'GET_CATEGORIES_FAILURE', payload: err})
    Alert.alert('Ooops!', 'Something went wrong')
  }
}

export function* watchGetCategories() {
  yield takeLatest('GET_CATEGORIES', workerGetCategories)
}
