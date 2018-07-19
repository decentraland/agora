import { createTranslationSaga } from 'decentraland-dapps/dist/modules/translation/sagas'
import { api } from 'lib/api'

export const translationSaga = createTranslationSaga({
  getTranslation: locale => api.fetchTranslations(locale)
})
