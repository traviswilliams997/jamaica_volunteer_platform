import { createSlice } from '@reduxjs/toolkit'
import agencyService from '../services/agencies'

const intialState = {
  agencies: [],
  currentAgency: null,
  currentAgencyMembers: [],
}
const agencySlice = createSlice({
  name: 'agency',
  initialState: intialState,
  reducers: {
    setAgencies(state, action) {
      state.agencies = action.payload
      return state
    },
    appendAgency(state, action) {
      state.agencies.push(action.payload)
    },
    setCurrentAgency: (state, action) => {
      state.currentAgency = action.payload
      return state
    },

    setCurrentMembers: (state, action) => {
      if (state.currentAgency) {
        state.currentAgencyMembers = action.payload
      }
    },
  },
})

export const {
  setAgencies,
  appendAgency,
  setCurrentAgency,
  setCurrentMembers,
} = agencySlice.actions

export const initializeAgencies = () => {
  return async (dispatch) => {
    const agencies = await agencyService.getAll()

    dispatch(setAgencies(agencies))
  }
}

export default agencySlice.reducer
