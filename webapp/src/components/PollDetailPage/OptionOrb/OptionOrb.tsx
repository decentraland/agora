import * as React from 'react'
import './OptionOrb.css'
import { Props } from './OptionOrb.types'

export default class OptionOrb extends React.PureComponent<Props> {
  render() {
    const { children, position } = this.props
    let classes = `OptionOrb color-${position % 5}`
    return (
      <div className={classes}>
        <i className="orb" />
        <span className="label">{children}</span>
      </div>
    )
  }
}
