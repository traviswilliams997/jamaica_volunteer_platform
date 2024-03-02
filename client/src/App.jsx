import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './scenes/homePage'
import LoginPage from './scenes/loginPage'
import ProfilePage from './scenes/profilePage'
import AgenciesPage from './scenes/agenciesPage'
import AgencyPage from './scenes/agencyPage'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
function App() {
  const mode = useSelector((state) => state.global.mode)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const theme = useMemo(() => createTheme(themeSettings(mode)))
  const isAuth = useSelector((state) => state.global.isAuth)
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="app">
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route
                path="/home"
                element={isAuth ? <HomePage /> : <Navigate to="/" />}
              />
              <Route
                path="/agencies"
                element={isAuth ? <AgenciesPage /> : <Navigate to="/" />}
              />
              <Route
                path="/profile/:volunteerId"
                element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
              />
              <Route
                path="/agency/:agencyId"
                element={isAuth ? <AgencyPage /> : <Navigate to="/" />}
              />
            </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  )
}

export default App
