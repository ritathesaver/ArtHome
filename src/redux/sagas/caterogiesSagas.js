import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {Alert} from 'react-native'

async function getData() {
  const {data} = await axios.get('http://localhost:3000/categories')
  return data
}

function* workerGetCategories() {
  try {
    const resGet = yield call(getData)
    yield put({type: 'GET_CATEGORIES_SUCCESS', payload: resGet})
  } catch (err) {
    yield put({type: 'GET_CATEGORIES_FAILURE', payload: err})
    Alert.alert(`${err}`, 'Lost connection')
  }
}

export function* watchGetCategories() {
  yield takeLatest('GET_CATEGORIES', workerGetCategories)
}
