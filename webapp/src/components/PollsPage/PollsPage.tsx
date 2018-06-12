import * as React from 'react'
import { Link } from 'react-router-dom'
import { locations } from 'locations'
import { PollsPageProps } from 'components/PollsPage/types'
import { t } from 'modules/translation/utils'

export default class PollsPage extends React.PureComponent<PollsPageProps> {
  componentWillMount() {
    this.props.onFetchPolls()
  }

  render() {
    const { polls, isLoading } = this.props

    return (
      <div className="PollsPage">
        <h1>{t('polls_page.title')}</h1>

        {isLoading ? (
          'Loading'
        ) : (
          <ul>
            {Object.values(polls).map(poll => (
              <li key={poll.id}>
                <Link to={locations.pollDetail(poll.id)}>
                  {t('global.poll')} {poll.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}
