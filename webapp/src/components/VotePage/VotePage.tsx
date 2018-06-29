import * as React from 'react'
import { Link } from 'react-router-dom'
import { Loader, Header, Radio, Mana, Button, Stats } from 'decentraland-ui'
import * as uuidv4 from 'uuid/v4'
import { locations } from 'locations'
import { VotePageProps, VotePageState } from 'components/VotePage/types'
import { NewVote } from 'modules/vote/types'
import { formatNumber } from 'lib/utils'
import { getBalanceInPoll } from 'modules/wallet/utils'
import { t } from 'modules/translation/utils'

import './VotePage.css'

export default class VotePage extends React.PureComponent<
  VotePageProps,
  VotePageState
> {
  constructor(props: VotePageProps) {
    super(props)

    this.state = { selectedOptionId: '' }
  }

  componentWillMount() {
    const { isConnected, onNavigate, onFetchPoll, match } = this.props
    const pollId = match.params.id

    if (isConnected) {
      onFetchPoll(pollId)
    } else {
      onNavigate(locations.pollDetail(pollId))
    }
  }

  selectOption = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({ selectedOptionId: event.currentTarget.value })
  }

  createVote = (event: React.FormEvent<HTMLFormElement>) => {
    const { wallet, pollId, poll, onCreateVote } = this.props
    const { selectedOptionId } = this.state

    if (poll) {
      const newVote: NewVote = {
        id: uuidv4(),
        account_address: wallet.address,
        account_balance: getBalanceInPoll(wallet, poll),
        poll_id: pollId,
        option_id: selectedOptionId,
        timestamp: Date.now()
      }

      onCreateVote(newVote)
    }

    event.preventDefault()
  }

  getCurrentSelection() {
    const { currentVote } = this.props
    let { selectedOptionId } = this.state

    return currentVote && selectedOptionId === ''
      ? currentVote.option_id
      : selectedOptionId
  }

  render() {
    const { pollId, poll, wallet, isLoading } = this.props

    if (isLoading || !poll) {
      return (
        <div className="VotePage">
          <Loader active size="massive" />
        </div>
      )
    }

    const { selectedOptionId } = this.state
    const currentSelection = this.getCurrentSelection()
    const balance = getBalanceInPoll(wallet, poll)

    return (
      <div className="VotePage">
        <Header size="large">{poll.title}</Header>
        {poll.description ? <Header sub>{poll.description}</Header> : null}
        <form
          action="/votes"
          method="POST"
          onSubmit={this.createVote}
          className="options"
        >
          {poll.options.map(option => (
            <Radio
              id={`option-${option.id}`}
              key={option.id}
              name="vote-option"
              label={option.value}
              value={option.id}
              checked={currentSelection === option.id}
              onChange={this.selectOption}
            />
          ))}

          {balance ? (
            <Stats title={t('vote_page.voting_with')} className="voting-with">
              <Mana>{formatNumber(balance)}</Mana>
            </Stats>
          ) : null}

          <div className="vote">
            <Button
              primary
              type="submit"
              disabled={selectedOptionId === '' || !balance}
            >
              {t('vote_page.vote')}
            </Button>
            &nbsp;
            <Link className="ui button" to={locations.pollDetail(pollId)}>
              {t('vote_page.cancel')}
            </Link>
            {balance ? null : (
              <div className="no-balance">
                <small>
                  {t('vote_page.no_balance', {
                    symbol: poll.token.symbol
                  })}
                </small>
              </div>
            )}
          </div>
        </form>
      </div>
    )
  }
}
