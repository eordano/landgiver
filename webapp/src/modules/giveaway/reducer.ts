import { loadingReducer, LoadingState } from '@dapps/modules/loading/reducer'

import { Coordinates } from './types'

import {
  FETCH_AVAILABLE_REQUEST,
  FETCH_AVAILABLE_SUCCESS,
  FETCH_AVAILABLE_FAILURE,
  FetchAvailableRequestAction,
  FetchAvailableFailureAction,
  FetchAvailableSuccessAction
} from './actions'

export type AvailableState = {
  loading: LoadingState
  data: Array<Coordinates>
  error: null | string
}

export type FetchAvailableReducerAction =
  | FetchAvailableRequestAction
  | FetchAvailableSuccessAction
  | FetchAvailableFailureAction

export const AvailableInitialState: AvailableState = {
  loading: [],
  data: [],
  error: null
}

export function availableReducer(
  state: AvailableState = AvailableInitialState,
  action: FetchAvailableReducerAction
): AvailableState {
  switch (action.type) {
    case FETCH_AVAILABLE_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case FETCH_AVAILABLE_SUCCESS: {
      return {
        loading: loadingReducer(state.loading, action),
        data: action.payload,
        error: null
      }
    }
    case FETCH_AVAILABLE_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.errorMessage
      }
    }
    default: {
      return state
    }
  }
}
