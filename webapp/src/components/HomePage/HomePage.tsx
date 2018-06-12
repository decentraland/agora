import * as React from 'react'
import PollsPage from 'components/PollsPage'

export default class HomePage extends React.PureComponent {
  render() {
    return (
      <div className="HomePage">
        <PollsPage />
      </div>
    )
  }
}
