import {all} from 'redux-saga/effects'
import {watchSignUp, watchSignIn, watchAddUser} from './authSagas'
import {watchGetUsers, watchGetUserById, watchEdit} from './userSagas'
import {watchGetCategories} from './caterogiesSagas'
import {
  watchAddPicture,
  watchGetPictures,
  watchGetPicturesByUser,
  watchGetPicturesByCategory,
} from './pictureSagas'
import {watchAddLike, watchDeleteLike, watchGetLikes} from './likesSagas'

export function* rootSaga() {
  yield all([
    watchSignUp(),
    watchSignIn(),
    watchAddUser(),
    watchGetUsers(),
    watchGetCategories(),
    watchAddPicture(),
    watchGetPictures(),
    watchGetPicturesByUser(),
    watchGetPicturesByCategory(),
    watchGetUserById(),
    watchAddLike(),
    watchDeleteLike(),
    watchGetLikes(),
    watchEdit(),
  ])
}
