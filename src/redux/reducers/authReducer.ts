import {createReducer} from 'typesafe-actions'
import {restoreToken, signOut} from '../actions/authActions'
import {parseJwt} from './../../utilities/parseJwt'

export interface IAuthState {
  isLoading: boolean
  isSignout: boolean
  userToken: string | null
  id: string
}

const INITIAL_STATE: IAuthState = {
  isLoading: false,
  isSignout: false,
  userToken: '',
  id: '',
}

export const authReducer = createReducer(INITIAL_STATE)
  .handleAction(
    restoreToken,
    (state: IAuthState, action: { type: string; payload: any }) => {
      const id = parseJwt(action.payload)
      return {
        ...state,
        userToken: action.payload,
        isLoading: false,
        id: id.sub,
      }
    },
  )
  .handleType(
    'SIGN_UP_SUCCESS',
    (state: IAuthState, action: {type: string; payload: any}) => {
      // console.log('HI')
      // console.log(action)
      //console.log('HEREHEREHRHEHREHHREHERHHREHEHHREHEHREHREH: ', action.payload, 'rr');
      return {
        ...state,
        isSignout: false,
        userToken: action.payload.userToken,
        id: action.payload.id,
      }
    },
  )
  .handleType(
    'SIGN_IN_SUCCESS',
    (state: IAuthState, action: {type: string; payload: any}) => {
      const token = action.payload.userToken
      // console.log(token, 'token')

      const id = parseJwt(token)
      // console.log(id, 'id')
      //console.log('HEREHEREHRHEHREHHREHERHHREHEHHREHEHREHREH: ', action.payload, 'rr');
      return {
        ...state,
        isSignout: false,
        userToken: action.payload.userToken,
        id: id.sub,
      }
    },
  )
  .handleAction(signOut, (state: IAuthState) => {
    // console.log('GOT INTO SIGN OUT')
    return {
      ...state,
      isSignout: true,
      userToken: null,
      id: null,
    }
  })
