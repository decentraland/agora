import { NavbarProps } from 'decentraland-ui'

export type Props = NavbarProps & {}

export type MapStateProps = Pick<Props, 'isModal'>
export type MapDispatchProps = Pick<Props, 'onBack' | 'onClickLogo'>
