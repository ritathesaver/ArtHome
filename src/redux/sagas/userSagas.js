import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'
import { Alert} from 'react-native'

async function getData() {
  try {
    const { data } = await axios.get('http://localhost:3000/creators')
    return data
  }
   catch (err) {
    Alert.alert(`${err}`, 'Lost connection')
  }

}

async function getUser(body) {
  // console.log(body)
  try {
    const { data } = await axios.get(`http://localhost:3000/creators/${body.id}`)
    return data
  }
   catch (err) {
    Alert.alert(`${err}`, 'Lost connection')
  }
  // console.log(data, 'daaaat')
  
}

async function editAvatarData(body) {
  try {
    const { data } = await axios.put(
      `http://localhost:3000/creators/${body.body.id}`,
      {
        ...body.body,
        avatarUri: body.avatarUri,
      },
    )
    return data
  }
  catch (err) {
    Alert.alert(`${err}`, 'Lost connection')
  } 
}

async function editAboutData(body) {
  try {
    const { data } = await axios.put(
      `http://localhost:3000/creators/${body.body.id}`,
      {
        ...body.body,
        about: body.aboutText,
      },
    )
    return data
  }
  catch (err) {
    Alert.alert(`${err}`, 'Lost connection')
  } 
}


async function editSpecializationData(body) {
  try {
    const { data } = await axios.put(
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
  catch (err) {
    Alert.alert(`${err}`, 'Lost connection')
  }  
}

function* workerEditAvatar(action) {
  const resGet = yield call(editAvatarData, action.payload)

  yield put({type: 'EDIT_AVATAR_SUCCESS', payload: resGet})
}

function* workerEditAbout(action) {
  const resGet = yield call(editAboutData, action.payload)

  yield put({type: 'EDIT_ABOUT_SUCCESS', payload: resGet})
}

function* workerAddSpec(action) {
  const resGet = yield call(editSpecializationData, action.payload)

  yield put({type: 'EDIT_SPEC_SUCCESS', payload: resGet})
}

function* workerGetUsers() {
  try {
    const resGet = yield call(getData)
    yield put({type: 'GET_USERS_SUCCESS', payload: resGet})
  }
  catch (err) {console.log(err)}


}

function* workerGetUserById(action) {
  const resGet = yield call(getUser, action.payload)

  yield put({type: 'GET_USERS_SUCCESS', payload: [resGet]})
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
