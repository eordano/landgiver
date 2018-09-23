import { connect } from 'react-redux'
import { RootState } from 'types'
import { getAddress } from '@dapps/modules/wallet/selectors'
import {
  getPendingTransactions,
  getTransactionHistory
} from '@dapps/modules/transaction/selectors'

import { getAvailable } from 'modules/giveaway/selectors'

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
): Partial<HomePageProps> => ({
})

export default connect<any>(
  mapState,
  mapDispatch
)(HomePage)
