import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/landing pages/Login";
import Register from "./pages/landing pages/Register";
import NotFound from "./pages/NotFound";
import lightTheme from "./mui/theme/light";
import darkTheme from "./mui/theme/dark";
import { useState } from "react";

function App() {
    const router = createBrowserRouter([
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ])

    const [isDarkMode, setIsDarkMode] = useState(false);

    function toggleDarkMode() {
        if (isDarkMode) {
            document.body.classList.remove("bg-slate-800");
            document.body.classList.add("bg-slate-400");
        } else {
            document.body.classList.add("bg-slate-800");
            document.body.classList.remove("bg-slate-400");
        }
        setIsDarkMode(!isDarkMode);
    }

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <RouterProvider router={ router } />
        </ThemeProvider>
    )
}

export default App;