import {createCustomAction} from 'typesafe-actions'

export const getUsers = createCustomAction('GET_USERS')
export const editUser = createCustomAction(
  'UPDATE_USER',
  (data: any, body: Object) => ({
    payload: {body, data},
  }),
)
export const getUserById = createCustomAction(
  'GET_USER_BY_ID',
  (id: string) => ({
    payload: {id},
  }),
)
