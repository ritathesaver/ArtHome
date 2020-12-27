import {createReducer} from 'typesafe-actions'
import {
  getPicturesAsync,
  getPicturesByCategoryAsync,
} from '../actions/picturesActions'
import {unionBy} from 'lodash'

export interface IPictures {
  creatorId: string
  id: string
  title: string
  description: string
  uri: string
  price: string
  location: string
}

export interface IPicturesState {
  pictures: IPictures[]
  loading: boolean
  error: Error | null
}

const INITIAL_STATE: IPicturesState = {
  pictures: [],
  loading: false,
  error: null,
}

export const picturesReducer = createReducer(INITIAL_STATE)
  .handleType(
    'ADD_PICTURE_SUCCESS',
    (state: IPicturesState, action: {type: string; payload: any}) => {
      // console.log(action.payload, 'payload')

      return {
        ...state,
        loading: false,
        error: null,
        pictures: [...state.pictures, action.payload],
      }
    },
  )
  .handleType(
    'GET_PICTURE_SUCCESS',
    (state: IPicturesState, action: {type: string; payload: any}) => {
      // console.log(action.payload, 'payload')

      return {
        ...state,
        loading: false,
       pictures: unionBy([...state.pictures], action.payload, ({id}) => id),
      }
    },
  )
  .handleAction(
    getPicturesByCategoryAsync.request,
    (state: IPicturesState) => ({
      ...state,
      loading: true,
    }),
  )
  .handleAction(
    getPicturesByCategoryAsync.failure,
    (state: IPicturesState, action: {type: string; payload: any}) => ({
      ...state,
      error: action.payload.error,
    }),
  )
  .handleAction(
    getPicturesByCategoryAsync.success,
    (state: IPicturesState, action: {type: string; payload: any}) => {
      return {
        ...state,
        loading: false,
        pictures: unionBy([...state.pictures], action.payload, ({id}) => id),
      }
    },
  )
  .handleAction(getPicturesAsync.request, (state: IPicturesState) => ({
    ...state,
    loading: true,
  }))
  .handleAction(
    getPicturesAsync.failure,
    (state: IPicturesState, action: {type: string; payload: any}) => ({
      ...state,
      error: action.payload.error,
    }),
  )
  .handleAction(
    getPicturesAsync.success,
    (state: IPicturesState, action: {type: string; payload: any}) => {
      return {
        ...state,
        loading: false,
        pictures: unionBy([...state.pictures], action.payload, ({id}) => id),
      }
    },
  )
