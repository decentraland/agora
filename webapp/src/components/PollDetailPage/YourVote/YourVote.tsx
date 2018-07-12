import * as React from 'react'
import { YourVoteProps } from 'components/PollDetailPage/YourVote/types'
import { getVoteOptionValue } from 'modules/option/utils'
import { distanceInWordsToNow } from 'lib/utils'
import { t } from 'modules/translation/utils'
import './YourVote.css'

export default class YourVote extends React.PureComponent<YourVoteProps> {
  render() {
    const { vote, poll } = this.props
    return vote ? (
      <span className="YourVote">
        {t('poll_detail_page.you_voted', {
          option: getVoteOptionValue(poll.options, vote)
        })}.{' '}
        <span className="time-ago">
          {distanceInWordsToNow(vote.timestamp)}.
        </span>
      </span>
    ) : null
  }
}
