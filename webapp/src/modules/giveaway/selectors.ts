import { RootState } from 'types'

export const getState = (state: RootState) => state.available
export const getData = (state: RootState) => getState(state).data
export const getLoading = (state: RootState) => getState(state).loading
export const isLoading: (state: RootState) => boolean = state =>
  getState(state).loading.length > 0
export const getError = (state: RootState) => getState(state).error
export const getAvailable = (state: RootState) => getData(state)
