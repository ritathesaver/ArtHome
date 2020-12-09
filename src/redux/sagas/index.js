import {all} from 'redux-saga/effects'
import {watchSignUp, watchSignIn, watchAddUser} from './authSagas'
import {watchGetUsers, watchEditAvatar, watchAddSpec} from './userSagas'
import {watchGetCategories} from './caterogiesSagas'

export function* rootSaga() {
  yield all([
    watchSignUp(),
    watchSignIn(),
    watchAddUser(),
    watchGetUsers(),
    watchEditAvatar(),
    watchAddSpec(),
    watchGetCategories(),
  ])
}
