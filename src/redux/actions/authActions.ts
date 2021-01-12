import {createCustomAction} from 'typesafe-actions'
const {v4: uuidv4} = require('uuid')
import 'react-native-get-random-values'

const id = uuidv4()

export const restoreToken = createCustomAction(
  'RESTORE_TOKEN',
  (token: string) => ({payload: token}),
)
export const signIn = createCustomAction(
  'SIGN_IN',
  (email: string, password: string) => ({
    payload: {email, password},
  }),
)
export const signUp = createCustomAction(
  'SIGN_UP',
  (email: string, password: string) => ({
    payload: {id: id, email, password},
  }),
)
export const signOut = createCustomAction('SIGN_OUT')
export const createUser = createCustomAction(
  'ADD_USER',
  (email: string, name: string, location: string) => ({
    payload: {
      id: id,
      userId: id,
      email: email,
      name: name,
      about: 'Nothing to say yet',
      address: location,
      avatarUri:
        'https://us.123rf.com/450wm/2nix/2nix1408/2nix140800099/30818272-anonymous-avatar-profile-icon-vector-.jpg?ver=6',
      phone: 'none',
      specialization: [],
    },
  }),
)
