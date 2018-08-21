import * as React from 'react'
import { formatNumber } from '@dapps/lib/utils'
import { Mana, Header, ManaProps } from 'decentraland-ui'
import { Props } from './Token.types'
import './Token.css'
import { isDistrictToken } from 'modules/token/district_token/utils'

export default class Token extends React.PureComponent<Props> {
  render() {
    const { token, amount, cell } = this.props
    const text =
      amount === undefined
        ? token.symbol
        : isDistrictToken(token) || token.symbol === 'MANA'
          ? formatNumber(amount)
          : `${formatNumber(amount)} ${token.symbol}`
    const className = cell ? 'Token cell' : 'Token'
    const manaProps = cell ? ({ size: 'small', text: true } as ManaProps) : {}
    return token.symbol === 'MANA' ? (
      <Mana className={className} {...manaProps}>
        {text}
      </Mana>
    ) : (
      <Header className={className}>{text}</Header>
    )
  }
}
