import React from 'react'
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material'
import { themeSettings } from './theme'

function MockTheme({ children }) {
  const theme = createTheme(themeSettings('light'))

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default MockTheme
