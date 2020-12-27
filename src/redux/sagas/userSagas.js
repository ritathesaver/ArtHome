import {call, put, takeLatest} from 'redux-saga/effects'
import {Alert} from 'react-native'
import api from '../../utilities/api'

async function getData() {
  const {data} = await api.get('creators')
  return data
}

async function getUser(body) {
  // console.log(body)

  const {data} = await api.get(`creators/${body.id}`)
  return data

  // console.log(data, 'daaaat')
}

async function editData(body) {
  console.log(body.body, 'body')
  const {data} = await api.put(`creators/${body.body.id}`, {
    ...body.body,
    ...body.data,
  })
  console.log(data)
  return data
}

function* workerEdit(action) {
  try {
    const resGet = yield call(editData, action.payload)

    yield put({type: 'EDIT_USER_SUCCESS', payload: resGet})
  } catch (err) {
    Alert.alert('Ooops!', 'Something went wrong')
  }
}

function* workerGetUsers() {
  try {
    const resGet = yield call(getData)
    yield put({type: 'GET_USERS_SUCCESS', payload: resGet})
  } catch (err) {
    yield put({type: 'GET_USERS_ERROR', payload: err})
    Alert.alert('Ooops!', 'Something went wrong')
  }
}

function* workerGetUserById(action) {
  try {
    const resGet = yield call(getUser, action.payload)

    yield put({type: 'GET_USERS_SUCCESS', payload: [resGet]})
  } catch (err) {
    Alert.alert('Ooops!', 'Something went wrong')
  }
}

export function* watchGetUsers() {
  yield takeLatest('GET_USERS', workerGetUsers)
}

export function* watchGetUserById() {
  yield takeLatest('GET_USER_BY_ID', workerGetUserById)
}
export function* watchEdit() {
  yield takeLatest('UPDATE_USER', workerEdit)
}
