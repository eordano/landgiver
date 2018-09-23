import * as React from 'react'
import {
  Header,
  Segment,
  Table,
  Blockie,
  Address
} from 'decentraland-ui'

import EtherscanLink from '@dapps/containers/EtherscanLink'
import { Transaction } from '@dapps/modules/transaction/types'

import { HomePageProps, HomePageState } from './types'
import './HomePage.css'

import { Coordinates } from 'modules/giveaway/types'

export default class HomePage extends React.PureComponent<
  HomePageProps,
  HomePageState
> {

  renderAvailable(land: Coordinates) {
    return <div className=''>
      <img src={`https://api.decentraland.org/v1/map.png?width=64&height=64&center=${land.x},${land.y}`} />
    </div>
  }

  render() {
    const {
      available,
      pendingTransactions,
      transactionHistory,
      totalSent
    } = this.props
    const transations = [...pendingTransactions, ...transactionHistory]
    return (
      <div className="HomePage">
        <Header size="huge">Giving Away LAND</Header>
        <Header sub>
          Get a LAND to use for free for 24 hours
        </Header>
        <Segment>
          <div className="header">
            <Header>Available Lands</Header>
            { available.map(land => this.renderAvailable(land)) }
          </div>
        </Segment>

        {totalSent > 0 ? (
          <>
            <Header>Rent History ({totalSent})</Header>
            <Table basic>
              <Table.Header>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Header>
              <Table.Body>
                {transations.map((transaction: Transaction) => (
                  <Table.Row>
                    <Table.Cell className="address">
                      <Blockie
                        seed={(transaction as any).payload.address}
                        scale={3}
                      />
                      <Address
                        shorten={false}
                        value={(transaction as any).payload.address}
                      />
                    </Table.Cell>
                    <Table.Cell className="status">
                      <EtherscanLink txHash={transaction.hash}>
                        {transaction.status}{' '}
                      </EtherscanLink>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </>
        ) : null}
      </div>
    )
  }
}
