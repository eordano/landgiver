import { all } from 'redux-saga/effects'
import { env } from 'decentraland-commons'
import { eth } from 'decentraland-eth'
import { locationSaga } from '@dapps/modules/location/sagas'
import { createWalletSaga } from '@dapps/modules/wallet/sagas'
import { createTranslationSaga } from '@dapps/modules/translation/sagas'
import { transactionSaga } from '@dapps/modules/transaction/sagas'
import { giveawaySaga } from 'modules/giveaway/sagas'
import { manaToken, giveaway } from 'contracts'
import * as translations from 'translations'

const walletSaga = createWalletSaga({
  provider: env.get('REACT_APP_PROVIDER_URL'),
  contracts: [manaToken, giveaway],
  eth
})

export const translationSaga = createTranslationSaga({
  translations
})

export function* rootSaga() {
  yield all([
    locationSaga(),
    walletSaga(),
    translationSaga(),
    transactionSaga(),
    giveawaySaga()
  ])
}
