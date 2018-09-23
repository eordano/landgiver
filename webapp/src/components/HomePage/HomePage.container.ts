import { connect } from 'react-redux'
import { RootState } from 'types'
import { getAddress } from '@dapps/modules/wallet/selectors'
import {
  getPendingTransactions,
  getTransactionHistory
} from '@dapps/modules/transaction/selectors'

import { getAvailable } from 'modules/giveaway/selectors'
import { Coordinates } from 'modules/giveaway/types'

import { Dispatch, AnyAction } from 'redux'
import { getLandRequest } from 'modules/giveaway/actions'

import HomePage from './HomePage'
import { HomePageProps } from './types'

const mapState = (state: RootState): Partial<HomePageProps> => {
  const address = getAddress(state)
  const available = getAvailable(state)

  const pendingTransactions = address
    ? getPendingTransactions(state, address).reverse()
    : []
  const transactionHistory = address
    ? getTransactionHistory(state, address).reverse()
    : []

  const totalSent = pendingTransactions.length + transactionHistory.length

  return {
    available,
    pendingTransactions,
    transactionHistory,
    totalSent
  }
}

const mapDispatch = (
  dispatch: Dispatch<AnyAction>
): Partial<HomePageProps> => ({
  getLand: (coors: Coordinates) => dispatch(getLandRequest(coors))
})

export default connect<any>(
  mapState,
  mapDispatch
)(HomePage)
