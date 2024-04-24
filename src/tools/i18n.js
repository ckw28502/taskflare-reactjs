import i18next from "i18next";
import enTranslation from "../assets/json/lang/en.json";
import idTranslation from "../assets/json/lang/id.json";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: enTranslation
    },
    id: {
        translation: idTranslation
    }
}

i18next.use(initReactI18next).init({
    resources,
    lng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18next;