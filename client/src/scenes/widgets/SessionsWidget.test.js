import React from 'react'
import '@testing-library/jest-dom'
import { render as rtlRender, screen } from '@testing-library/react'
import SessionsWidget from './SessionsWidget'
import { test, expect } from '@jest/globals'
import MockTheme from '../../MockTheme'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const volunteer = {
  id: 1,
  username: 'andrew947',
  firstName: 'Andrew',
  lastName: 'Holness',
  email: 'andrew847@gmail.com',
  phoneNumber: '(876)927-9941',
  picturePath:
    'https://res.cloudinary.com/ddrcxv4fg/image/upload/v1709541484/sch3ki3rhhguv339i6my.jpg',
  dateOfBirth: '1972-07-22T00:00:00.000Z',
  about:
    'Andrew Michael Holness, is the prime minister of Jamaica.He is leader of the Jamaica Labour Party (JLP). In March 2016, aged 43, he became the youngest to ever be elected prime minister',
  skills:
    'Being a father and a husband. Leading my country upwards and onwards',
  sessions: [
    {
      id: 1,
      volunteerId: 1,
      createdByAgencyId: 1,
      sessionStart: '2024-03-17',
      sessionEnd: '2024-03-18',
      workDone: 'Refactor Ui',
    },
  ],
}

const intialState = {
  posts: [],
  events: {
    events: [],
  },
  agency: {
    agencies: [
      {
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
    ],
  },
  volunteer: {
    volunteers: [volunteer],
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
  const { container } = render(<SessionsWidget volunteer={volunteer} />)

  // screen.debug()
  ////

  const element = screen.getByText('Last Session')
  const element2 = screen.getByText('Refactor Ui')

  expect(element).toBeDefined()
  expect(element2).toBeDefined()
  screen

  expect(element).toHaveTextContent('Last Session')
  expect(element2).toHaveTextContent('Refactor Ui')
})
