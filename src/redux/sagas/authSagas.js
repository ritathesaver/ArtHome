import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import {Alert} from 'react-native'

async function getTokenUp(body) {
  // console.log(body, 'body')
  const {data} = await axios.post('http://localhost:3000/register', body)
  return data
}

async function addUser(id) {
  // console.log(id, 'idddd')
  const {data} = await axios.post('http://localhost:3000/creators', id)
  return data
}

export function* watchAddUser() {
  yield takeLatest('ADD_USER', workerAddUser)
}

function* workerAddUser(action) {
  const resGet = yield call(addUser, action.payload)

  yield put({type: 'ADD_USER_SUCCESS', payload: resGet})
}

function* workerSignUp(action) {
  try {
    const resGet = yield call(getTokenUp, action.payload)

    yield put({
      type: 'SIGN_UP_SUCCESS',
      payload: {id: action.payload.id, userToken: resGet.accessToken},
    })
  } catch (err) {
    if (err.message.includes('Network')) {
      Alert.alert(
        'Ooops!',
        'Something with internet connection or server is unavailable',
      )

      return
    }
    Alert.alert('Ooops!', 'Something went wrong')
  }
}

export function* watchSignUp() {
  yield takeLatest('SIGN_UP', workerSignUp)
}

async function getTokenIn(body) {
  // console.log(body, 'body')
  const {data} = await axios.post('http://localhost:3000/login', body)
  return data
}

function* workerSignIn(action) {
  try {
    const resGet = yield call(getTokenIn, {
      email: action.payload.email,
      password: action.payload.password,
    })
    yield put({
      type: 'SIGN_IN_SUCCESS',
      payload: {userToken: resGet.accessToken},
    })
  } catch (err) {
    yield put({ type: 'SIGN_IN_FAILURE', payload: { err } })
    if (err.message.includes('Network')) {
      Alert.alert(
        'Ooops!',
        'Something with internet connection or server is unavailable',
      )

      return
    }
    console.log(err.message)
    Alert.alert('Ooops!', 'Incorrect email or password')
  }
  // console.log(resGet, 'token')
}

export function* watchSignIn() {
  yield takeLatest('SIGN_IN', workerSignIn)
}
