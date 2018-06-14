import * as React from 'react'
import { Link } from 'react-router-dom'
import { locations } from 'locations'
import { PollDetailPageProps } from 'components/PollDetailPage/types'
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

  componentWillMount() {
    const { onFetchPoll, match } = this.props
    onFetchPoll(match.params.id)
  }

  getCurrentResult(): Option | null {
    const { poll } = this.props
    if (!poll) return null

    const tally: {
      optionId?: { votes: number; option: Option }
    } = poll.options.reduce(
      (tally, option) => ({ ...tally, [option.id]: { votes: 0, option } }),
      {}
    )

    for (const vote of poll.votes) {
      tally[vote.option_id].votes += 1
    }

    let currentResult: Option | null = null
    let maxVotes = 0

    for (const optionId in tally) {
      const result = tally[optionId]

      if (result.votes >= maxVotes) {
        currentResult = result.option
        maxVotes = result.votes
      }
    }

    return currentResult
  }

  render() {
    const { poll, isLoading } = this.props
    const currentResult = this.getCurrentResult()

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
                  {vote.address}: {getVoteOptionValue(poll.options, vote)}
                </li>
              ))}
            </ul>

            <h4>Current Result</h4>
            <p>{currentResult ? currentResult.value : null}</p>
            <br />

            <div>
              <Link to={locations.voteDetail(poll.id)}>VOTE</Link>
            </div>
          </React.Fragment>
        )}
      </div>
    )
  }
}
