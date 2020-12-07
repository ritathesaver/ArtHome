import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'

async function getData() {
  const {data} = await axios.get(
    'http://my-json-server.typicode.com/ritathesaver/jsonServer/pictures',
  )
  return data
}

function* workerGetTodo() {
  const resGet = yield call(getData)

  yield put({type: 'GET_PICTURES_SUCCESS', payload: resGet})
}

export function* watchGetTodo() {
  yield takeLatest('GET_PICTURES', workerGetTodo)
}

export function* rootSaga() {
  yield watchGetTodo()
}
