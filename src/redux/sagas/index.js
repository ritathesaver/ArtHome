import { all } from 'redux-saga/effects'
import {watchSignUp, watchSignIn, watchAddUser} from './authSagas'

export function* rootSaga() {
 	yield all([ watchSignUp(), watchSignIn(), watchAddUser(), ])
}