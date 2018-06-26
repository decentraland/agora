import * as React from 'react'
import './PollProgress.css'
import { OptionProps, PollProgressProps } from 'components/PollProgress/types'

class PollOption extends React.PureComponent<OptionProps> {
  render() {
    const { winner, percentage, option, votes, token } = this.props
    let classes = 'PollOption'
    if (winner) {
      classes += ' winner'
    }
    return (
      <div
        className={classes}
        style={{ width: `${percentage}%` }}
        data-balloon={`${votes.toLocaleString()} ${token ? token.symbol : ''}`}
        data-balloon-pos="up"
      >
        <div className="mask">
          <div className="bg" />
          <span className="text">
            {option.value}&nbsp;({percentage}%)
          </span>
        </div>
      </div>
    )
  }
}

export default class PollProgress extends React.PureComponent<
  PollProgressProps
> {
  render() {
    const { results, isDocked } = this.props
    let classes = 'PollProgress'
    if (isDocked) {
      classes += ' docked'
    }
    return (
      <div className={classes}>
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
