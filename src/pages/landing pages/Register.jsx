import * as Yup from 'yup';
import register from "../../services/auth/register"
import toastify from "../../tools/toastify";
import getError from "../../tools/error/error";
import LandingForm from "../../components/LandingForm";


function Register() {

    const validationSchema = {
        email: Yup.string().email("Invalid email address!").required("Email is required!"),
        password: Yup.string().required("Password is required!"),
        confirmationPassword: Yup.string().required("Confirmation password is required!")
        .oneOf([Yup.ref("password"), null], "Passwords must match!")
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