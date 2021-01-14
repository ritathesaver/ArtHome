import {createCustomAction} from 'typesafe-actions'
const {v4: uuidv4} = require('uuid')
import 'react-native-get-random-values'

export const getOrders = createCustomAction('GET_ORDERS')

export const putOrder = createCustomAction(
  'PUT_ORDER',
  (pictureUri: string, picturePrice: string, creatorId: string) => ({
    payload: {pictureUri, picturePrice, creatorId, id: uuidv4(), status: false},
  }),
)

export const deleteOrder = createCustomAction('DELETE_ORDER', (id: string) => ({
  payload: {id},
}))

export const editOrder = createCustomAction(
  'UPDATE_ORDER',
  (body: Object, status: boolean) => ({
    payload: {body, status},
  }),
)
