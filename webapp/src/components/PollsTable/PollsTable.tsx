import * as React from 'react'
import { Props } from './PollsTable.types'
import {
  Header,
  Table,
  Pagination,
  TableProps,
  HeaderMenu,
  Dropdown
} from 'decentraland-ui'
import { Link } from 'react-router-dom'
import { locations } from 'locations'
import Token from 'components/Token'
import { t } from '@dapps/modules/translation/utils'
import './PollsTable.css'
import {
  FilterStatus,
  FilterType,
  PollWithAssociations
} from 'modules/poll/types'
import { isFinished } from 'modules/poll/utils'

export default class PollsTable extends React.PureComponent<Props> {
  static defaultProps = {
    rowsPerPage: 20
  }

  componentWillMount() {
    const { page, type, status } = this.props
    this.fetchPolls(page, type, status)
  }

  componentWillReceiveProps(next: Props) {
    const { page, type, status } = this.props
    if (next.page !== page || next.type !== type || next.status !== status) {
      this.fetchPolls(next.page, next.type, next.status)
    }
  }

  fetchPolls(
    page: number = 1,
    type: FilterType = 'all',
    status: FilterStatus = 'all'
  ) {
    const { rowsPerPage, onFetchPolls } = this.props
    const limit = rowsPerPage
    const offset = (page - 1) * rowsPerPage
    onFetchPolls({
      limit,
      offset,
      type,
      status
    })
  }

  handlePageChange = (_: React.SyntheticEvent, { activePage }: TableProps) => {
    const { onPageChange } = this.props
    onPageChange(activePage)
  }

  handleStatusChange = (_: React.SyntheticEvent, { value }: any) => {
    const { onStatusChange } = this.props
    onStatusChange(value)
  }

  getHandler = (poll: PollWithAssociations) => () => {
    const { onNavigate } = this.props
    onNavigate(locations.pollDetail(poll.id))
  }

  render() {
    const { polls } = this.props
    const { status, type, totalRows, page, rowsPerPage } = this.props
    const totalPages = Math.ceil(totalRows / rowsPerPage)

    const statusFilters: FilterStatus[] = ['all', 'active', 'expired']

    const isEmpty = polls.length === 0

    return (
      <div className="PollsTable">
        <HeaderMenu>
          <HeaderMenu.Left>
            <Header size="large">{t(`polls_table.${type}_polls`)}</Header>
          </HeaderMenu.Left>
          <HeaderMenu.Right>
            <Dropdown
              direction="left"
              value={status}
              options={statusFilters.map(option => ({
                key: option,
                value: option,
                text: t(`polls_table.${option}_polls`)
              }))}
              onChange={this.handleStatusChange}
            />
          </HeaderMenu.Right>
        </HeaderMenu>
        <Table basic="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={12}>
                {t('polls_table.title')}
              </Table.HeaderCell>
              <Table.HeaderCell>
                {type === 'district'
                  ? t('polls_table.total_voted')
                  : t('polls_table.weight')}
              </Table.HeaderCell>
              <Table.HeaderCell>{t('polls_table.votes')}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {polls.map((poll, index) => (
              <Table.Row
                key={index}
                className={isFinished(poll) ? 'finished' : 'ongoing'}
                onClick={this.getHandler(poll)}
              >
                <Table.Cell className="title">
                  <span className="mobile-header">
                    {t('polls_table.title')}
                    :&nbsp;
                  </span>
                  <Link to={locations.pollDetail(poll.id)}>{poll.title}</Link>
                </Table.Cell>
                <Table.Cell>
                  <span className="mobile-header">
                    {t('polls_table.total_voted')}
                    :&nbsp;
                  </span>
                  <Token token={poll.token} amount={poll.balance} cell />
                </Table.Cell>
                <Table.Cell>
                  <span className="mobile-header">
                    {t('polls_table.votes')}
                    :&nbsp;
                  </span>
                  {poll.votes.length}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        {isEmpty ? <div className="empty">{t('polls_table.empty')}</div> : null}
        {totalPages > 1 ? (
          <div className="pagination-wrapper">
            <Pagination
              activePage={page}
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
