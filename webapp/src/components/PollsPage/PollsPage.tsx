import * as React from 'react'
import { Link } from 'react-router-dom'
import { Header, Loader, Table, Mana } from 'decentraland-ui'
import { locations } from 'locations'
import { PollsPageProps } from 'components/PollsPage/types'
import { t } from 'modules/translation/utils'
import { formatNumber } from 'lib/utils'
import './PollsPage.css'
import { isDCLPoll } from 'modules/poll/utils'
import { getBalanceInPoll } from 'modules/wallet/utils'

export default class PollsPage extends React.PureComponent<PollsPageProps> {
  componentWillMount() {
    this.props.onFetchPolls()
  }

  render() {
    const { polls, wallet, isLoading } = this.props

    const districtPolls = Object.values(polls).filter(poll => !isDCLPoll(poll))
    const dclPolls = Object.values(polls).filter(poll => isDCLPoll(poll))
    return (
      <div className="PollsPage">
        {isLoading ? (
          <Loader active size="massive" />
        ) : (
          <>
            {districtPolls.length > 0 ? (
              <>
                <Header size="large">
                  {t('polls_page.district_plan_acceptance')}
                </Header>
                <Table basic>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        {t('polls_page.table.title')}
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        {t('polls_page.table.contributions')}
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        {t('polls_page.table.total_voted')}
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        {t('polls_page.table.votes')}
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {districtPolls.map((poll, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>
                          <Link to={locations.pollDetail(poll.id)}>
                            {poll.title}
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          {getBalanceInPoll(wallet, poll) || 0}
                        </Table.Cell>
                        <Table.Cell>{formatNumber(poll.balance)}</Table.Cell>
                        <Table.Cell>{poll.votes.length}</Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </>
            ) : null}
            {dclPolls.length > 0 ? (
              <>
                <Header size="large">
                  {t('polls_page.decentraland_polls')}
                </Header>
                <Table basic>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        {t('polls_page.table.title')}
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        {t('polls_page.table.balance')}
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        {t('polls_page.table.votes')}
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {dclPolls.map(
                      (poll, index) =>
                        console.log(poll) || (
                          <Table.Row key={index}>
                            <Table.Cell>
                              <Link to={locations.pollDetail(poll.id)}>
                                {poll.title}
                              </Link>
                            </Table.Cell>
                            <Table.Cell>
                              {poll.token.symbol === 'MANA' ? (
                                <Mana size="small" black />
                              ) : (
                                <span className="symbol">
                                  {poll.token.symbol}
                                </span>
                              )}
                              {formatNumber(poll.balance)}
                            </Table.Cell>
                            <Table.Cell>{poll.votes.length}</Table.Cell>
                          </Table.Row>
                        )
                    )}
                  </Table.Body>
                </Table>
              </>
            ) : null}
          </>
        )}
      </div>
    )
  }
}
