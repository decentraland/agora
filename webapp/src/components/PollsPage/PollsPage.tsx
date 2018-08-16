import * as React from 'react'
import * as queryString from 'query-string'
import { Loader } from 'decentraland-ui'
import { Props } from './PollsPage.types'
import { t } from '@dapps/modules/translation/utils'
import PollsTable from './PollsTable'

export default class PollsPage extends React.PureComponent<Props> {
  activeRows: number = 10
  expiredRows: number = 10
  shouldFetchActivePolls: boolean = false
  shouldFetchExpiredPolls: boolean = false

  componentWillMount() {
    this.fetchActivePolls()
    this.fetchExpiredPolls()
  }

  componentWillReceiveProps({ location: { search } }: Props) {
    const query = queryString.parse(search)
    const { activePage, expiredPage } = this.getPagination()
    const newActivePage = +query.active
    const newExpiredPage = +query.expired
    if (!isNaN(newActivePage) && newActivePage !== activePage) {
      this.shouldFetchActivePolls = true
    }
    if (!isNaN(newExpiredPage) && newExpiredPage !== expiredPage) {
      this.shouldFetchExpiredPolls = true
    }
  }

  componentDidUpdate() {
    if (this.shouldFetchActivePolls) {
      this.fetchActivePolls()
      this.shouldFetchActivePolls = false
    }
    if (this.shouldFetchExpiredPolls) {
      this.fetchExpiredPolls()
      this.shouldFetchExpiredPolls = false
    }
  }

  fetchActivePolls() {
    const { onFetchPolls } = this.props
    const { activePage } = this.getPagination()
    onFetchPolls({
      limit: this.activeRows,
      offset: (activePage - 1) * this.activeRows,
      active: true,
      expired: false
    })
  }

  fetchExpiredPolls() {
    const { onFetchPolls } = this.props
    const { expiredPage } = this.getPagination()
    onFetchPolls({
      limit: this.expiredRows,
      offset: (expiredPage - 1) * this.expiredRows,
      active: false,
      expired: true
    })
  }

  getQueryParams() {
    const {
      location: { search }
    } = this.props
    return queryString.parse(search)
  }

  getPagination() {
    const queryParams = this.getQueryParams()
    return {
      activePage: +queryParams.active || 1,
      expiredPage: +queryParams.expired || 1
    }
  }

  handleActivePageChange = (page: number) => {
    const { onPageChange } = this.props
    const { expiredPage } = this.getPagination()
    onPageChange(page, expiredPage)
  }

  handleExpiredPageChange = (page: number) => {
    const { onPageChange } = this.props
    const { activePage } = this.getPagination()
    onPageChange(activePage, page)
  }

  render() {
    const {
      activePolls,
      expiredPolls,
      isLoading,
      totalActive,
      totalExpired
    } = this.props
    const { activePage, expiredPage } = this.getPagination()
    return (
      <div className="PollsPage">
        {isLoading && activePolls.length === 0 && expiredPolls.length == 0 ? (
          <Loader active size="massive" />
        ) : (
          <>
            <PollsTable
              title={t('polls_page.active_polls')}
              polls={activePolls}
              currentPage={activePage}
              rowsPerPage={this.activeRows}
              totalRows={totalActive}
              onPageChange={this.handleActivePageChange}
            />
            <PollsTable
              title={t('polls_page.expired_polls')}
              polls={expiredPolls}
              currentPage={expiredPage}
              rowsPerPage={this.expiredRows}
              totalRows={totalExpired}
              onPageChange={this.handleExpiredPageChange}
            />
          </>
        )}
      </div>
    )
  }
}
