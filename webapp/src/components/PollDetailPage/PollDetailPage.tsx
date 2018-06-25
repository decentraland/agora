import * as React from 'react'
import { Link } from 'react-router-dom'
import { locations } from 'locations'
import { PollDetailPageProps, Tally } from 'components/PollDetailPage/types'
import { Option } from 'modules/option/types'
import { distanceInWordsToNow } from 'lib/utils'
import { getVoteOptionValue } from 'modules/option/utils'
import { isFinished } from 'modules/poll/utils'
import { t } from 'modules/translation/utils'

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
    const { onFetchPoll, match } = this.props
    onFetchPoll(match.params.id)
  }

  componentWillReceiveProps(nextProps: PollDetailPageProps) {
    if (nextProps.hasError && !this.navigatingAway) {
      this.props.onNavigate(locations.polls())
      this.navigatingAway = true
    }
  }

  getCurrentResults(): Option[] {
    const { poll } = this.props
    if (!poll || poll.votes.length === 0) return []

    const tally: Tally = poll.options.reduce(
      (tally, option) => ({ ...tally, [option.id]: { votes: 0, option } }),
      {}
    )

    for (const vote of poll.votes) {
      tally[vote.option_id].votes += vote.account_balance
    }

    let currentResults: Option[] = []
    let maxVotes = -1

    for (const optionId in tally) {
      const result = tally[optionId]

      if (result.votes === maxVotes) {
        currentResults.push(result.option)
      } else if (result.votes > maxVotes) {
        currentResults = [result.option]
        maxVotes = result.votes
      }
    }

    return currentResults
  }

  render() {
    const { poll, currentVote, isConnected, isLoading } = this.props
    const currentResults = this.getCurrentResults()

    return (
      <div className="PollDetailPage">
        <h1>{t('poll_detail_page.title')}</h1>
        <p>
          <Link to={locations.polls()}>List</Link>
        </p>

        {isLoading || !poll ? (
          'Loading'
        ) : (
          <React.Fragment>
            <h2>Poll</h2>

            <div>
              {poll.title}
              <br />
              {poll.description}
              <br />
              {poll.balance} MANA
              <br />
              {/* prettier-ignore */
              isFinished(poll)
                ? t('poll_detail_page.finished_at', {
                  date: new Date(poll.closes_at).toLocaleString()
                })
                : t('poll_detail_page.closes_at', {
                  time_in_words: distanceInWordsToNow(poll.closes_at)
                })}
            </div>

            <h4>Token</h4>
            {poll.token ? (
              <p>
                {poll.token.symbol}: {poll.token.address}
              </p>
            ) : null}

            <h4>Options {poll.options.length}</h4>
            <ul>
              {poll.options.map(option => (
                <li key={option.id}>{option.value}</li>
              ))}
            </ul>

            <h4>Votes {poll.votes.length}</h4>
            <ul>
              {poll.votes.map(vote => (
                <li key={vote.id}>
                  {vote.account_address}:{' '}
                  {getVoteOptionValue(poll.options, vote)} Balance:{' '}
                  {vote.account_balance}
                </li>
              ))}
            </ul>

            <h4>Your Vote</h4>
            <p>
              {currentVote
                ? getVoteOptionValue(poll.options, currentVote)
                : null}
            </p>

            <h4>Current Result</h4>
            <p>
              {currentResults.length > 0 ? (
                <React.Fragment>
                  {currentResults.length > 1
                    ? `${t('poll_detail_page.tie')} `
                    : null}
                  {currentResults.map(result => result.value).join(', ')}
                </React.Fragment>
              ) : null}
            </p>
            <br />

            {!isConnected || isFinished(poll) ? null : (
              <div>
                <Link to={locations.voteDetail(poll.id)}>
                  {t('poll_detail_page.vote')}
                </Link>
              </div>
            )}
          </React.Fragment>
        )}
      </div>
    )
  }
}
