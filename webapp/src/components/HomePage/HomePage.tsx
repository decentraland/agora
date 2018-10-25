import * as React from 'react'
import { Loader } from 'decentraland-ui'
import { Props } from './HomePage.types'
import { t } from '@dapps/modules/translation/utils'
import './HomePage.css'
import { locations } from 'locations'
import PollCards from './PollCards'

const CARDS = 6

export default class HomePage extends React.PureComponent<Props> {
  componentWillMount() {
    this.fetchDecentralandPolls()
    this.fetchDistrictPolls()
  }

  fetchDecentralandPolls() {
    const { onFetchPolls } = this.props
    onFetchPolls({
      limit: CARDS,
      type: 'decentraland'
    })
  }

  fetchDistrictPolls() {
    const { onFetchPolls } = this.props
    onFetchPolls({
      limit: CARDS,
      type: 'district'
    })
  }

  render() {
    const {
      decentralandPolls,
      districtPolls,
      isLoading,
      onNavigate
    } = this.props
    return (
      <div className="HomePage">
        {isLoading &&
        decentralandPolls.length === 0 &&
        districtPolls.length === 0 ? (
          <Loader active size="massive" />
        ) : (
          <>
            <PollCards
              polls={decentralandPolls.filter((_, index) => index < CARDS)}
              title={t('homepage.decentraland_polls')}
              meta={t('homepage.cards.weight')}
              onClick={poll => onNavigate(locations.pollDetail(poll.id))}
              onViewMore={() =>
                onNavigate(locations.pollsTable(1, 'decentraland', 'all'))
              }
            />
            <PollCards
              polls={districtPolls.filter((_, index) => index < CARDS)}
              title={t('homepage.district_polls')}
              meta={t('homepage.cards.votes')}
              onClick={poll => onNavigate(locations.pollDetail(poll.id))}
              onViewMore={() =>
                onNavigate(locations.pollsTable(1, 'district', 'all'))
              }
            />
          </>
        )}
      </div>
    )
  }
}
