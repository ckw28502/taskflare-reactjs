import { createTheme } from "@mui/material";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        border: "black",
        container: "#f0f0f0",
        link: {
            base: "#1976d2",
            hover: "#7b1fa2"
        }
    }
})

export default lightTheme;