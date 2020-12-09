import {createCustomAction} from 'typesafe-actions'
const {v4: uuidv4} = require('uuid')
import 'react-native-get-random-values'

const id: string = uuidv4()

export const addPicture = createCustomAction(
  'ADD_PICTURE',
  (
    userId: string,
    categoryId: string,
    title: string,
    description: string,
    uri: string,
    price: string,
    location: string,
  ) => ({
    payload: {id, userId, categoryId, title, description, uri, price, location},
  }),
)

export const getPictures = createCustomAction('GET_PICTURES')
