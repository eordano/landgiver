import * as React from 'react'
import {
  Header,
  Segment,
  Table,
  Blockie,
  Address,
  Loader
} from 'decentraland-ui'

import EtherscanLink from '@dapps/containers/EtherscanLink'
import { Transaction } from '@dapps/modules/transaction/types'

import { HomePageProps, HomePageState } from './types'
import './HomePage.css'

import { Coordinates } from 'modules/giveaway/types'
import { GetLandRequestAction } from 'modules/giveaway/actions'

type LandImageProps = {
  coors: Coordinates
  getLand: (coors: Coordinates) => GetLandRequestAction
}

class LandImage extends React.PureComponent<LandImageProps, any> {
  handleClick = () => this.props.getLand(this.props.coors)

  render() {
    const land = this.props.coors
    const key = `${land.x},${land.y}`
    const url = `https://api.decentraland.org/v1/map.png?width=64&height=64&center=${key}&selected=${key}`
    return (
      <div className="" key={key}>
        <a href="#" onClick={this.handleClick}>
          <img src={url} />
        </a>
      </div>
    )
  }
}

export default class HomePage extends React.PureComponent<
  HomePageProps,
  HomePageState
> {
  renderAvailable(land: Coordinates) {
    return (
      <LandImage
        key={land.x + ',' + land.y}
        coors={land}
        getLand={this.props.getLand}
      />
    )
  }

  render() {
    const {
      isLoading,
      available,
      pendingTransactions,
      transactionHistory,
      totalSent
    } = this.props
    const transactions = [...pendingTransactions, ...transactionHistory]

    if (isLoading) {
      return <Loader active size="massive" />
    }

    return (
      <div className="HomePage">
        <Header size="huge">Giving Away LAND</Header>
        <Header sub>Get a LAND to use for free for 24 hours</Header>
        <Segment>
          <div className="header">
            <Header>Available Lands</Header>
            {available.map(land => this.renderAvailable(land))}
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
                {transactions.map((transaction: Transaction) => (
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
