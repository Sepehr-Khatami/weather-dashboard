import { useMemo, useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") ?? "light"
  );
  const [name, setName] = useState<string | null>(() =>
    localStorage.getItem("name")
  );

  useEffect(() => localStorage.setItem("theme", mode), [mode]);
  useEffect(
    () =>
      name
        ? localStorage.setItem("name", name)
        : localStorage.removeItem("name"),
    [name]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode },
        typography: { fontFamily: "'Roboto', 'Arial', sans-serif" },
        shape: { borderRadius: 12 },
        components: { MuiPaper: { defaultProps: { elevation: 3 } } },
        direction: "ltr", // LTR fixed
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path='/login' element={<Login onLogin={setName} />} />
        <Route
          path='/'
          element={
            name ? (
              <Dashboard
                name={name}
                onLogout={() => setName(null)}
                mode={mode}
                setMode={setMode}
              />
            ) : (
              <Navigate to='/login' replace />
            )
          }
        />
        <Route
          path='*'
          element={<Navigate to={name ? "/" : "/login"} replace />}
        />
      </Routes>
    </ThemeProvider>
  );
}
