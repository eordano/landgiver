import { contracts } from 'decentraland-eth'
import { env } from 'decentraland-commons'
import { LANDGiveaway } from './LANDGiveaway'

const manaToken = new contracts.MANAToken(
  env.get('REACT_APP_MANA_TOKEN_CONTRACT_ADDRESS')
)

const giveaway = new LANDGiveaway(
  env.get('REACT_APP_LAND_GIVEAWAY_CONTRACT_ADDRESS')
) as any

export { manaToken, giveaway }
