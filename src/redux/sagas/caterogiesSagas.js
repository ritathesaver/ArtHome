import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'

async function getData() {
  const {data} = await axios.get('http://localhost:3000/categories')
  // console.log(data)
  return data
}
function* workerGetCategories() {
  const resGet = yield call(getData)

  yield put({type: 'GET_CATEGORIES_SUCCESS', payload: resGet})
}

export function* watchGetCategories() {
  yield takeLatest('GET_CATEGORIES', workerGetCategories)
}
