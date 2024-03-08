import React from 'react'
import '@testing-library/jest-dom'
import { render as rtlRender, screen } from '@testing-library/react'
import EventWidget from './EventWidget'
import { test, expect } from '@jest/globals'
import MockTheme from '../../MockTheme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const intialState = {
  posts: [],
  events: {
    events: [
      {
        id: 2,
        createdByAgencyId: 1,
        agencyName: 'VolunteerJA',
        title: 'VolJA Hackathon',
        description:
          'Create and innovate solutions to local volunteering issues. Prior programming experience is not required. Participants of all ages are welcome. Expect: prizes, games, community-building, networking and fun!',
        date: '2024-03-29T00:00:00.000Z',
        location: 'Engineering basement, UTech',
        latitude: 18.0059,
        longitude: -76.7468,
        createdAt: '2024-03-03T03:45:45.027Z',
        created_by_agency_id: 1,
      },
    ],
  },
  agency: {
    agencies: {
      id: 1,
      username: 'volunteerJa997',
      name: 'VolunteerJA',
      email: 'traviswilliams997@gmail.com',
      phoneNumber: '(876)426-9791',
      type: 'Tech',
      picturePath:
        'https://res.cloudinary.com/ddrcxv4fg/image/upload/v1709344239/suhk9xp8lk9c3fmnds3t.jpg',
      latitude: 18.0059,
      longitude: -76.7468,
      about:
        "Welcome to VolunteeringJa! We're revolutionizing volunteering with cutting-edge websites, digital solutions, and a groundbreaking platform connecting volunteers with meaningful opportunities. Let's make a difference pull request at a time.. ",
      admin: false,
    },
  },
}

const middlewares = []

const mockStore = configureStore(middlewares)
const eventStore = mockStore(intialState)

const render = (component) =>
  rtlRender(
    <Provider store={eventStore}>
      {' '}
      <MockTheme> {component}</MockTheme>
    </Provider>
  )

test('renders content', () => {
  const agencyId = 1

  const { container } = render(<EventWidget agencyId={agencyId} />)

  const element = screen.getByText('Upcoming Event')
  const eventNameEl = screen.getByText('VolJA Hackathon')
  const locationEl = screen.getByText('Engineering basement, UTech')

  expect(element).toBeDefined()
  expect(eventNameEl).toBeDefined()
  expect(locationEl).toBeDefined()
})
