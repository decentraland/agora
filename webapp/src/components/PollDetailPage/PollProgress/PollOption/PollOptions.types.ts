import { Option } from 'modules/option/types'
import { Token } from 'modules/token/types'

export type Props = {
  option: Option
  winner: boolean
  percentage: number
  position: number
  total: number
  votes: number
  token?: Token
}
