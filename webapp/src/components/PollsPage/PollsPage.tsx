import * as React from 'react'
import { Link } from 'react-router-dom'
import { locations } from 'locations'
import { PollsPageProps } from 'components/PollsPage/types'
import { t } from 'modules/translation/utils'
import { Header, Loader, Table, Blockie, Address, Mana } from 'decentraland-ui'
import { PollWithAssociations } from 'modules/poll/types'
import { formatNumber } from 'lib/utils'
import './PollsPage.css'

export default class PollsPage extends React.PureComponent<PollsPageProps> {
  componentWillMount() {
    this.props.onFetchPolls()
  }

  render() {
    const { polls, isLoading } = this.props

    return (
      <div className="PollsPage">
        <Header className="title" size="large">
          {t('polls_page.title')}
        </Header>
        {isLoading ? (
          <Loader active size="massive" />
        ) : (
          <Table basic>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  {t('polls_page.table.title')}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {t('polls_page.table.submitter')}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {t('polls_page.table.balance')}
                </Table.HeaderCell>
                <Table.HeaderCell>
                  {t('polls_page.table.votes')}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {Object.values(polls).map((poll, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <Link to={locations.pollDetail(poll.id)}>{poll.title}</Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Blockie scale={3} seed={poll.submitter}>
                      &nbsp;<Address value={poll.submitter} />
                    </Blockie>
                  </Table.Cell>
                  <Table.Cell>
                    <Mana size="small" black />
                    {formatNumber(poll.balance)}
                  </Table.Cell>
                  <Table.Cell>
                    {(poll as PollWithAssociations).votes.length}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        )}
      </div>
    )
  }
}
