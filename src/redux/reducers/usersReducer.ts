import {createReducer} from 'typesafe-actions'
import {unionBy} from 'lodash'

export interface IUsers {
  id: string
  userId: string
  name: string
  email: string
  about: string
  address: string
  phone: string
  avatarUri: string
  specialization: string[]
}

export interface IUsersState {
  users: IUsers[]
  loading: boolean
  error: Error | null
}

const INITIAL_STATE: IUsersState = {users: [], loading: false, error: null}

export const usersReducer = createReducer(INITIAL_STATE)
  .handleType(
    'GET_USERS_SUCCESS',
    (state: IUsersState, action: {type: string; payload: any}) => {
      // console.log(action.payload, 'aaaaaaaaaa')
      return {
        ...state,
        users: unionBy([...state.users], action.payload, ({id}) => id),
      }
    },
  )
  .handleType(
    'GET_USERS_ERROR',
    (state: IUsersState, action: {type: string; payload: any}) => {
      console.log(action.payload, 'aaaaaaaaaa')
      return {
        ...state,
        error: action.payload,
      }
    },
  )
  .handleType(
    'ADD_USER_SUCCESS',
    (state: IUsersState, action: {type: string; payload: any}) => {
      // console.log(action.payload, 'payload')

      //console.log('HEREHEREHRHEHREHHREHERHHREHEHHREHEHREHREH: ', action.payload, 'rr');
      return {
        ...state,
        loading: false,
        error: null,
        users: [...state.users, action.payload],
      }
    },
  )
  .handleType(
    'EDIT_USER_SUCCESS',
    (state: IUsersState, action: {type: string; payload: any}) => {
      const {id} = action.payload

      //console.log('HEREHEREHRHEHREHHREHERHHREHEHHREHEHREHREH: ', action.payload, 'rr');
      return {
        ...state,
        users: state.users.map(
          (user: IUsers): IUsers => {
            if (user.id !== id) {
              return user
            }
            return {...user, ...action.payload}
          },
        ),
      }
    },
  )
