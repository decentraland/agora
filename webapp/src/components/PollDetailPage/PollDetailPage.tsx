import * as React from 'react'

import { locations } from 'locations'
import * as ReactMarkdown from 'react-markdown'
import {
  Loader,
  Header,
  Stats,
  Table,
  Blockie,
  Address,
  Responsive,
  Pagination
} from 'decentraland-ui'
import {
  distanceInWordsToNow,
  formatDate,
  formatDateTime
} from '@dapps/lib/utils'
import { t, T } from '@dapps/modules/translation/utils'
import { getVoteOptionValue } from 'modules/option/utils'
import { isFinished } from 'modules/poll/utils'
import { getBalanceInPoll } from 'modules/wallet/utils'
import { isDistrictToken } from 'modules/token/district_token/utils'
import Token from 'components/Token'
import PollProgress from './PollProgress'
import OptionBar from './OptionBar'
import OptionOrb from './OptionOrb'
import YourVote from './YourVote'
import CastYourVote from './CastYourVote'
import { Props, State, Tally, Result } from './PollDetailPage.types'
import './PollDetailPage.css'
import { Link } from 'react-router-dom'

const VOTES_PER_PAGE = 20

export default class PollDetailPage extends React.PureComponent<Props, State> {
  static defaultProps = {
    poll: null
  }
  navigatingAway: boolean

  constructor(props: Props) {
    super(props)
    this.navigatingAway = false
    this.state = {
      activePage: 1
    }
  }

  componentWillMount() {
    const { onFetchPoll, pollId } = this.props
    onFetchPoll(pollId)
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.hasError && !this.navigatingAway) {
      this.props.onNavigate(locations.root())
      this.navigatingAway = true
    }
  }

  getCurrentResults(): Result[] {
    const { poll } = this.props
    if (!poll) return []

    const tally: Tally = poll.options.reduce(
      (tally, option) => ({
        ...tally,
        [option.id]: {
          votes: 0,
          option,
          winner: false,
          percentage: 0,
          token: poll.token
        }
      }),
      {}
    )

    for (const vote of poll.votes) {
      tally[vote.option_id].votes += vote.account_balance
    }

    let currentResults: Result[] = []
    let maxVotes = -1
    let totalVotes = 0

    for (const optionId in tally) {
      const result = tally[optionId]
      currentResults.push(result)
      maxVotes = maxVotes > result.votes ? maxVotes : result.votes
      totalVotes += result.votes
    }

    const winners = currentResults.filter(result => result.votes === maxVotes)
    winners.forEach(option => {
      option.winner = true
    })

    return currentResults
      .map(result => ({
        ...result,
        percentage: +(totalVotes > 0
          ? (result.votes / totalVotes) * 100
          : 0
        ).toFixed(1)
      }))
      .sort((a, b) => (a.option.value > b.option.value ? 1 : -1))
  }

  handlePageChange = (
    _: any,
    { activePage }: { activePage?: number | string }
  ) => {
    if (activePage) {
      this.setState({ activePage: Number(activePage) })
    }
  }

  render() {
    const { wallet, poll, currentVote, isConnected, isLoading } = this.props
    const currentResults = this.getCurrentResults()
    const noVotes = poll && poll.votes.length === 0
    const totalPages = poll ? Math.ceil(poll.votes.length / VOTES_PER_PAGE) : 0
    const pageOffset = (this.state.activePage - 1) * VOTES_PER_PAGE

    return (
      <div className="PollDetailPage">
        {isLoading || !poll ? (
          <Loader active size="massive" />
        ) : (
          <>
            <Header size="large">{poll.title}</Header>
            {poll.description ? (
              <div className="description-wrapper">
                <Header sub className="description-header">
                  {t('global.description')}
                </Header>
                <ReactMarkdown
                  className="description"
                  source={poll.description}
                />
              </div>
            ) : null}
            <div className="stats">
              {isDistrictToken(poll.token) ? (
                <Stats
                  title={t('global.your_contributions')}
                  className="voting-with"
                >
                  <Header>{getBalanceInPoll(wallet, poll) || 0}</Header>
                </Stats>
              ) : (
                <Stats title={t('poll_detail_page.stats.token')}>
                  <Token token={poll.token} />
                </Stats>
              )}
              <Stats title={t('global.weight')}>
                <Token token={poll.token} amount={poll.balance} />
              </Stats>
              <Stats title={t('global.votes')}>
                <Header>{poll.votes.length}</Header>
              </Stats>
              {isFinished(poll) ? (
                <Stats title={t('poll_detail_page.stats.finished')}>
                  <Header>{formatDate(poll.closes_at)}</Header>
                </Stats>
              ) : (
                <Stats title={t('poll_detail_page.stats.time_left')}>
                  <Header>{distanceInWordsToNow(poll.closes_at, false)}</Header>
                </Stats>
              )}
            </div>

            <Responsive
              minWidth={(Responsive.onlyTablet.minWidth as number) + 1}
            >
              <>
                <div className="row main">
                  <div className="progress">
                    <PollProgress results={currentResults} />
                  </div>

                  <CastYourVote poll={poll} isConnected={isConnected} />
                </div>

                <div className="row sub">
                  <div className="options">
                    {currentResults.map((result, index) => (
                      <OptionOrb position={index} key={result.option.id}>
                        {result.option.value}
                      </OptionOrb>
                    ))}
                  </div>
                  {isConnected ? (
                    <YourVote vote={currentVote} poll={poll} />
                  ) : (
                    <p className="sign-in-message">
                      <T
                        id="poll_detail_page.sign_in_message"
                        values={{
                          sign_in_link: (
                            <Link to={locations.signIn()}>
                              {t('poll_detail_page.sign_in_link')}
                            </Link>
                          )
                        }}
                      />
                    </p>
                  )}
                </div>
              </>
            </Responsive>

            <Responsive maxWidth={Responsive.onlyTablet.minWidth}>
              <div className="results">
                {currentResults.map((result, index) => (
                  <OptionBar
                    position={index}
                    percentage={result.percentage}
                    key={result.option.id}
                  >
                    {result.option.value}
                  </OptionBar>
                ))}
              </div>
              <CastYourVote poll={poll} isConnected={isConnected} />
              <YourVote vote={currentVote} poll={poll} />
            </Responsive>

            {noVotes ? null : (
              <div className="votes">
                <Header sub>{t('poll_detail_page.votes')}</Header>
                <Table basic="very">
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        {t('poll_detail_page.when')}
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        {t('poll_detail_page.address')}
                      </Table.HeaderCell>
                      <Table.HeaderCell>{t('global.weight')}</Table.HeaderCell>
                      <Table.HeaderCell>
                        {t('poll_detail_page.vote')}
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {poll.votes
                      .slice(pageOffset, pageOffset + VOTES_PER_PAGE)
                      .map((vote, index) => (
                        <Table.Row key={vote.id + index}>
                          <Table.Cell title={formatDateTime(vote.timestamp)}>
                            <span className="mobile-header">
                              {t('poll_detail_page.when')}
                              :&nbsp;
                            </span>
                            {formatDate(vote.timestamp)}
                          </Table.Cell>
                          <Table.Cell>
                            <span className="mobile-header">
                              {t('poll_detail_page.address')}
                              :&nbsp;
                            </span>
                            <Blockie scale={3} seed={vote.account_address}>
                              &nbsp;
                              <Address value={vote.account_address} />
                            </Blockie>
                          </Table.Cell>
                          <Table.Cell>
                            <span className="mobile-header">
                              {t('global.weight')}
                              :&nbsp;
                            </span>
                            <Token
                              token={poll.token}
                              amount={vote.account_balance}
                              cell
                            />
                          </Table.Cell>
                          <Table.Cell>
                            <span className="mobile-header">
                              {t('poll_detail_page.vote')}
                              :&nbsp;
                            </span>
                            {getVoteOptionValue(poll.options, vote)}
                          </Table.Cell>
                        </Table.Row>
                      ))}
                  </Table.Body>
                </Table>
                {totalPages > 1 ? (
                  <div className="votes-pagination">
                    <Pagination
                      activePage={this.state.activePage}
                      totalPages={totalPages}
                      firstItem={null}
                      lastItem={null}
                      nextItem={null}
                      prevItem={null}
                      onPageChange={this.handlePageChange}
                    />
                  </div>
                ) : null}
              </div>
            )}
          </>
        )}
      </div>
    )
  }
}
