import * as React from 'react'
import { isFinished } from 'modules/poll/utils'
import { Link } from 'react-router-dom'
import { locations } from 'locations'
import { Button } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { CastYourVoteProps } from 'components/PollDetailPage/CastYourVote/types'
import './CastYourVote.css'

export default class CastYourVote extends React.PureComponent<
  CastYourVoteProps
> {
  render() {
    const { poll, isConnected } = this.props
    return isFinished(poll) ? null : (
      <div className="CastYourVote">
        {isConnected ? (
          <Link to={locations.voteDetail(poll.id)}>
            <Button primary>{t('poll_detail_page.cast_vote')}</Button>
          </Link>
        ) : (
          <Button primary disabled>
            {t('poll_detail_page.cast_vote')}
          </Button>
        )}
      </div>
    )
  }
}
