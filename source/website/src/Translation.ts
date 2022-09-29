import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import de from './data/translation/de.json'
import en from './data/translation/en.json'

i18next.use(initReactI18next).init({
    resources: {
        en: {
            translation: en,
        },
        de: {
            translation: de,
        },
    },
    lng: localStorage.getItem("lng") || "en",
    fallbackLng: "en",
})

export default i18next;