import { Result } from 'components/PollDetailPage/types'
import { Option } from 'modules/option/types'
import { Token } from 'modules/token/types'

export type PollProgressProps = {
  results: Result[]
}

export type OptionProps = {
  option: Option
  winner: boolean
  percentage: number
  position: number
  total: number
  votes: number
  token?: Token
}
