describe('Navigation', () => {
  it('should navigate to login route', () => {
    cy.visit('http://localhost:3000/login')

    cy.url().should('include', '/login')
  })
  it('should navigate to register route', () => {
    cy.visit('http://localhost:3000/register')

    cy.url().should('include', '/register')
  })
  it('should navigate to forcoins route', () => {
    cy.visit('http://localhost:3000/forcoins')

    cy.url().should('include', '/forcoins')
  })
  it('should navigate to forexchange route', () => {
    cy.visit('http://localhost:3000/forexchange')

    cy.url().should('include', '/forexchange')
  })
})