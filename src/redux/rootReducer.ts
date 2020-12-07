import {combineReducers} from 'redux'
import {authReducer, usersReducer} from './reducers'
import {IAuthState} from './reducers/authReducer'
import {IPicturesState, picturesReducer} from './reducers/picturesReducer'
import {IUsersState} from './reducers/usersReducer'

export interface RootState {
  users: IUsersState
  pictures: IPicturesState
  auth: IAuthState
}

export default combineReducers({
  users: usersReducer,
  pictures: picturesReducer,
  auth: authReducer,
})
