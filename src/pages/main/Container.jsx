import PropTypes from "prop-types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Container(props) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            navigate("/login");
        }
    }, [navigate])
    return(
        <div className="container flex justify-center items-center w-screen h-screen place-content-center">
            <div className="w-1/2 bg-slate-100 py-6 px-1 max-h-1/2 place text-center rounded-lg flex flex-col">
                {props.children}
            </div>
        </div>
    )
}

Container.propTypes = {
    children: PropTypes.node.isRequired
};
    
export default Container;
