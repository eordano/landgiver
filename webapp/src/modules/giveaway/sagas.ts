import { takeLatest, put, call } from 'redux-saga/effects'
import {
  CONNECT_WALLET_SUCCESS,
  ConnectWalletSuccessAction
} from '@dapps/modules/wallet/actions'
import {
  FETCH_AVAILABLE_REQUEST,
  fetchAvailableLandRequest,
  fetchAvailableLandSuccess,
  fetchAvailableLandFailure,
  FetchAvailableRequestAction
} from './actions'

import { giveaway } from 'contracts'

export function* giveawaySaga() {
  yield takeLatest(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
  yield takeLatest(FETCH_AVAILABLE_REQUEST, handleFetchAvailableLandRequest)
}

function* handleConnectWalletSuccess(_: ConnectWalletSuccessAction) {
  yield put(fetchAvailableLandRequest(''))
}

function* handleFetchAvailableLandRequest(_: FetchAvailableRequestAction) {
  try {
    const result = yield call(() => giveaway.availableLand())
    yield put(fetchAvailableLandSuccess(result))
  } catch (error) {
    yield put(fetchAvailableLandFailure(error.message))
  }
}
