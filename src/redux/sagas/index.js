import {all} from 'redux-saga/effects'
import {watchSignUp, watchSignIn, watchAddUser} from './authSagas'
import {
  watchGetUsers,
  watchEditAvatar,
  watchAddSpec,
  watchGetUserById,
} from './userSagas'
import {watchGetCategories} from './caterogiesSagas'
import {
  watchAddPicture,
  watchGetPictures,
  watchGetPicturesByUser,
  watchGetPicturesByCategory,
} from './pictureSagas'

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
    watchGetPicturesByUser(),
    watchGetPicturesByCategory(),
    watchGetUserById(),
  ])
}
