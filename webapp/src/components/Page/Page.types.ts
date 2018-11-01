import { NavbarProps } from 'decentraland-ui'

export type Props = NavbarProps & {
  isHomePage: boolean
  isSignIn: boolean
  address: string | undefined
  mana: number | undefined
  isConnected: boolean
  isConnecting: boolean
}

export type MapStateProps = Pick<
  Props,
  | 'isHomePage'
  | 'isSignIn'
  | 'address'
  | 'isConnected'
  | 'isConnecting'
  | 'mana'
>
export type MapDispatchProps = Pick<Props, 'onSignIn'>
