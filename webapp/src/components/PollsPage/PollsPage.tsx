import * as React from 'react'
import { Link } from 'react-router-dom'
import { Header, Loader, Table } from 'decentraland-ui'
import { locations } from 'locations'
import { PollsPageProps } from 'components/PollsPage/types'
import { PollWithAssociations } from 'modules/poll/types'
import { Wallet } from 'modules/wallet/types'
import { t } from 'modules/translation/utils'
import { formatNumber } from 'lib/utils'
import { isDistrictToken } from 'modules/token/district_token/utils'
import { getBalanceInPoll } from 'modules/wallet/utils'
import './PollsPage.css'
import Token from 'components/Token'

const sortByContributions = (wallet: Wallet) => (
  pollA: PollWithAssociations,
  pollB: PollWithAssociations
) => {
  const contribA = getBalanceInPoll(wallet, pollA) || 0
  const contribB = getBalanceInPoll(wallet, pollB) || 0
  if (contribA > contribB) {
    return -1
  } else if (contribB > contribA) {
    return 1
  }
  return pollA.title > pollB.title ? 1 : -1
}

export default class PollsPage extends React.PureComponent<PollsPageProps> {
  componentWillMount() {
    this.props.onFetchPolls()
  }

  render() {
    const { polls, wallet, isLoading } = this.props

    const districtPolls = Object.values(polls)
      .filter(poll => isDistrictToken(poll.token))
      .sort(sortByContributions(wallet))
    const dclPolls = Object.values(polls).filter(
      poll => !isDistrictToken(poll.token)
    )

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
                        {t('global.your_contributions')}
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
                    {dclPolls.map((poll, index) => (
                      <Table.Row key={index}>
                        <Table.Cell>
                          <Link to={locations.pollDetail(poll.id)}>
                            {poll.title}
                          </Link>
                        </Table.Cell>
                        <Table.Cell>
                          <Token
                            token={poll.token}
                            amount={poll.balance}
                            cell
                          />
                        </Table.Cell>
                        <Table.Cell>{poll.votes.length}</Table.Cell>
                      </Table.Row>
                    ))}
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
