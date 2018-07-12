import * as React from 'react'
import { formatNumber } from 'lib/utils'
import { Mana, Header } from 'decentraland-ui'
import { TokenProps } from './types'
import './Token.css'
import { isDistrictToken } from 'modules/token/district_token/utils'

export default class Token extends React.PureComponent<TokenProps> {
  render() {
    const { token, amount, cell } = this.props
    const text =
      amount == null
        ? token.symbol
        : isDistrictToken(token) || token.symbol === 'MANA'
          ? formatNumber(amount)
          : `${formatNumber(amount)} ${token.symbol}`
    const className = cell ? 'Token cell' : 'Token'
    const manaProps = cell ? ({ size: 'small', text: true } as any) : {}
    return token.symbol === 'MANA' ? (
      <Mana className={className} {...manaProps}>
        {text}
      </Mana>
    ) : (
      <Header className={className}>{text}</Header>
    )
  }
}
