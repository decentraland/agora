import * as React from 'react'
import { isMobile } from 'decentraland-dapps/dist/lib/utils'

import { isFinished } from 'modules/poll/utils'
import { Link } from 'react-router-dom'
import { locations } from 'locations'
import { Button } from 'decentraland-ui'
import { t } from '@dapps/modules/translation/utils'
import { Props } from './CastYourVote.types'
import './CastYourVote.css'

export default class CastYourVote extends React.PureComponent<Props> {
  render() {
    const { poll, isConnected } = this.props

    return isFinished(poll) && isMobile() ? null : (
      <div className="CastYourVote">
        {!isFinished(poll) && isConnected ? (
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
