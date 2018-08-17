import * as React from 'react'
import { Props } from './PollOptions.types'
import { isDistrictToken } from 'modules/token/district_token/utils'
import { t } from '@dapps/modules/translation/utils'

export default class PollOption extends React.PureComponent<Props> {
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
