import { Link } from "react-router-dom";
import InputComponent from "../../components/InputComponent"
import { Form, Formik } from "formik";
import * as Yup from 'yup';
import PasswordComponent from "../../components/PasswordComponent";
import ButtonComponent from "../../components/ButtonComponent";


function Login() {

    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required')
    });

    function submit(values) {
        console.log(values);
    }

    return(
        <>
            <h1 className="text-4xl font-bold mb-5">SIGN IN</h1>
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={values => submit(values)}
            >
                <Form className="place-self-center justify-self-center flex flex-col">
                    <InputComponent type="text" name="email" label="Email Address" id="login-email"/>
                    <PasswordComponent name="password" label="Password" id="login-password"/>
                    <ButtonComponent type="submit" color="gray" name="login" id="login-button" />
                </Form>
            </Formik>
            <Link to={"/register"} >
                <p className="text-blue-900 hover:text-purple-900 underline cursor-pointer">Sign Up</p>
            </Link>
        </>
    )
}
    
export default Login;