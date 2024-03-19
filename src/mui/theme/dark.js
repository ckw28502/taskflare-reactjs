import { createTheme } from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
        container: "#404040",
        link: {
            base: "#42a5f5",
            hover: "#ab47bc"
        }
    }
})

export default darkTheme;