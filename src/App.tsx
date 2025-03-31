import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Country from "./pages/Country";
import ErrorPage from "./pages/ErrorPage";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/:countryName",
    element: <Country />,
    errorElement: <ErrorPage />,
  },
]);

function App() {
  const [theme, setTheme] = useState<string | null>(null);

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      // User prefers dark mode
      setTheme("dark");
    } else {
      // User prefers light mode
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className='min-h-screen font-sans text-sm text-blue-700 md:text-lg xl:text-xl'>
      <Header currTheme={theme} handleThemeChange={changeTheme} />
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </div>
  );
}

export default App;

