import * as React from 'react'
import { Link } from 'react-router-dom'
import * as uuidv4 from 'uuid/v4'
import { locations } from 'locations'
import { VotePageProps, VotePageState } from 'components/VotePage/types'
import { NewVote } from 'modules/vote/types'
import { Loader, Header, Radio, Mana, Button } from 'decentraland-ui'
import './VotePage.css'
import { formatNumber } from 'lib/utils'
import { t } from 'modules/translation/utils'

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
    const { wallet, pollId, onCreateVote } = this.props
    const { selectedOptionId } = this.state

    const newVote: NewVote = {
      id: uuidv4(),
      account_address: wallet.address,
      account_balance: wallet.balances.mana, // TODO: Use token
      poll_id: pollId,
      option_id: selectedOptionId
    }

    onCreateVote(newVote)
    event.preventDefault()
  }

  getSelectedOptionId() {
    const { currentVote } = this.props
    let { selectedOptionId } = this.state

    return currentVote && selectedOptionId === ''
      ? currentVote.option_id
      : selectedOptionId
  }

  render() {
    const { pollId, poll, wallet, options, currentVote, isLoading } = this.props
    const selectedOptionId = this.getSelectedOptionId()

    // TODO: Replace `.mana` for the poll token symbol

    return (
      <div className="VotePage">
        {isLoading || !options || !currentVote || !poll ? (
          <Loader active size="massive" />
        ) : (
          <React.Fragment>
            <Header className="title" size="large">
              {poll.title}
            </Header>
            {poll.description ? <Header sub>{poll.description}</Header> : null}
            <form
              action="/votes"
              method="POST"
              onSubmit={this.createVote}
              className="options"
            >
              {options.map(option => (
                <Radio
                  id={`option-${option.id}`}
                  key={option.id}
                  name="vote-option"
                  label={option.value}
                  value={option.id}
                  checked={selectedOptionId === option.id}
                  onChange={this.selectOption}
                />
              ))}

              {wallet.balances.mana ? (
                <div className="voting-with">
                  <Header sub>{t('vote_page.voting_with')}</Header>
                  <Mana size="large">{formatNumber(wallet.balances.mana)}</Mana>
                </div>
              ) : null}

              <div className="vote">
                <Button
                  primary
                  type="submit"
                  disabled={selectedOptionId === '' || !wallet.balances.mana}
                >
                  {t('vote_page.vote')}
                </Button>
                &nbsp;
                <Link to={locations.pollDetail(pollId)}>
                  <Button>{t('vote_page.cancel')}</Button>
                </Link>
                {wallet.balances.mana ? null : (
                  <div className="no-mana">
                    <small>{t('vote_page.no_mana')}</small>
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
