import { Transaction } from '@dapps/modules/transaction/types'
import { Coordinates } from 'modules/giveaway/types'
import { GetLandRequestAction } from 'modules/giveaway/actions'

export interface HomePageProps {
  isLoading: boolean
  available: Coordinates[]
  pendingTransactions: Transaction[]
  transactionHistory: Transaction[]
  totalSent: number
  getLand: (coors: Coordinates) => GetLandRequestAction
}
export interface HomePageState {}
