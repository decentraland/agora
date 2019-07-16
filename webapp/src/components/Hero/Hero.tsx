import * as React from 'react'

import { Hero as HeroComponent, Parallax } from 'decentraland-ui'
import { t } from '@dapps/modules/translation/utils'

import './Hero.css'

export default class Hero extends React.PureComponent {
  render() {
    return (
      <HeroComponent centered height={320}>
        <HeroComponent.Header>{t('homepage.title')}</HeroComponent.Header>
        <HeroComponent.Description>
          {t('homepage.subtitle')}
        </HeroComponent.Description>
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
