import * as React from 'react'
import { Link } from 'react-router-dom'
import { t } from 'modules/translation/utils'
import { locations } from 'locations'

export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div className="HomePage">
        <h1>Home Page</h1>

        <div>
          <Link to={locations.pollDetail(1)}>{t('global.poll')} 1</Link>
        </div>
      </div>
    )
  }
}
