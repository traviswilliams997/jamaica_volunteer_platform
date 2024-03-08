describe('Volunteer app', function () {
  describe('When user is not logged in ', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const malcolmx = {
        username: 'malcolmx',
        firstName: 'Malcolm',
        lastName: 'X',
        email: 'malcolmx@gmail.com',
        password: 'malcomX100%',
      }
      cy.register(malcolmx)
      cy.visit('http://localhost:5173')
    })
    it('front page can be opened', function () {
      cy.contains('Voluntaica')
      cy.contains(
        'Welcome to Voluntaica, the go-to place to find volunteering agencies and events'
      )
      cy.contains('Email')
      cy.contains('Password')
      cy.contains('LOGIN')
      cy.contains("Don't have an account? Sign Up here.")
    })

    it('User can login ', function () {
      cy.get('input:first').type('malcolmx@gmail.com')
      cy.get('input:last').type('malcomX100%')

      cy.contains('LOGIN').click()
      cy.contains('Last Session')
    })

    it('User login fails with wrong credentials ', function () {
      cy.get('input:first').type('malcolmx@gmail.com')
      cy.get('input:last').type('malcomX')

      cy.contains('LOGIN').click()

      cy.get('input:first').should('exist')
    })
  })

  // describe('When user is loggged in', function () {
  //   beforeEach(function () {
  //     cy.request('POST', 'http://localhost:3003/api/testing/reset')
  //     const malcolmx = {
  //       username: 'malcolmx',
  //       firstName: 'Malcolm',
  //       lastName: 'X',
  //       email: 'malcolmx@gmail.com',
  //       password: 'malcomX100%',
  //     }
  //     cy.register(malcolmx)
  //   })

  //   it('User is on home page', function () {
  //     cy.login('malcolmx@gmail.com', 'malcomX100%')

  //     cy.contains('Last Session')
  //   })
  // })
})
