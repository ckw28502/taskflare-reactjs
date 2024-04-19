import { createTheme } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        border: "white",
        container: "#404040",
        link: {
            base: "#42a5f5",
            hover: "#ab47bc"
        },
        warning: {
            main: "#ffcd38"
        },
        danger: {
            main: "#d73a49"
        }
    }
})

export default darkTheme;