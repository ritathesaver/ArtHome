import {createReducer} from 'typesafe-actions'

export interface IPictures {
  userId: number
  id: number
  title: string
  description: string
  uri: string
  price: number
  likes: number
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

export const picturesReducer = createReducer(INITIAL_STATE).handleType(
  'GET_PICTURES_SUCCESS',
  (state: IPicturesState, action: {type: string; payload: any}) => {
    return {
      ...state,
      pictures: action.payload,
    }
  },
)
