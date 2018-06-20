import * as React from 'react'
import { Link } from 'react-router-dom'
import * as uuidv4 from 'uuid/v4'
import { locations } from 'locations'
import { VotePageProps, VotePageState } from 'components/VotePage/types'
import { NewVote } from 'modules/vote/types'
import { t } from 'modules/translation/utils'
import { getVoteOptionValue } from 'modules/option/utils'

export default class VotePage extends React.PureComponent<
  VotePageProps,
  VotePageState
> {
  constructor(props: VotePageProps) {
    super(props)

    this.state = { selectedOptionId: '' }
  }

  componentWillMount() {
    const {
      poll,
      isConnected,
      onNavigate,
      onFetchPollVotes,
      onFetchPollOptions,
      match
    } = this.props
    const pollId = match.params.id

    if (poll && isConnected) {
      onFetchPollOptions(pollId)
      onFetchPollVotes(pollId)
    } else {
      onNavigate(locations.pollDetail(pollId))
    }
  }

  selectOption = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ selectedOptionId: event.currentTarget.value })
  }

  createVote = (event: React.FormEvent<HTMLFormElement>) => {
    const { wallet, pollId, onCreateVote } = this.props
    const { selectedOptionId } = this.state

    const newVote: NewVote = {
      id: uuidv4(),
      address: wallet.address,
      poll_id: pollId,
      option_id: selectedOptionId
    }

    onCreateVote(newVote)
    event.preventDefault()
  }

  render() {
    const {
      pollId,
      wallet,
      options,
      votes,
      currentVote,
      isLoading
    } = this.props
    const { selectedOptionId } = this.state

    // TODO: Replace `.mana` for the poll token symbol

    return (
      <div className="VotePage">
        <h1>{t('vote_page.title')}</h1>
        <p>
          <Link to={locations.polls()}>List</Link>
        </p>

        {isLoading || !options || !votes ? (
          'Loading'
        ) : (
          <React.Fragment>
            <h2>Poll</h2>

            <form action="/votes" method="POST" onSubmit={this.createVote}>
              <h4>Options {options.length}</h4>
              <ul>
                {options.map((option, index) => (
                  <li key={option.id}>
                    <input
                      type="radio"
                      id={`option-${option.id}`}
                      name="vote-option"
                      value={option.id}
                      checked={option.id === selectedOptionId}
                      onChange={this.selectOption}
                    />
                    <label htmlFor={`option-${option.id}`}>
                      {option.value}
                    </label>
                  </li>
                ))}
              </ul>

              <h4>Votes {votes.length}</h4>
              <pre>
                {currentVote ? (
                  <React.Fragment>
                    Your vote: {getVoteOptionValue(options, currentVote)}
                  </React.Fragment>
                ) : null}
              </pre>
              {wallet.balances.mana ? (
                <pre>Voting with {wallet.balances.mana} MANA</pre>
              ) : null}

              <br />
              <div>
                <input
                  type="submit"
                  value="VOTE NOW"
                  disabled={selectedOptionId === '' || !wallet.balances.mana}
                />
                &nbsp;
                <Link to={locations.pollDetail(pollId)}>CANCEL</Link>
                {wallet.balances.mana ? null : (
                  <div>
                    <small>You don't have any MANA</small>
                  </div>
                )}
              </div>
            </form>
          </React.Fragment>
        )}
      </div>
    )
  }
}
