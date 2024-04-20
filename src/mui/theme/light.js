import { createTheme } from "@mui/material";

const lightTheme = createTheme({
    palette: {
        mode: "light",
        border: "black",
        container: "#f0f0f0",
        link: {
            base: "#1976d2",
            hover: "#7b1fa2"
        },
        warning: {
            main: "#ffc107",
            hover: "#ffcd38"
        },
        danger: {
            main: "#dc3545",
            hover: "#d73a49"
        }
    }
})

export default lightTheme;