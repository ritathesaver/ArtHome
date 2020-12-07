import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'



async function getTokenUp(body) {
  console.log(body, 'body')
  const {data} = await axios.post('http://localhost:3000/register', body)
  return data
}

async function addUser(id) {
  console.log(id, 'idddd')
  const { data } = await axios.post(`http://localhost:3000/creators`, id)
  console.log(data)
  return data
}

export function* watchAddUser() {
  yield takeLatest('ADD_USER', workerAddUser)
}

function* workerAddUser(action) {
  const resGet = yield call(addUser, action.payload)

  console.log(resGet)

  yield put({type: 'ADD_USER_SUCCESS', payload: resGet})
}


function* workerSignUp(action) {
  const resGet = yield call(getTokenUp, action.payload)
  console.log(resGet, 'token')

  yield put({ type: 'SIGN_UP_SUCCESS', payload: { id:action.payload.id, userToken: resGet.accessToken } })
}

export function* watchSignUp() {
  yield takeLatest('SIGN_UP', workerSignUp)
}

async function getTokenIn(body) {
  console.log(body, 'body')
  const {data} = await axios.post('http://localhost:3000/login', body)
  return data
}

function* workerSignIn(action) {
  const resGet = yield call(getTokenIn, {email:action.payload.email, password:action.payload.password})
  console.log(resGet, 'token')

  yield put({ type: 'SIGN_IN_SUCCESS', payload: { userToken: resGet.accessToken } })
}

export function* watchSignIn() {
  yield takeLatest('SIGN_IN', workerSignIn)
}


