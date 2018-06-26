import { RootState } from 'types'
import { STATIC_PAGES } from 'locations'

export const hasRouter = (state: RootState) => !!state.router

export const getLocation = (state: RootState) =>
  hasRouter(state) && state.router.location

export const getPathname = (state: RootState) => {
  if (!hasRouter(state)) {
    return null
  }
  const location = getLocation(state)
  if (!location) {
    return null
  }
  return location.pathname
}

export const getPathAction = (state: RootState) => {
  if (!hasRouter(state)) {
    return null
  }
  const pathname = getPathname(state)
  if (!pathname) {
    return null
  }
  return pathname.split('/').pop()
}

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
