import { createI18n } from 'vue-i18n'
import EN from './en'
import ZH from './zh'

const messages = {
  en: {
    ...EN
  },
  zh: {
    ...ZH
  }
}
// 得到当前语言
const gerCurrentLanguage = () => {
  const UAlang = navigator.language // zh-CN
  const langCode = UAlang.indexOf('zh') !== -1 ? 'zh' : 'en' // indexOf !== -1 代表有zh
  localStorage.setItem('lang', langCode)
  return langCode
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: gerCurrentLanguage() || 'zh',
  messages: messages
})

export default i18n
