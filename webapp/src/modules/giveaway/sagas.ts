import { takeLatest, put, call } from 'redux-saga/effects'
import {
  CONNECT_WALLET_SUCCESS,
  CONNECT_WALLET_FAILURE,
  ConnectWalletSuccessAction
} from '@dapps/modules/wallet/actions'
import {
  FETCH_AVAILABLE_REQUEST,
  fetchAvailableLandRequest,
  fetchAvailableLandSuccess,
  fetchAvailableLandFailure,
  FetchAvailableRequestAction
} from './actions'

import { Coordinates } from './types'

import { giveaway } from 'contracts'

export function* giveawaySaga() {
  yield takeLatest(CONNECT_WALLET_SUCCESS, dispatchFetchAvailable)
  yield takeLatest(CONNECT_WALLET_FAILURE, dispatchFetchAvailable)
  yield takeLatest(FETCH_AVAILABLE_REQUEST, handleFetchAvailableLandRequest)
}

function* dispatchFetchAvailable(_: ConnectWalletSuccessAction) {
  yield put(fetchAvailableLandRequest())
}

function* handleFetchAvailableLandRequest(_: FetchAvailableRequestAction) {
  try {
    const callResult = yield call(() => giveaway.availableLand())
    const result: Coordinates[] = []
    for (let i = 0; i < callResult[0].length; i++) {
      result.push({ x: callResult[0][i].toNumber() as number, y: callResult[1][i].toNumber() as number })
    }
    yield put(fetchAvailableLandSuccess(result))
  } catch (error) {
    yield put(fetchAvailableLandFailure(error.message))
  }
}
