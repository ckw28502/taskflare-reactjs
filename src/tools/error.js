import i18next from "./i18n";

function getError(errorCode) {
    return i18next.t(`errors.${errorCode}`) || i18next.t("errors.INTERNAL_SERVER_ERROR")
}

export default getError;