import {createReducer} from 'typesafe-actions'

export interface ISellState {
  isOpened: boolean
}

const INITIAL_STATE: ISellState = {
  isOpened: false,
}

export const sellReducer = createReducer(INITIAL_STATE).handleType(
  'SET_SELL_STATE',
  (state: ISellState, action: {type: string; payload: any}) => {
    return {
      ...state,
      isOpened: action.payload,
    }
  },
)
