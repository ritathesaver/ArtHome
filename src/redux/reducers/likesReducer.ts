import {createReducer} from 'typesafe-actions'

export interface ILikes {
  id: string
  pictureId: string
  creatorId: string
}

export interface ILikesState {
  likes: ILikes[]
}

const INITIAL_STATE: ILikesState = {
  likes: []
}

export const likesReducer = createReducer(INITIAL_STATE).handleType(
  'ADD_LIKE_SUCCESS',
  (state: ILikesState, action: { type: string; payload: any }) => {
    console.log('ADD LIKE')
    return {
      ...state,
      likes: [...state.likes, action.payload],
    }
  },
).handleType(
  'DELETE_LIKE_SUCCESS',
  (state: ILikesState, action: {type: string; payload: any}) => {
    return {
      ...state,
       likes: state.likes.filter((like) => like.id !== action.payload.id)
    }
  },
)
.handleType(
  'GET_LIKES_SUCCESS',
  (state: ILikesState, action: { type: string; payload: any }) => {
    console.log(action.payload, 'payload')
    return {
      ...state,
      likes: action.payload,
    }
  },
)
