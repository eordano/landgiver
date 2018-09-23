import { action } from 'typesafe-actions'
import { Coordinates } from './types'

// Fetch Rents

export const FETCH_AVAILABLE_REQUEST = '[Request] Fetch Availables'
export const FETCH_AVAILABLE_SUCCESS = '[Success] Fetch Availables'
export const FETCH_AVAILABLE_FAILURE = '[Failure] Fetch Availables'

export const fetchAvailableLandRequest = (address: string) =>
  action(FETCH_AVAILABLE_REQUEST, {
    address
  })

export const fetchAvailableLandSuccess = (coors: Array<Coordinates>) =>
  action(FETCH_AVAILABLE_SUCCESS, coors)

export const fetchAvailableLandFailure = (errorMessage: string) =>
  action(FETCH_AVAILABLE_FAILURE, {
    errorMessage
  })

export type FetchAvailableRequestAction = ReturnType<typeof fetchAvailableLandRequest>
export type FetchAvailableSuccessAction = ReturnType<typeof fetchAvailableLandSuccess>
export type FetchAvailableFailureAction = ReturnType<typeof fetchAvailableLandFailure>

