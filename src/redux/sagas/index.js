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
import {
  watchAddOrder,
  watchDeleteOrder,
  watchEditOrder,
  watchGetOrders,
} from './orderSagas'

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
    watchAddOrder(),
    watchGetOrders(),
    watchDeleteOrder(),
    watchEditOrder(),
  ])
}
