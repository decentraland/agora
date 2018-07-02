import * as React from 'react'
import { Link } from 'react-router-dom'
import { Header, Loader, Table, Mana } from 'decentraland-ui'
import { locations } from 'locations'
import { PollsPageProps } from 'components/PollsPage/types'
import { t } from 'modules/translation/utils'
import { formatNumber } from 'lib/utils'
import './PollsPage.css'
import { isDCLPoll } from 'modules/poll/utils'

export default class PollsPage extends React.PureComponent<PollsPageProps> {
  componentWillMount() {
    this.props.onFetchPolls()
  }

  render() {
    const { polls, isLoading } = this.props

    return (
      <div className="PollsPage">
        {isLoading ? (
          <Loader active size="massive" />
        ) : (
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
                    {t('polls_page.table.total_voted')}
                  </Table.HeaderCell>
                  <Table.HeaderCell>
                    {t('polls_page.table.votes')}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {Object.values(polls)
                  .filter(poll => !isDCLPoll(poll))
                  .map((poll, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        <Link to={locations.pollDetail(poll.id)}>
                          {poll.title}
                        </Link>
                      </Table.Cell>
                      <Table.Cell>{formatNumber(poll.balance)}</Table.Cell>
                      <Table.Cell>{poll.votes.length}</Table.Cell>
                    </Table.Row>
                  ))}
              </Table.Body>
            </Table>
            <Header size="large">{t('polls_page.decentraland_polls')}</Header>
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
                {Object.values(polls)
                  .filter(poll => isDCLPoll(poll))
                  .map(
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
        )}
      </div>
    )
  }
}
