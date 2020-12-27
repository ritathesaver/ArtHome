import {call, put, takeLatest} from 'redux-saga/effects'
import {
  getPicturesByCategoryAsync,
  getPicturesAsync,
} from '../actions/picturesActions'
import {Alert} from 'react-native'
import api from '../../utilities/api'

async function getData() {
  const {data} = await api.get('pictures')
  return data
}

async function getDataByUser(body) {
  // console.log(data)
  const {data} = await api.get(`creators/${body.creatorId}/pictures`)
  return data
}

async function getDataByCategory(body) {
  // console.log(data)
  const {data} = await api.get(`categories/${body.categoryId}/pictures`)
  return data
}

async function addData(body) {
  const {data} = await api.post('pictures', body)
  // console.log(data, 'piicc')
  return data
}

function* workerGetPictures() {
  yield put(getPicturesAsync.request())
  try {
    const resGet = yield call(getData)

    yield put(getPicturesAsync.success(resGet))
  } catch (err) {
    yield put(getPicturesAsync.failure(err))
    Alert.alert('Ooops!', 'Something went wrong')
  }
}

function* workerGetPicturesBy(action) {
  try {
    const resGet = yield call(getDataByUser, action.payload)

    yield put({type: 'GET_PICTURES_SUCCESS', payload: resGet})
  } catch (err) {
    Alert.alert('Ooops!', 'Something went wrong')
  }
}

function* workerAddPicture(action) {
  try {
    const resGet = yield call(addData, action.payload)

    yield put({type: 'ADD_PICTURE_SUCCESS', payload: resGet})
  } catch (err) {
    Alert.alert('Ooops!', 'Something went wrong')
  }
}

function* workerGetPicturesByCategory(action) {
  yield put(getPicturesByCategoryAsync.request())

  try {
    const resGet = yield call(getDataByCategory, action.payload)

    yield put(getPicturesByCategoryAsync.success(resGet))
  } catch (err) {
    yield put(getPicturesByCategoryAsync.failure(err))
    Alert.alert('Ooops!', 'Something went wrong')
  }
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
