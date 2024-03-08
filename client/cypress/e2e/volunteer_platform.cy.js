describe('Volunteer app', function () {
  beforeEach(function () {
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
    cy.contains(
      'There is no better teacher than adversity. Every defeat, every heartbreak, every loss, contains its own seed, its own lesson on how to improve your performance the next time.'
    )
  })
})
