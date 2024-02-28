import { createSlice } from '@reduxjs/toolkit'

const intialState = {
  mode: 'light',
  token: null,
  isAuth: false,
}
const globalSlice = createSlice({
  name: 'volunteer',
  initialState: intialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
    setToken: (state, action) => {
      state.token = action.payload
      return state
    },
    setAuth: (state, action) => {
      state.isAuth = action.payload
      return state
    },
  },
})

export const { toggleMode, setToken, setAuth } = globalSlice.actions

export const setAccessToken = (newToken) => {
  return async (dispatch) => {
    dispatch(setToken(`Bearer ${newToken}`))
  }
}

export const toggleDarkLightMode = () => {
  return async (dispatch) => {
    dispatch(toggleMode())
  }
}

export const setAuthentication = (auth) => {
  return async (dispatch) => {
    dispatch(setAuth(auth))
  }
}

export default globalSlice.reducer
