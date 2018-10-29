import { NavbarProps } from 'decentraland-ui'

export type Props = NavbarProps & {
  isHomePage: boolean
  address: string | undefined
  mana: number | undefined
  isConnected: boolean
  isConnecting: boolean
}

export type MapStateProps = Pick<
  Props,
  'isHomePage' | 'address' | 'isConnected' | 'isConnecting' | 'mana'
>
export type MapDispatchProps = Pick<Props, 'onSignIn'>
