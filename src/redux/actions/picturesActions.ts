import {createAsyncAction, createCustomAction} from 'typesafe-actions'
const {v4: uuidv4} = require('uuid')
import 'react-native-get-random-values'
import { IPictures } from '../reducers/picturesReducer'

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

export const getPicturesAsync = createAsyncAction('GET_PICTURES_STARTED', 'GET_PICTURES_SUCCESS', 'GET_PICTURES_FAILURE')<
	null,
	IPictures,
	Error
>()

export const getPicturesByCategory = createCustomAction(
  'GET_PICTURES_BY_CATEGORY',
  (categoryId: string) => ({
    payload: {
      categoryId,
    },
  }),
)

export const getPicturesByCategoryAsync = createAsyncAction('GET_PICTURES_BY_CATEGORY_STARTED', 'GET_PICTURES_BY_CATEGORY_SUCCESS', 'GET_PICTURES_BY_CATEGORY_FAILURE')<
	null,
	IPictures,
	Error
>()
