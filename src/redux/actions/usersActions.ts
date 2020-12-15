import {createCustomAction} from 'typesafe-actions'

export const getUsers = createCustomAction('GET_USERS')
export const editUserAvatar = createCustomAction(
  'EDIT_USER_AVATAR',
  (avatarUri: string, body: Object) => ({
    payload: {body, avatarUri},
  }),
)
export const addSpecialization = createCustomAction(
  'EDIT_USER_SPECIALIZATION',
  (specialization: string[], body: Object) => ({
    payload: {body, specialization},
  }),
)
export const addAboutText = createCustomAction(
  'EDIT_USER_ABOUT',
  (aboutText: string, body: Object) => ({
    payload: {body, aboutText},
  }),
)
export const getUserById = createCustomAction(
  'GET_USER_BY_ID',
  (id: string) => ({
    payload: {id},
  }),
)
