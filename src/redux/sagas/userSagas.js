import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'

async function getData() {
  const {data} = await axios.get('http://localhost:3000/creators')
  return data
}

async function editAvatarData(body) {
  const {data} = await axios.put(
    `http://localhost:3000/creators/${body.body.id}`,
    {
      ...body.body,
      avatarUri: body.avatarUri,
    },
  )
  console.log(data, 'editAvatarData')
  return data
}

async function editSpecializationData(body) {
  const {data} = await axios.put(
    `http://localhost:3000/creators/${body.body.id}`,
    {
      ...body.body,
      specialization: [
        ...body.body.specialization,
        body.specialization.map((specialization) => specialization),
      ],
    },
  )
  return data
}

function* workerEditAvatar(action) {
  const resGet = yield call(editAvatarData, action.payload)

  yield put({type: 'EDIT_AVATAR_SUCCESS', payload: resGet})
}

function* workerAddSpec(action) {
  const resGet = yield call(editSpecializationData, action.payload)

  yield put({type: 'EDIT_SPEC_SUCCESS', payload: resGet})
}

function* workerGetUsers() {
  const resGet = yield call(getData)

  yield put({type: 'GET_USERS_SUCCESS', payload: resGet})
}

export function* watchGetUsers() {
  yield takeLatest('GET_USERS', workerGetUsers)
}
export function* watchEditAvatar() {
  yield takeLatest('EDIT_USER_AVATAR', workerEditAvatar)
}
export function* watchAddSpec() {
  yield takeLatest('EDIT_USER_SPECIALIZATION', workerAddSpec)
}
