import { node } from "prop-types";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Grid } from "@mui/material";

function Container({ children }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            navigate("/login")
        }
    }, [navigate])
    return(
        <Grid container spacing={2}>
            <Sidebar />
            <Grid item xs={10}>
                {children}
            </Grid>
        </Grid>
    )
}

Container.propTypes = {
    children: node.isRequired
}

export default Container;