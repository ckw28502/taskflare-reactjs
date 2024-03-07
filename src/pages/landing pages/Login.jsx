import { Link } from "react-router-dom";
import InputComponent from "../../components/InputComponent"
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from 'yup';
import PasswordComponent from "../../components/PasswordComponent";
import ButtonComponent from "../../components/ButtonComponent";
import Toastify from "../../tools/toastifyCaller";


function Login() {

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    function submit(values) {
        
    }

    return(
        <>
            <h1 className="text-4xl font-bold mb-5">SIGN IN</h1>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={values => submit(values)}
            >
                {({ isSubmitting })=>(
                    <Form className="place-self-center justify-self-center flex flex-col">
                        <InputComponent required type="email" name="email" label="Email Address" id="login-email"/>
                        <PasswordComponent required name="password" label="Password" id="login-password"/>
                        <ButtonComponent type="submit" disabled={isSubmitting} color="gray" name="login" id="login-button" />
                    </Form>
                )}
            </Formik>
            <Link to={"/register"} >
                <p className="text-blue-500 hover:text-purple-500 underline cursor-pointer">Sign Up</p>
            </Link>
        </>
    )
}
    
export default Login;