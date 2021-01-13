import {call, put, takeLatest} from 'redux-saga/effects'
import {Alert} from 'react-native'
import api from '../../utilities/api'

async function getData() {
  const {data} = await api.get('orders')
  return data
}

async function addData(body) {
  console.log(body)
  const {data} = await api.post('orders', body)
  console.log(data, 'ddaat')
  return data
}

async function deleteData(body) {
  console.log(body)
  const {data} = await api.delete(`orders/${body.id}`)
  console.log(data, 'ddaat')
  return data
}

function* workerGetOrders() {
  try {
    const resGet = yield call(getData)
    yield put({type: 'GET_ORDERS_SUCCESS', payload: resGet})
  } catch (err) {
    Alert.alert('Ooops!', 'Something went wrong')
  }
}

function* workerAddOrder(action) {
  try {
    const resGet = yield call(addData, action.payload)

    yield put({
      type: 'PUT_ORDER_SUCCESS',
      payload: {
        id: resGet.id,
        pictureUri: action.payload.pictureUri,
        picturePrice: action.payload.picturePrice,
        creatorId: action.payload.creatorId,
        status: action.payload.status,
      },
    })
  } catch (err) {
    Alert.alert('Ooops!', 'Something went wrong')
  }
}

function* workerDeleteOrder(action) {
  try {
    yield call(deleteData, action.payload)

    yield put({type: 'DELETE_ORDER_SUCCESS', payload: action.payload.id})
  } catch (err) {
    Alert.alert('Ooops!', 'Something went wrong')
  }
}

export function* watchGetOrders() {
  yield takeLatest('GET_ORDERS', workerGetOrders)
}

export function* watchAddOrder() {
  yield takeLatest('PUT_ORDER', workerAddOrder)
}
export function* watchDeleteOrder() {
  yield takeLatest('DELETE_ORDER', workerDeleteOrder)
}

