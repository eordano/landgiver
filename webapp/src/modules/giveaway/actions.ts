import { action } from 'typesafe-actions'
import { Coordinates } from './types'

// Fetch Rents

export const FETCH_AVAILABLE_REQUEST = '[Request] Fetch Availables'
export const FETCH_AVAILABLE_SUCCESS = '[Success] Fetch Availables'
export const FETCH_AVAILABLE_FAILURE = '[Failure] Fetch Availables'

export const fetchAvailableLandRequest = () => action(FETCH_AVAILABLE_REQUEST)

export const fetchAvailableLandSuccess = (coors: Array<Coordinates>) =>
  action(FETCH_AVAILABLE_SUCCESS, coors)

export const fetchAvailableLandFailure = (errorMessage: string) =>
  action(FETCH_AVAILABLE_FAILURE, {
    errorMessage
  })

export type FetchAvailableRequestAction = ReturnType<typeof fetchAvailableLandRequest>
export type FetchAvailableSuccessAction = ReturnType<typeof fetchAvailableLandSuccess>
export type FetchAvailableFailureAction = ReturnType<typeof fetchAvailableLandFailure>


// Get a LAND

export const GET_LAND_REQUEST = '[Request] Get Land'
export const GET_LAND_SUCCESS = '[Success] Get Land'
export const GET_LAND_FAILURE = '[Failure] Get Land'

export const getLandRequest = (coors: Coordinates) => action(GET_LAND_REQUEST, coors)

export const getLandSuccess = (coors: Coordinates) =>
  action(GET_LAND_SUCCESS, coors)

export const getLandFailure = (Coordinates coors, errorMessage: string) =>
  action(GET_LAND_FAILURE, {
    coors,
    errorMessage
  })

export type GetLandRequestAction = ReturnType<typeof getLandRequest>
export type GetLandSuccessAction = ReturnType<typeof getLandSuccess>
export type GetLandFailureAction = ReturnType<typeof getLandFailure>
