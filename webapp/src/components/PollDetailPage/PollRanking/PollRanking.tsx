import * as React from 'react'
import { Table } from 'decentraland-ui'
import Token from 'components/Token'
import './PollRanking.css'
import { Props } from './PollRanking.types'

export default class PollRanking extends React.PureComponent<Props> {
  render() {
    const results = this.props.results.sort((resultA, resultB) => {
      return resultB.percentage - resultA.percentage
    })
    console.log(results)

    return (
      <div className="PollRanking">
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>#</Table.HeaderCell>
              <Table.HeaderCell>Vote</Table.HeaderCell>
              <Table.HeaderCell>Weight</Table.HeaderCell>
              <Table.HeaderCell>Percentage</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {results.map(({ option, votes, percentage, token }, index) => {
              return <Table.Row key={index}>
                <Table.Cell className="ranking">{index + 1}</Table.Cell>
                <Table.Cell>{option.value}</Table.Cell>
                <Table.Cell>
                  <Token token={token!} amount={votes} cell />
                </Table.Cell>
                <Table.Cell>{percentage} % </Table.Cell>
              </Table.Row>
            })}
            {/* {rows.map(({ poll, weight, voters, status, outcome }, index) => {
              const isClosed = status === 'Closed'
              const linkClass = isClosed ? 'link-closed' : null
              const noLinkClass = isClosed ? 'closed' : null
              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    <a className={linkClass} href="#">
                      {poll}
                    </a>
                  </Table.Cell>
                  <Table.Cell className={noLinkClass}>
                    <Mana inline />
                    {weight}
                  </Table.Cell>
                  <Table.Cell className={noLinkClass}>{voters}</Table.Cell>
                  <Table.Cell className={noLinkClass}>{status}</Table.Cell>
                  <Table.Cell className={noLinkClass}>{outcome}</Table.Cell>
                </Table.Row>
              )
            })} */}
          </Table.Body>
        </Table>
      </div>
    )
  }
}
