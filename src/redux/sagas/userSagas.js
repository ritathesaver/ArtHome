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

async function editAvatarData(body) {
  const {data} = await api.put(`creators/${body.body.id}`, {
    ...body.body,
    avatarUri: body.avatarUri,
  })
  return data
}

async function editAboutData(body) {
  const {data} = await api.put(`creators/${body.body.id}`, {
    ...body.body,
    about: body.aboutText,
  })
  return data
}

async function editSpecializationData(body) {
  const {data} = await api.put(`creators/${body.body.id}`, {
    ...body.body,
    specialization: [
      ...body.body.specialization,
      body.specialization.map((specialization) => specialization),
    ],
  })
  return data
}

function* workerEditAvatar(action) {
  try {
    const resGet = yield call(editAvatarData, action.payload)

    yield put({type: 'EDIT_AVATAR_SUCCESS', payload: resGet})
  } catch (err) {
    Alert.alert('Ooops!', 'Something went wrong')
  }
}

function* workerEditAbout(action) {
  try {
    const resGet = yield call(editAboutData, action.payload)

    yield put({type: 'EDIT_ABOUT_SUCCESS', payload: resGet})
  } catch (err) {
    Alert.alert('Ooops!', 'Something went wrong')
  }
}

function* workerAddSpec(action) {
  const resGet = yield call(editSpecializationData, action.payload)

  yield put({type: 'EDIT_SPEC_SUCCESS', payload: resGet})
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
export function* watchEditAvatar() {
  yield takeLatest('EDIT_USER_AVATAR', workerEditAvatar)
}
export function* watchAddSpec() {
  yield takeLatest('EDIT_USER_SPECIALIZATION', workerAddSpec)
}
export function* watchEditAbout() {
  yield takeLatest('EDIT_USER_ABOUT', workerEditAbout)
}
