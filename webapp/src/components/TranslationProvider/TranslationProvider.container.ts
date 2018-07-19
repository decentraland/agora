import { connect } from 'react-redux'
import { getLocale } from 'decentraland-dapps/dist/modules/wallet/selectors'
import { RootState, RootDispatch } from 'types'
import { isLoading } from 'modules/storage/selectors'
import { getData } from 'modules/translation/selectors'
import { fetchTranslationsRequest } from 'modules/translation/actions'
import { getPreferredLocale } from 'modules/translation/utils'
import { TranslationActions } from 'modules/translation/types'
import { TranslationProviderProps } from 'components/TranslationProvider/types'

import TranslationProvider from './TranslationProvider'

const mapState = (
  state: RootState,
  ownProps: TranslationProviderProps
): TranslationProviderProps => {
  // Wait until the locale is loaded from the storage to select it
  let locale = isLoading(state) ? '' : getLocale(state) || getPreferredLocale()
  const translations = getData(state)[locale]

  return {
    ...ownProps,
    locale,
    translations
  }
}

const mapDispatch = (dispatch: RootDispatch<TranslationActions>) => ({
  onFetchTranslations: (locale: string) =>
    dispatch(fetchTranslationsRequest(locale))
})

export default connect<TranslationProviderProps>(mapState, mapDispatch)(
  TranslationProvider
)
