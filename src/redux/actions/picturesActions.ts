import {createCustomAction} from 'typesafe-actions'
const {v4: uuidv4} = require('uuid')
import 'react-native-get-random-values'

const id: string = uuidv4()

export const addPicture = createCustomAction(
  'ADD_PICTURE',
  (
    creatorId: string,
    categoryId: string,
    title: string,
    description: string,
    uri: string,
    price: string,
    location: string,
  ) => ({
    payload: {
      id,
      creatorId,
      categoryId,
      title,
      description,
      uri,
      price,
      location,
    },
  }),
)

export const getPictures = createCustomAction('GET_PICTURES')

export const getPicturesByUser = createCustomAction(
  'GET_PICTURES_BY_USER',
  (creatorId: string) => ({
    payload: {
      creatorId,
    },
  }),
)

export const getPicturesByCategory = createCustomAction(
  'GET_PICTURES_BY_CATEGORY',
  (categoryId: string) => ({
    payload: {
      categoryId,
    },
  }),
)
