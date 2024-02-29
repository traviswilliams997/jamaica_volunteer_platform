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
    setFollowing: (state, action) => {
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
  setFollowing,
} = volunteerSlice.actions

export const initializeVolunteers = (customAxios) => {
  return async (dispatch) => {
    const volunteers = await volunteerService.getAll(customAxios)

    dispatch(setVolunteers(volunteers))
  }
}

export const setVolunteersYouFollow = (id, customAxios) => {
  return async (dispatch) => {
    const volunteersYouFollow = await volunteerService.getFollowing(customAxios)

    dispatch(setVolunteersYouFollow(volunteersYouFollow))
  }
}
export const resetVolunteer = (volunteer) => {
  return async (dispatch) => {
    dispatch(setCurrentVolunteer(volunteer))
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
