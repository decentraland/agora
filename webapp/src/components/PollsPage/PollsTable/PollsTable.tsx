import * as React from 'react'
import { Props } from './PollsTable.types'
import { Header, Table, Pagination, TableProps } from 'decentraland-ui'
import { Link } from 'react-router-dom'
import { locations } from 'locations'
import Token from 'components/Token'
import { t } from '@dapps/modules/translation/utils'
import './PollsTable.css'

export default class PollsTable extends React.PureComponent<Props> {
  handlePageChange = (_: any, { activePage }: TableProps) => {
    const { onPageChange } = this.props
    onPageChange(activePage)
  }
  render() {
    const { polls } = this.props
    if (!polls || polls.length === 0) {
      return null
    }
    const { title, totalRows, currentPage, rowsPerPage } = this.props
    const totalPages = Math.ceil(totalRows / rowsPerPage)
    return (
      <div className="PollsTable">
        <Header size="large">{title}</Header>
        <Table basic>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={12}>
                {t('polls_page.table.title')}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {t('polls_page.table.total_voted')}
              </Table.HeaderCell>
              <Table.HeaderCell>{t('polls_page.table.votes')}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {polls.map((poll, index) => (
              <Table.Row key={index}>
                <Table.Cell>
                  <Link to={locations.pollDetail(poll.id)}>{poll.title}</Link>
                </Table.Cell>
                <Table.Cell>
                  <Token token={poll.token} amount={poll.balance} cell />
                </Table.Cell>
                <Table.Cell>{poll.votes.length}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {totalPages > 1 ? (
          <div className="pagination-wrapper">
            <Pagination
              activePage={currentPage}
              totalPages={totalPages}
              firstItem={null}
              lastItem={null}
              onPageChange={this.handlePageChange}
            />
          </div>
        ) : null}
      </div>
    )
  }
}
