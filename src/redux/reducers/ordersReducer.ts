import {createReducer} from 'typesafe-actions'

export interface IOrder {
  id: string
  pictureUri: string
  picturePrice: string
  creatorId: string
  status: boolean
}

export interface IOrdersState {
  orders: IOrder[]
}

const INITIAL_STATE: IOrdersState = {
  orders: []
}

export const ordersReducer = createReducer(INITIAL_STATE).handleType(
  'PUT_ORDER_SUCCESS',
  (state: IOrdersState, action: { type: string; payload: any }) => {
    console.log('ADD ORDER')
    return {
      ...state,
      orders: [...state.orders, action.payload],
    }
  },
)
.handleType(
  'GET_ORDERS_SUCCESS',
  (state: IOrdersState, action: { type: string; payload: any }) => {
    console.log(action.payload, 'payload')
    return {
      ...state,
      orders: action.payload,
    }
  },
).handleType(
  'DELETE_ORDER_SUCCESS',
  (state: IOrdersState, action: { type: string; payload: any }) => {
    console.log(action.payload)
    return {
      ...state,
       orders: state.orders.filter((order) => order.id !== action.payload)
    }
  },
)
