import {createCustomAction} from 'typesafe-actions'

export const setSellState = createCustomAction(
  'SET_SELL_STATE',
  (sellState: boolean) => ({
    sellState: sellState,
  }),
)
