import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import { Alert} from 'react-native'

async function getData() {
  try {
    const { data } = await axios.get('http://localhost:3000/categories')
    return data
  }
   catch (err) {
    Alert.alert(`${err}`, 'Lost connection')
  }
}

function* workerGetCategories() {
  try {
    const resGet = yield call(getData)
    return  yield put({type: 'GET_CATEGORIES_SUCCESS', payload: resGet})

  }
  catch (err) { console.log(err) }


}

export function* watchGetCategories() {
  yield takeLatest('GET_CATEGORIES', workerGetCategories)
}
