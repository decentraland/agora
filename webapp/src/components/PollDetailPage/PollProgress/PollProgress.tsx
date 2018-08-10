import * as React from 'react'
import './PollProgress.css'
import { isDistrictToken } from 'modules/token/district_token/utils'
import { t } from '@dapps/modules/translation/utils'
import { OptionProps, PollProgressProps } from './types'

class PollOption extends React.PureComponent<OptionProps> {
  render() {
    const { winner, percentage, option, votes, token, position } = this.props
    let classes = `PollOption color-${position % 5}`
    if (winner) {
      classes += ' winner'
    }

    const hasSymbol = token && !isDistrictToken(token)

    const symbolBallon = {
      'data-balloon': `${votes.toLocaleString()} ${token ? token.symbol : ''}`,
      'data-balloon-pos': 'up'
    }

    const nonSymbolBalloon = {
      'data-balloon': `${votes.toLocaleString()} ${t(
        'global.contributions'
      ).toLocaleLowerCase()}`,
      'data-balloon-pos': 'up'
    }

    const balloon = hasSymbol ? symbolBallon : nonSymbolBalloon

    return (
      <div
        className={classes}
        style={winner ? undefined : { width: `${percentage}%` }}
        {...balloon}
      >
        <div className="mask">
          <div className="bg" />
          <span className="text">
            {option.value}
            &nbsp;(
            {percentage}
            %)
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
    const { results } = this.props
    let classes = 'PollProgress'
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
