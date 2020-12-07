import {createReducer} from 'typesafe-actions'
import {restoreToken, signIn, signOut, signUp} from '../actions/authActions'
import { IUsersState } from './usersReducer'

export interface IAuthState {
  isLoading: boolean
  isSignout: boolean
  userToken: string | null
  id: string
}

const INITIAL_STATE: IAuthState = {
  isLoading: false,
  isSignout: true,
  userToken: '',
  id: '',
}

export const authReducer = createReducer(INITIAL_STATE)
  .handleAction(
    restoreToken,
    (state: IAuthState, action: {type: string; payload: any}) => {
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
      }
    },
  )
  	.handleType('SIGN_UP_SUCCESS',
    (state: IAuthState, action: {type: string; payload: any}) => {
      console.log('HI')
      console.log(action)
      //console.log('HEREHEREHRHEHREHHREHERHHREHEHHREHEHREHREH: ', action.payload, 'rr');
      return {
        ...state,
        isSignout: false,
        userToken: action.payload.userToken,
        id: action.payload.id,
      }
    },
)
    .handleType('SIGN_IN_SUCCESS',
    (state: IAuthState, action: {type: string; payload: any}) => {
      console.log('HI')
      //console.log('HEREHEREHRHEHREHHREHERHHREHEHHREHEHREHREH: ', action.payload, 'rr');
      return {
        ...state,
        isSignout: false,
        userToken: action.payload.userToken,
        id: action.payload.id,
      }
    },
)
  
  .handleAction(signOut, (state: IAuthState) => {
    console.log('GOT INTO SIGN OUT')
    return {
      ...state,
      isSignout: true,
      userToken: null,
    }
  })