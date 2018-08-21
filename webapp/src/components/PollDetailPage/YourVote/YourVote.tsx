import * as React from 'react'
import { getVoteOptionValue } from 'modules/option/utils'
import { distanceInWordsToNow } from '@dapps/lib/utils'
import { t } from '@dapps/modules/translation/utils'
import { Props } from './YourVote.types'
import './YourVote.css'

export default class YourVote extends React.PureComponent<Props> {
  render() {
    const { vote, poll } = this.props
    return vote ? (
      <span className="YourVote">
        {t('poll_detail_page.you_voted', {
          option: getVoteOptionValue(poll.options, vote)
        })}
        .{' '}
        <span className="time-ago">
          {distanceInWordsToNow(vote.timestamp)}.
        </span>
      </span>
    ) : null
  }
}
