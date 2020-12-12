import {call, put, takeLatest} from 'redux-saga/effects'
import axios from 'axios'

async function getData() {
  const {data} = await axios.get('http://localhost:3000/likes')
  return data
}

async function addData(body) {
  console.log(body)
  const {data} = await axios.post(`http://localhost:3000/likes`, body)
  console.log(data, 'ddaat')
  return data
}
async function deleteData(body) {
  // console.log(body)
  const {data} = await axios.delete(`http://localhost:3000/likes/${body.likeId}`)
  // console.log(data, 'ddaat')
  return data
}

function* workerGetLikes() {
  const resGet = yield call(getData)
  // console.log(resGet, 'ddaat')

  yield put({type: 'GET_LIKES_SUCCESS', payload: resGet})
}


function* workerAddLike(action) {
  const resGet = yield call(addData, action.payload)

  yield put({type: 'PUT_LIKE_SUCCESS', payload: {id: resGet.id, pictureId:resGet.pictureId, creatorId: action.payload.creatorId}})
}

function* workerDeleteLike(action) {
  const resGet = yield call(deleteData, action.payload)

  yield put({type: 'DELETE_LIKE_SUCCESS', payload: action.payload.likeId})
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