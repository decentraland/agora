import * as React from 'react'

import { Hero as HeroComponent, Parallax } from 'decentraland-ui'
import { t } from '@dapps/modules/translation/utils'

import './Hero.css'

export default class Hero extends React.PureComponent {
  render() {
    return (
      <HeroComponent
        title={t('homepage.title')}
        subtitle={t('homepage.subtitle')}
        height={320}
      >
        <Parallax>
          <Parallax.Layer depth={0.2}>
            <div className="pyramid small" />
          </Parallax.Layer>
          <Parallax.Layer depth={0.8}>
            <div className="pyramid large" />
          </Parallax.Layer>
        </Parallax>
      </HeroComponent>
    )
  }
}
