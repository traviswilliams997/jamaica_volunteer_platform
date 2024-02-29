import { createSlice } from '@reduxjs/toolkit'
import volunteerService from '../services/volunteers'

const intialState = {
  currentVolunteer: null,
  volunteers: [],
  volunteersYouFollow: [],
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
    setYourFollowings: (state, action) => {
      if (state.volunteer) {
        state.volunteersYouFollow = action.payload.followedByYou
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
  setYourFollowings,
} = volunteerSlice.actions

export const initializeVolunteers = (volunteers) => {
  return async (dispatch) => {
    dispatch(setVolunteers(volunteers))
  }
}

export const setVolunteersYouFollow = (newObj) => {
  return async (dispatch) => {
    dispatch(setVolunteersYouFollow(newObj))
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
