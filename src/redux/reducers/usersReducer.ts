import {createReducer} from 'typesafe-actions'

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

export const usersReducer = createReducer(INITIAL_STATE).handleType(
  'GET_USERS_SUCCESS',
  (state: IUsersState, action: {type: string; payload: any}) => {
    return {
      ...state,
      users: action.payload,
    }
  })
    .handleType('ADD_USER_SUCCESS',
    (state: IUsersState, action: {type: string; payload: any}) => {
      console.log(action.payload, 'payload')

      //console.log('HEREHEREHRHEHREHHREHERHHREHEHHREHEHREHREH: ', action.payload, 'rr');
      return {
        ...state,
        loading: false,
        error: null,
        users: [ ...state.users, action.payload]
      }
    },
  )
