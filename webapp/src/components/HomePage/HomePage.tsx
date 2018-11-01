import * as React from 'react'
import { Loader } from 'decentraland-ui'
import { Props } from './HomePage.types'
import { t } from '@dapps/modules/translation/utils'
import './HomePage.css'
import { locations } from 'locations'
import PollCards from './PollCards'
import { PollWithAssociations } from 'modules/poll/types'

const CARDS_AMOUNT = 6

export default class HomePage extends React.PureComponent<Props> {
  componentWillMount() {
    this.fetchDecentralandPolls()
    this.fetchDistrictPolls()
  }

  fetchDecentralandPolls() {
    const { onFetchPolls } = this.props
    onFetchPolls({
      limit: CARDS_AMOUNT,
      type: 'decentraland'
    })
  }

  fetchDistrictPolls() {
    const { onFetchPolls } = this.props
    onFetchPolls({
      limit: CARDS_AMOUNT,
      type: 'district'
    })
  }

  handleClick = (poll: PollWithAssociations) => {
    const { onNavigate } = this.props
    onNavigate(locations.pollDetail(poll.id))
  }

  redirectToDecentralandPolls = () => {
    const { onNavigate } = this.props
    onNavigate(locations.pollsTable(1, 'decentraland', 'all'))
  }

  redirectToDistrictPolls = () => {
    const { onNavigate } = this.props
    onNavigate(locations.pollsTable(1, 'district', 'all'))
  }

  render() {
    const { decentralandPolls, districtPolls, isLoading } = this.props
    return (
      <div className="HomePage">
        {isLoading &&
        decentralandPolls.length === 0 &&
        districtPolls.length === 0 ? (
          <Loader active size="massive" />
        ) : (
          <>
            <PollCards
              polls={decentralandPolls.filter(
                (_, index) => index < CARDS_AMOUNT
              )}
              title={t('polls_table.decentraland_polls')}
              meta={t('global.weight')}
              onClick={this.handleClick}
              onViewMore={this.redirectToDecentralandPolls}
            />
            <PollCards
              polls={districtPolls.filter((_, index) => index < CARDS_AMOUNT)}
              title={t('polls_table.district_polls')}
              meta={t('global.weight')}
              onClick={this.handleClick}
              onViewMore={this.redirectToDistrictPolls}
            />
          </>
        )}
      </div>
    )
  }
}
