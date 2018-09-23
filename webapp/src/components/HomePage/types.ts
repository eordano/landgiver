import { Transaction } from '@dapps/modules/transaction/types'
import { Coordinates } from 'modules/giveaway/types'

export interface HomePageProps {
  available: Coordinates[]
  pendingTransactions: Transaction[]
  transactionHistory: Transaction[]
  totalSent: number
}
export interface HomePageState {
}
