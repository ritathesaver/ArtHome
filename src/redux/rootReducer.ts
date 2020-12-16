import {combineReducers} from 'redux'
import {authReducer, usersReducer} from './reducers'
import {IAuthState} from './reducers/authReducer'
import {categoriesReducer, ICategoriesState} from './reducers/categoriesReducer'
import {ILikesState, likesReducer} from './reducers/likesReducer'
import {IPicturesState, picturesReducer} from './reducers/picturesReducer'
import {ISellState, sellReducer} from './reducers/sellReducer'
import {IUsersState} from './reducers/usersReducer'

export interface RootState {
  users: IUsersState
  pictures: IPicturesState
  auth: IAuthState
  categories: ICategoriesState
  likes: ILikesState
  sellState: ISellState
}

export default combineReducers({
  users: usersReducer,
  pictures: picturesReducer,
  auth: authReducer,
  categories: categoriesReducer,
  likes: likesReducer,
  sellState: sellReducer,
})
