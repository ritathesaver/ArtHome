import { createCustomAction } from 'typesafe-actions'
const {v4: uuidv4} = require('uuid')
import 'react-native-get-random-values'


export const putLike = createCustomAction('PUT_LIKE',  (pictureId: string, creatorId:string) => ({
  payload: { pictureId, creatorId, id: uuidv4()},
}))
  
export const deleteLike = createCustomAction('DELETE_LIKE',  (likeId: string) => ({
    payload: {likeId},
}))
  
export const getLikes = createCustomAction('GET_LIKES')