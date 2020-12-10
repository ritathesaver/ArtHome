import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'

async function getData() {
  const {data} = await axios.get('http://localhost:3000/pictures')
  return data
}

async function getDataByUser(body) {
  console.log(data)
  const {data} = await axios.get(
    `http://localhost:3000/creators/${body.creatorId}/pictures`,
  )
  return data
}

async function getDataByCategory(body) {
  console.log(data)
  const {data} = await axios.get(
    `http://localhost:3000/categories/${body.categoryId}/pictures`,
  )
  return data
}

async function addData(body) {
  const {data} = await axios.post('http://localhost:3000/pictures', body)
  console.log(data, 'piicc')
  return data
}

function* workerGetPictures() {
  const resGet = yield call(getData)

  yield put({type: 'GET_PICTURES_SUCCESS', payload: resGet})
}

function* workerGetPicturesBy(action) {
  const resGet = yield call(getDataByUser, action.payload)

  yield put({type: 'GET_PICTURES_SUCCESS', payload: resGet})
}

function* workerAddPicture(action) {
  const resGet = yield call(addData, action.payload)

  yield put({type: 'ADD_PICTURE_SUCCESS', payload: resGet})
}

function* workerGetPicturesByCategory(action) {
  const resGet = yield call(getDataByCategory, action.payload)

  yield put({type: 'GET_PICTURES_SUCCESS', payload: resGet})
}

export function* watchGetPictures() {
  yield takeLatest('GET_PICTURES', workerGetPictures)
}

export function* watchAddPicture() {
  yield takeLatest('ADD_PICTURE', workerAddPicture)
}

export function* watchGetPicturesByUser() {
  yield takeLatest('GET_PICTURES_BY_USER', workerGetPicturesBy)
}

export function* watchGetPicturesByCategory() {
  yield takeLatest('GET_PICTURES_BY_CATEGORY', workerGetPicturesByCategory)
}
