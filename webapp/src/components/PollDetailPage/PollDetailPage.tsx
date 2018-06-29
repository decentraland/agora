import * as React from 'react'
import { Link } from 'react-router-dom'
import { locations } from 'locations'
import {
  PollDetailPageProps,
  Tally,
  Result
} from 'components/PollDetailPage/types'
import { distanceInWordsToNow, formatDate, formatNumber } from 'lib/utils'
import { getVoteOptionValue } from 'modules/option/utils'
import { isFinished } from 'modules/poll/utils'
import { t } from 'modules/translation/utils'
import {
  Button,
  Loader,
  Header,
  Stats,
  Mana,
  Table,
  Blockie,
  Address
} from 'decentraland-ui'
import './PollDetailPage.css'
import PollProgress from 'components/PollProgress'

export default class PollDetailPage extends React.PureComponent<
  PollDetailPageProps
> {
  static defaultProps = {
    poll: null
  }
  navigatingAway: boolean

  constructor(props: PollDetailPageProps) {
    super(props)
    this.navigatingAway = false
  }

  componentWillMount() {
    const { onFetchPoll, pollId } = this.props
    onFetchPoll(pollId)
  }

  componentWillReceiveProps(nextProps: PollDetailPageProps) {
    if (nextProps.hasError && !this.navigatingAway) {
      this.props.onNavigate(locations.polls())
      this.navigatingAway = true
    }
  }

  getCurrentResults(): Result[] {
    const { poll } = this.props
    if (!poll || poll.votes.length === 0) return []

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
    if (winners.length === 1) {
      winners[0].winner = true
    }

    return currentResults
      .map(result => ({
        ...result,
        percentage: +(result.votes / totalVotes * 100).toFixed(1)
      }))
      .sort((a, b) => (a.votes > b.votes ? -1 : 1))
  }

  render() {
    const { poll, currentVote, isConnected, isLoading } = this.props
    const currentResults = this.getCurrentResults()
    const noVotes = poll && poll.votes.length === 0
    return (
      <div className="PollDetailPage">
        {isLoading || !poll ? (
          <Loader active size="massive" />
        ) : (
          <React.Fragment>
            <Header size="large">{poll.title}</Header>
            {poll.description ? (
              <Header sub className="description">
                {poll.description}
              </Header>
            ) : null}
            <div className="stats">
              <Stats title={t('poll_detail_page.stats.token')}>
                {poll.token.symbol === 'MANA' ? (
                  <Mana>{poll.token.symbol}</Mana>
                ) : (
                  <Header>{poll.token.symbol}</Header>
                )}
              </Stats>
              <Stats title={t('poll_detail_page.stats.total_voted')}>
                {poll.token.symbol === 'MANA' ? (
                  <Mana>{formatNumber(poll.balance)}</Mana>
                ) : (
                  <Header>{formatNumber(poll.balance)}</Header>
                )}
              </Stats>
              <Stats title={t('poll_detail_page.stats.total_votes')}>
                <Header>{poll.votes.length}</Header>
              </Stats>
              <Stats title={t('poll_detail_page.stats.time_left')}>
                <Header>{distanceInWordsToNow(poll.closes_at, false)}</Header>
              </Stats>
            </div>

            <div className="vote">
              {!isConnected || isFinished(poll) ? null : (
                <Link to={locations.voteDetail(poll.id)}>
                  <Button primary>{t('poll_detail_page.cast_vote')}</Button>
                </Link>
              )}

              {currentVote ? (
                <span className="your-vote">
                  {t('poll_detail_page.you_voted', {
                    option: getVoteOptionValue(poll.options, currentVote)
                  })},{' '}
                  <span className="time-ago">
                    {distanceInWordsToNow(currentVote.timestamp)}.
                  </span>
                </span>
              ) : null}
            </div>

            <div className="progress">
              <PollProgress
                results={currentResults}
                isDocked={!isFinished(poll)}
              />
            </div>

            {noVotes ? null : (
              <div className="votes">
                <Header>{t('poll_detail_page.votes')}</Header>
                <Table basic>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>
                        {t('poll_detail_page.when')}
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        {t('poll_detail_page.address')}
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        {t('poll_detail_page.amount')}
                      </Table.HeaderCell>
                      <Table.HeaderCell>
                        {t('poll_detail_page.vote')}
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {poll.votes.map(vote => (
                      <Table.Row key={vote.id}>
                        <Table.Cell>{formatDate(vote.timestamp)}</Table.Cell>
                        <Table.Cell>
                          <Blockie scale={3} seed={vote.account_address}>
                            &nbsp;<Address value={vote.account_address} />
                          </Blockie>
                        </Table.Cell>
                        <Table.Cell>
                          <Mana size="small" black />
                          {formatNumber(vote.account_balance)}
                        </Table.Cell>
                        <Table.Cell>
                          {getVoteOptionValue(poll.options, vote)}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    )
  }
}
