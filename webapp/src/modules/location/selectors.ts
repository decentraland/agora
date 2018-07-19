import { RootState } from 'types'
import { STATIC_PAGES } from 'locations'
import {
  getPathname,
  getPathAction
} from '@dapps/modules/location/selectors'

export const isStaticPage = (state: RootState) => {
  const pathname = getPathname(state)
  if (!pathname) {
    return null
  }
  return STATIC_PAGES.includes(pathname)
}

export const isModalPage = (state: RootState) => {
  const lastPartOfUrl = getPathAction(state)
  switch (lastPartOfUrl) {
    case 'vote':
      return true
    default:
      return false
  }
}
