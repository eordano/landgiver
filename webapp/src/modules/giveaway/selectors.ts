import { RootState } from 'types'

export const getState = (state: RootState) => state.available
export const getData = (state: RootState) => getState(state).data
export const getLoading = (state: RootState) => getState(state).loading
export const getError = (state: RootState) => getState(state).error
export const getAvailable = (state: RootState) => getData(state)
