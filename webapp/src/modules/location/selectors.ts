import { RootState } from 'types'
import { STATIC_PAGES, locations } from 'locations'
import { getPathname } from '@dapps/modules/location/selectors'

export const isStaticPage = (state: RootState) => {
  const pathname = getPathname(state)
  if (!pathname) {
    return null
  }
  return STATIC_PAGES.includes(pathname)
}

export const isHomePage = (state: RootState) => {
  const pathname = getPathname(state)
  return pathname === locations.root()
}
