import * as React from 'react'
import * as Markdown from 'react-markdown'
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

  getResults() {
    const { activePage } = this.state
    const offset = VOTES_PER_PAGE * (activePage - 1)

    return this.props.results
      .sort((resultA, resultB) => {
        return (
          resultB.percentage - resultA.percentage ||
          resultA.option.value.localeCompare(resultB.option.value)
        )
      })
      .slice(offset, offset + VOTES_PER_PAGE)
  }

  handlePageChange = (_: React.MouseEvent<any>, props: PaginationProps) => {
    const activePage = Math.max(
      1,
      Math.min(props.totalPages as number, props.activePage as number)
    )
    this.setState({ activePage })
  }

  render() {
    const { activePage } = this.state
    const offset = VOTES_PER_PAGE * (activePage - 1)
    const results = this.getResults()

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
              return (
                <Table.Row key={index}>
                  <Table.Cell className="ranking">
                    {offset + index + 1}
                  </Table.Cell>
                  <Table.Cell>
                    <Markdown
                      source={option.value}
                      allowedTypes={['text', 'paragraph', 'link']}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Token token={token!} amount={votes} cell />
                  </Table.Cell>
                  <Table.Cell>{percentage} %</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
        {this.props.results.length > VOTES_PER_PAGE && (
          <div className="RankingPagination">
            <Pagination
              activePage={this.state.activePage}
              totalPages={this.getTotalPages()}
              firstItem={null}
              lastItem={null}
              nextItem={null}
              prevItem={null}
              onPageChange={this.handlePageChange}
            />
          </div>
        )}
      </div>
    )
  }
}
