import { NavbarProps } from 'decentraland-ui'

export type Props = NavbarProps & {
  isHomePage: boolean
}

export type MapStateProps = Pick<Props, 'isHomePage' | 'isSignIn'>
export type MapDispatchProps = Pick<Props, 'onSignIn'>
