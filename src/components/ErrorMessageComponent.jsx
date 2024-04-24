import { ErrorMessage } from "formik";
import { useTranslation } from "react-i18next";
import { string } from "prop-types"
import { useEffect, useState } from "react";


function ErrorMessageComponent(props){
    const { t, i18n } = useTranslation();

    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

    

    useEffect(() => {
        setCurrentLanguage(i18n.language)
    }, [i18n.language])

    return(
        <ErrorMessage name={props.targetName}>
            { error => <div className="text-red-500 text-sm">{ t(`errors.${error}`, { lng: currentLanguage }) }</div> }
        </ErrorMessage>
    )
}

ErrorMessageComponent.propTypes = {
    targetName: string.isRequired
}

export default ErrorMessageComponent;