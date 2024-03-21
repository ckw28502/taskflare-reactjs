import * as Yup from 'yup';
import register from "../../services/auth/register"
import toastify from "../../tools/toastify";
import getError from "../../tools/error";
import LandingForm from "./sections/LandingForm";

function Register() {
    const validationSchema = {
        email: Yup.string().email("EMAIL_INVALID").required("EMAIL_REQUIRED"),
        password: Yup.string().required("PASSWORD_REQUIRED"),
        confirmationPassword: Yup.string().required("CONFIRMATION_PASSWORD_REQUIRED")
        .oneOf([Yup.ref("password"), null], "PASSWORD_MISSMATCH")
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