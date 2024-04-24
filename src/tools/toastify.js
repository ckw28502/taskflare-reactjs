import { Bounce, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const config = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
    };

function error(text) {
    toast.error(text, config);
}

function success(text){
    toast.success(text, config)
}

export default { error, success };