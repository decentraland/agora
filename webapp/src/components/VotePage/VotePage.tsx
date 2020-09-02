import * as React from 'react'
import { Link } from 'react-router-dom'
import {
  Loader,
  Header,
  Radio,
  Button,
  Stats,
  CheckboxProps
} from 'decentraland-ui'
import * as uuidv4 from 'uuid/v4'
import { locations } from 'locations'
import * as ReactMarkdown from 'react-markdown'
import { t } from '@dapps/modules/translation/utils'
import { NewVote } from 'modules/vote/types'
import { getBalanceInPoll } from 'modules/wallet/utils'
import { isDistrictToken } from 'modules/token/district_token/utils'
import Token from 'components/Token'
import { Props, State } from './VotePage.types'
import VoteLabel from './VoteLabel'
import './VotePage.css'

export default class VotePage extends React.PureComponent<Props, State> {
  constructor(props: Props) {
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

  selectOption = (
    _: React.FormEvent<HTMLInputElement>,
    data: CheckboxProps
  ) => {
    this.setState({ selectedOptionId: data.value as string })
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

    const noContributionsText = t('vote_page.no_contributions')
    const noBalanceText = t('vote_page.no_balance', {
      symbol: poll.token.symbol
    })

    return (
      <div className="VotePage">
        <Header size="large">{poll.title}</Header>
        {poll.description ? (
          <div className="description-wrapper">
            <Header sub>{t('global.description')}</Header>
            <ReactMarkdown className="description" source={poll.description} />
          </div>
        ) : null}
        <form
          action="/votes"
          method="POST"
          onSubmit={this.createVote}
          className={'options' + (poll.options.length > 5 ? ' many' : '')}
        >
          {poll.options.map(option => (
            <Radio
              id={`option-${option.id}`}
              key={option.id}
              name="vote-option"
              label={VoteLabel(option.value)}
              value={option.id}
              checked={currentSelection === option.id}
              onChange={this.selectOption}
            />
          ))}

          {balance ? (
            <Stats
              title={
                isDistrictToken(poll.token)
                  ? t('global.your_contributions')
                  : t('vote_page.voting_width')
              }
              className="voting-with"
            >
              <Token token={poll.token} amount={balance} />
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
          </div>
          {balance ? null : (
            <div className="no-balance">
              <small>
                {isDistrictToken(poll.token)
                  ? noContributionsText
                  : noBalanceText}
              </small>
            </div>
          )}
        </form>
      </div>
    )
  }
}
