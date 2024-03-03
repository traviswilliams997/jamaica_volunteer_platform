import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import HomePage from './scenes/homePage'
import LoginPage from './scenes/loginPage'
import ProfilePage from './scenes/profilePage'
import AgenciesPage from './scenes/agenciesPage'
import AgencyPage from './scenes/agencyPage'
import EventsPage from './scenes/eventsPage'

import { useMemo, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { initializeAgencies } from './reducers/agencyReducer'
import { initializeVolunteers } from './reducers/volunteerReducer'
import { initializePosts } from './reducers/postReducer'
import { initializeEvents } from './reducers/eventReducer'

function App() {
  const mode = useSelector((state) => state.global.mode)
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const theme = useMemo(() => createTheme(themeSettings(mode)))
  const isAuth = useSelector((state) => state.global.isAuth)

  const dispatch = useDispatch()

  const setIniitalState = async () => {
    dispatch(initializeVolunteers())
    dispatch(initializePosts())
    dispatch(initializeAgencies())
    dispatch(initializeEvents())
  }

  useEffect(() => {
    console.log('State Intialized ')
    setIniitalState()
  }, [])
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
                path="/events"
                element={isAuth ? <EventsPage /> : <Navigate to="/" />}
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
