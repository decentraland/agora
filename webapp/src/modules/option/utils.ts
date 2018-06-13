import { Option } from 'modules/option/types'
import { Vote } from 'modules/vote/types'

export function getVoteOptionValue(options: Option[], vote: Vote): string {
  // TODO: Consider getting options from the store and accessing via options[option_id]
  const option = options.find(option => option.id === vote.option_id)
  return option ? option.value : ''
}
