import {all} from 'redux-saga/effects'
import {watchSignUp, watchSignIn, watchAddUser} from './authSagas'
import {watchGetUsers, watchEditAvatar, watchAddSpec} from './userSagas'
import {watchGetCategories} from './caterogiesSagas'
import {watchAddPicture, watchGetPictures} from './pictureSagas'

export function* rootSaga() {
  yield all([
    watchSignUp(),
    watchSignIn(),
    watchAddUser(),
    watchGetUsers(),
    watchEditAvatar(),
    watchAddSpec(),
    watchGetCategories(),
    watchAddPicture(),
    watchGetPictures(),
  ])
}
