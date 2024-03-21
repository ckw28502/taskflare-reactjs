import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import login from "../../services/auth/login";
import toastify from "../../tools/toastify";
import getError from "../../tools/error";
import LandingForm from "./sections/LandingForm";

function Login() {
    const navigate = useNavigate();

    const validationSchema = {
        email: Yup.string().email("EMAIL_INVALID").required("EMAIL_REQUIRED"),
        password: Yup.string().required("PASSWORD_REQUIRED")
    }

    function onSubmit(values) {
        login(values)
        .then(data => {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("refreshToken", data.refreshToken);
            navigate("/");
        })
        .catch(res => {
            const message = getError(res.response.data.message);
            toastify.error(message);
        })
    }

    return(
        <LandingForm 
            validationSchema={validationSchema}
            action="LOGIN"
            onSubmit={onSubmit}
            initialValues={{
                email: "",
                password: ""
            }}
        />
    )
}
    
export default Login;