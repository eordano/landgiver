import { takeLatest, put, call } from 'redux-saga/effects'
import {
  CONNECT_WALLET_SUCCESS,
  ConnectWalletSuccessAction
} from '@dapps/modules/wallet/actions'
import {
  FETCH_AVAILABLE_REQUEST,
  fetchAvailableLandRequest,
  fetchAvailableLandSuccess,
  fetchAvailableLandError
  FetchAvailableRequestAction
} from './actions'

import { giveaway } from 'contracts'

export function* inviteSaga() {
  yield takeLatest(CONNECT_WALLET_SUCCESS, handleConnectWalletSuccess)
  yield takeLatest(FETCH_AVAILABLE_REQUEST, handleFetchInvitesRequest)
}

function* handleConnectWalletSuccess(action: ConnectWalletSuccessAction) {
  yield put(fetchInvitesRequest(action.payload.wallet.address))
}

function* handleFetchInvitesRequest(action: FetchAvailableRequestAction) {
  try {
    const result = yield call(() => giveaway.availableLand())
    yield put(fetchAvailableLandSuccess(result))
  } catch (error) {
    yield put(fetchAvailableLandError(error.message))
  }
}
