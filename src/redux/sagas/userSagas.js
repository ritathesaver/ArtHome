import {call, put, all, takeLatest} from 'redux-saga/effects'
import axios from 'axios'



async function getData() {
  const {data} = await axios.get('http://localhost:3000/creators')
  return data
}

function* workerGetUsers() {
  const resGet = yield call(getData)

  yield put({type: 'GET_USERS_SUCCESS', payload: resGet})
}

export function* watchGetUsers() {
  yield takeLatest('GET_USERS', workerGetUsers)
}

