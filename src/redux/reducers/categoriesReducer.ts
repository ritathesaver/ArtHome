import {createReducer} from 'typesafe-actions'

export interface ICategories {
  id: string
  title: string
  coverUri: string
  overlayColor: string
}

export interface ICategoriesState {
  categories: ICategories[]
  loading: boolean
  error: Error | null
}

const INITIAL_STATE: ICategoriesState = {
  categories: [],
  loading: false,
  error: null,
}

export const categoriesReducer = createReducer(INITIAL_STATE).handleType(
  'GET_CATEGORIES_SUCCESS',
  (state: ICategoriesState, action: {type: string; payload: any}) => {
    return {
      ...state,
      categories: action.payload,
    }
  },
)
