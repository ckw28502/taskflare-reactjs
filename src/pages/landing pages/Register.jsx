import * as Yup from 'yup';
import register from "../../services/auth/register"
import toastify from "../../tools/toastify";
import getError from "../../tools/error";
import LandingForm from "./sections/LandingForm";
import { useTranslation } from 'react-i18next';

function Register() {
    const { t } = useTranslation();

    const validationSchema = {
        email: Yup.string().email(t("EMAIL_INVALID")).required(t("EMAIL_REQUIRED")),
        password: Yup.string().required(t("PASSWORD_REQUIRED")),
        confirmationPassword: Yup.string().required(t("CONFIRMATION_PASSWORD_REQUIRED"))
        .oneOf([Yup.ref("password"), null], t("PASSWORD_MISSMATCH"))
    };

    function onSubmit(values) {
        register(values)
        .then(() => toastify.success("You are registered now!"))
        .catch(res => {
            const message = getError(res.response.data.message);
            toastify.error(message);
        })
    }

    return(
        <LandingForm 
            validationSchema={validationSchema}
            action="REGISTER"
            onSubmit={onSubmit}
            initialValues={{
                email: "",
                password: "",
                confirmationPassword: ""
            }}
        />
    )
}
    
export default Register;