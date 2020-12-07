import {createStore, applyMiddleware} from 'redux'
import rootReducer from './rootReducer'
import {rootSaga} from './sagas'
import createSagaMiddleware from 'redux-saga'
import {logger} from './logger'
//import thunk from 'redux-thunk'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware, logger),
)
sagaMiddleware.run(rootSaga)
