import { createSlice } from '@reduxjs/toolkit'
import eventService from '../services/events'
const intialState = {
  events: [],
}
const eventSlice = createSlice({
  name: 'event',
  initialState: intialState,
  reducers: {
    setEvents(state, action) {
      state.events = action.payload
      return state
    },
    appendEvent(state, action) {
      state.events.push(action.payload)
    },
  },
})

export const { setEvents, appendEvent } = eventSlice.actions

export const initializeEvents = () => {
  return async (dispatch) => {
    const events = await eventService.getAll()
    console.log('Event reducer', events)
    dispatch(setEvents(events))
  }
}

export default eventSlice.reducer
