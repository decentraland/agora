export type Props = {
  center?: boolean
  isConnected: boolean
  isConnecting: boolean
  hasError: boolean
  onConnect: () => void
}

export type State = {
  hasError: boolean
}

export type MapStateProps = Pick<
  Props,
  'isConnecting' | 'isConnected' | 'hasError'
>

export type MapDispatchProps = Pick<Props, 'onConnect'>
