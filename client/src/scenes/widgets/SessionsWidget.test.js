import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import SessionsWidget from './SessionsWidget'
import { test, expect } from '@jest/globals'
import MockTheme from '../../MockTheme'

test('renders content', () => {
  const { container } = render(
    <MockTheme>
      <SessionsWidget />
    </MockTheme>
  )

  const element = screen.getByText('Last Session')
  const element2 = screen.getByText(
    'Distributed items of clothing, food, medical and household articles and supplies to persons in need.'
  )
  const dateParagraph = container.querySelector(
    '.css-q0nmzi-MuiTypography-root'
  )

  expect(dateParagraph).toHaveTextContent('Thursday, Feb 29, 2024')

  //   screen.debug()

  expect(element).toBeDefined()
  expect(element2).toBeDefined()
  screen

  expect(element).toHaveTextContent('Last Session')
  expect(element2).toHaveTextContent(
    'Distributed items of clothing, food, medical and household articles and supplies to persons in need.'
  )
})
