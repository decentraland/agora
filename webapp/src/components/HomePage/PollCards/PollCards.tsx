import * as React from 'react'
import { HeaderMenu, Header, Button, Card, Icon } from 'decentraland-ui'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import Token from 'components/Token'
import { Props } from './PollCards.types'
import './PollCards.css'
import { isFinished } from 'modules/poll/utils'
import { distanceInWordsToNow } from '@dapps/lib/utils'
import { PollWithAssociations } from 'modules/poll/types'

export default class PollCards extends React.PureComponent<Props> {
  getPollClickHandler = (poll: PollWithAssociations) => {
    const { onClick } = this.props
    return () => onClick(poll)
  }
  render() {
    const { polls, title, meta, onViewMore } = this.props
    return (
      <div className="PollCards">
        <HeaderMenu>
          <HeaderMenu.Left>
            <Header>{title}</Header>
          </HeaderMenu.Left>
          <HeaderMenu.Right>
            <Button basic size="small" onClick={onViewMore}>
              {t('global.view_more')}
              <Icon name="chevron right" />
            </Button>
          </HeaderMenu.Right>
        </HeaderMenu>
        <Card.Group>
          {polls.map(poll => (
            <Card
              link
              onClick={this.getPollClickHandler(poll)}
              className={isFinished(poll) ? 'finished' : 'ongoing'}
            >
              <Card.Content>
                <Card.Header>{poll.title}</Card.Header>
                <Card.Meta>
                  <div className="poll-meta">
                    <div className="total">
                      {meta}: <Token amount={poll.balance} token={poll.token} />
                    </div>
                    <div className="date">
                      {t(
                        !isFinished(poll)
                          ? 'homepage.cards.time_left'
                          : 'homepage.cards.closed',
                        {
                          time: distanceInWordsToNow(
                            poll.closes_at,
                            isFinished(poll)
                          )
                        }
                      )}
                    </div>
                  </div>
                </Card.Meta>
              </Card.Content>
            </Card>
          ))}
        </Card.Group>
      </div>
    )
  }
}
