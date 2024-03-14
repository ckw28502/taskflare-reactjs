import { Link } from "react-router-dom";
import InputComponent from "../../components/InputComponent"
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import PasswordComponent from "../../components/PasswordComponent";
import ButtonComponent from "../../components/ButtonComponent";
import register from "../../services/auth/register"
import toastify from "../../tools/toastify";
import getError from "../../tools/error/error";


function Register() {

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email address!").required("Email is required!"),
        password: Yup.string().required("Password is required!"),
        confirmationPassword: Yup.string().required("Confirmation password is required!")
        .oneOf([Yup.ref("password"), null], "Passwords must match!")
    });

    function submit(values) {
        register(values)
        .then(() => toastify.success("You are registered now!"))
        .catch(res => {
            const message = getError(res.response.data.message);
            toastify.error(message);
        })
    }

    return(
        <>
            <h1 className="text-4xl font-bold mb-5">SIGN UP</h1>
            <Formik
                initialValues={{ email: "", password: "", confirmationPassword: "" }}
                validationSchema={validationSchema}
                onSubmit={values => submit(values)}
                validateOnChange={true}
                >
                    <Form className="place-self-center justify-self-center flex flex-col">
                        <InputComponent type="text" name="email" label="Email Address" id="register-email"/>
                        <PasswordComponent name="password" label="Password" id="register-password"/>
                        <PasswordComponent  
                            name="confirmationPassword" 
                            label="Confirm Password" 
                            id="register-confirmation-password"
                        />
                        <ButtonComponent type="submit" color="gray" name="register" id="register-button" />
                    </Form>
            </Formik>
            <Link to={"/login"} >
                <p className="text-blue-900 hover:text-purple-900 underline cursor-pointer">Sign In</p>
            </Link>
        </>
    )
}
    
export default Register;