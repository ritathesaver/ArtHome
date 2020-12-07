import {createCustomAction} from 'typesafe-actions'

export const getPictures = createCustomAction(
  'DELETE_TODO',
  (userId: number | undefined) => ({payload: {userId}}),
)
