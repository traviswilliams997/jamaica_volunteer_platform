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
      if (state.currentVolunteer) {
        state.volunteersYouFollow = action.payload.followedByYou
      }
    },
  },
})

export const {
  setVolunteers,
  appendVolunteer,
  setCurrentVolunteer,
  setFollowing,
} = volunteerSlice.actions

export const initializeVolunteers = () => {
  return async (dispatch) => {
    const volunteers = await volunteerService.getAll()
    dispatch(setVolunteers(volunteers))
  }
}

export const setVolunteersYouFollow = (id, customAxios) => {
  return async (dispatch) => {
    const volunteersYouFollow = await volunteerService.getFollowing(
      id,
      customAxios
    )

    dispatch(setFollowing({ followedByYou: volunteersYouFollow }))
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
    dispatch(setVolunteers([]))
    dispatch(setFollowing([]))
    dispatch(setCurrentVolunteer(null))
  }
}
export default volunteerSlice.reducer
