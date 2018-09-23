import { MiddlewareAPI, AnyAction, Store } from 'redux'
import { RouterState } from 'react-router-redux'
import { WalletState } from '@dapps/modules/wallet/reducer'
import { AvailableState } from './modules/giveaway/reducer'

export type RootState = {
  router: RouterState
  wallet: WalletState
  available: AvailableState
}

export type RootStore = Store<RootState>

export interface RootDispatch<A = AnyAction> {
  (action: A): A
}

export type RootMiddleware = (
  store: MiddlewareAPI<any>
) => (next: RootDispatch<AnyAction>) => (action: AnyAction) => any
