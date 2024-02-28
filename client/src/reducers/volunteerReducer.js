import { createSlice } from '@reduxjs/toolkit'
import volunteerService from '../services/volunteers'

const intialState = {
  currentVolunteers: null,
  volunteers: [],
  volunteerFollowers: [],
}
const volunteerSlice = createSlice({
  name: 'volunteer',
  initialState: intialState,
  reducers: {
    setCurrentVolunteer: (state, action) => {
      state.currentVolunteer = action.payload
      return state
    },
    setVolunteers(state, action) {
      state.volunteers = action.payload
      return state
    },
    appendVolunteer(state, action) {
      state.volunteers.push(action.payload)
    },
    setFollowers: (state, action) => {
      if (state.volunteer) {
        state.volunteerFollowers = action.payload
      } else {
        console.error('This volunteer has no followers')
      }
    },
  },
})

export const {
  setMode,
  setVolunteers,
  appendVolunteer,
  setCurrentVolunteer,
  setFollowers,
} = volunteerSlice.actions

export const initializeVolunteers = () => {
  return async (dispatch) => {
    const volunteers = await volunteerService.getAll()
    dispatch(setVolunteers(volunteers))
  }
}

export const initializeVolunteerFollowers = () => {
  return async (dispatch) => {
    const volunteerFollowers = await volunteerService.getAll()
    dispatch(setFollowers(volunteerFollowers))
  }
}
export const resetVolunteer = (user) => {
  return async (dispatch) => {
    dispatch(setCurrentVolunteer(user))
  }
}

export const logInVolunteer = (volunteer) => {
  return async (dispatch) => {
    dispatch(setCurrentVolunteer(volunteer))
  }
}

export const logOutVolunteer = () => {
  return (dispatch) => {
    dispatch(setCurrentVolunteer(null))
  }
}
export default volunteerSlice.reducer
