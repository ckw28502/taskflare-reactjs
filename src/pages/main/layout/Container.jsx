import { node } from "prop-types";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Container({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            navigate("/login")
        }
    }, [navigate])
    return(
        <>
            <Sidebar />
            {children}
        </>
    )
}

Container.propTypes = {
    children: node.isRequired
}

export default Container;