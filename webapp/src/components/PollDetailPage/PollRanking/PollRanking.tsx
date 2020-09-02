import * as React from 'react'
import { Table, Pagination, PaginationProps } from 'decentraland-ui'
import Token from 'components/Token'
import './PollRanking.css'
import { Props, State } from './PollRanking.types'

const VOTES_PER_PAGE = 10

export default class PollRanking extends React.Component<Props, State> {
  state: State = {
    activePage: 1
  }

  getTotalPages() {
    return Math.ceil(this.props.results.length / VOTES_PER_PAGE)
  }

  handlePageChange = (_: React.MouseEvent<any>, props: PaginationProps) => {
    const activePage = Math.max(1, Math.min(props.totalPages as number, props.activePage as number))
    this.setState({ activePage })
  }

  render() {
    const { activePage } = this.state
    const offset = VOTES_PER_PAGE * (activePage - 1)
    const results = this.props.results
      .sort((resultA, resultB) => {
        return resultB.percentage - resultA.percentage
      })
      .slice(offset, offset + VOTES_PER_PAGE)

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
                <Table.Cell className="ranking">{offset + index + 1}</Table.Cell>
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
        {this.props.results.length > VOTES_PER_PAGE && <div className="RankingPagination">
          <Pagination
            activePage={this.state.activePage}
            totalPages={this.getTotalPages()}
            firstItem={null}
            lastItem={null}
            nextItem={null}
            prevItem={null}
            onPageChange={this.handlePageChange} />
        </div>}
      </div>
    )
  }
}
