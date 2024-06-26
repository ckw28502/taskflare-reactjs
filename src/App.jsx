import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/landing pages/Login";
import Register from "./pages/landing pages/Register";
import NotFound from "./pages/NotFound";
import lightTheme from "./mui/theme/light";
import darkTheme from "./mui/theme/dark";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Projects from "./pages/main/Projects";
import Project from "./pages/main/Project";

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
          path: "/",
          element: <Projects />
        },
        {
          path: "/:projectId",
          element: <Project />
        },
        {
          path: "*",
          element: <NotFound />
        }
      ])

    const isDarkMode = useSelector(state => state.darkMode.isDarkMode);

    useEffect(() => {
      if (isDarkMode) {
        document.body.classList.remove("bg-slate-400");
        document.body.classList.add("bg-slate-800");
      } else {
        document.body.classList.add("bg-slate-400");
        document.body.classList.remove("bg-slate-800");
      }
    }, [isDarkMode])

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <RouterProvider router={ router } />
        </ThemeProvider>
    )
}

export default App;