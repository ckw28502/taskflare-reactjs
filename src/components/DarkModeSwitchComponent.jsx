import { Box, Switch } from "@mui/material";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch } from "react-redux";
import toggleDarkMode from "../redux/actions/darkModeAction";

function DarkModeSwitchComponent() {
    const dispatch = useDispatch();

    function handleChange() {
        dispatch(toggleDarkMode());
    }

    return(
        <Box sx={{
            display: "flex",
            alignItems: "center"
        }}>
            <FaSun size={27} style={{color: "orange"}} aria-label="Sun icon"/>
            <Switch onChange={handleChange}/>
            <FaMoon size={20} style={{color: "purple"}} aria-label="Moon icon"/>
        </Box>
    )
}

export default DarkModeSwitchComponent;