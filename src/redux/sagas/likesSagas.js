import {call, put, takeLatest} from 'redux-saga/effects'
import {Alert} from 'react-native'
import api from '../../utilities/api'

async function getData() {
  const {data} = await api.get('likes')
  return data
}

async function addData(body) {
  console.log(body)
  const {data} = await api.post('likes', body)
  console.log(data, 'ddaat')
  return data
}
async function deleteData(body) {
  // console.log(body)
  const {data} = await api.delete(`likes/${body.likeId}`)
  // console.log(data, 'ddaat')
  return data
}

function* workerGetLikes() {
  try {
    const resGet = yield call(getData)
    yield put({type: 'GET_LIKES_SUCCESS', payload: resGet})
  } catch (err) {
    Alert.alert('Ooops!', 'Something went wrong')
  }
}

function* workerAddLike(action) {
  try {
    const resGet = yield call(addData, action.payload)

    yield put({
      type: 'PUT_LIKE_SUCCESS',
      payload: {
        id: resGet.id,
        pictureId: resGet.pictureId,
        creatorId: action.payload.creatorId,
      },
    })
  } catch (err) {
    Alert.alert('Ooops!', 'Something went wrong')
  }
}

function* workerDeleteLike(action) {
  try {
    yield call(deleteData, action.payload)

    yield put({type: 'DELETE_LIKE_SUCCESS', payload: action.payload.likeId})
  } catch (err) {
    Alert.alert('Ooops!', 'Something went wrong')
  }
}

export function* watchGetLikes() {
  yield takeLatest('GET_LIKES', workerGetLikes)
}
export function* watchDeleteLike() {
  yield takeLatest('DELETE_LIKE', workerDeleteLike)
}
export function* watchAddLike() {
  yield takeLatest('PUT_LIKE', workerAddLike)
}
