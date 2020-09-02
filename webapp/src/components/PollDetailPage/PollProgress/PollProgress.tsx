import * as React from 'react'
import './PollProgress.css'
import { Props } from './PollProgress.types'
import PollOption from './PollOption'

export default class PollProgress extends React.PureComponent<Props> {
  render() {
    const { results } = this.props

    return (
      <div className="PollProgress">
        {results.map((result, index) => (
          <PollOption
            key={index}
            {...result}
            position={index}
            total={results.length}
          />
        ))}
      </div>
    )
  }
}
