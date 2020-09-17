//cypress

describe('user app', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })
    // it('it works', () => {
    //     expect(1+1).to.equal(2)
    // })

    const name = () => cy.get(':nth-child(1) > input')
    const email = () => cy.get(':nth-child(2) > input')
    const password = () => cy.get(':nth-child(3) > input')
    const checkbox = () => cy.get(':nth-child(4) > input')
    const button = () => cy.get('button')


    it('get name input', () => {
        name()
        .should('exist')
        .should('have.value', '')
        .type('Adam')
        .should('have.value', 'Adam')
    })

    it('email time', () => {
        email()
        .should('exist')
        .should('have.value', '')
        .type('ruffneradam10@gmail.com')
        .should('have.value', 'ruffneradam10@gmail.com' )
    })

    it('get that password', () => {
    password()
    .should('exist')
    .should('have.value', '')
    .type('mycurrentpassowrd')
    .should('have.value', 'mycurrentpassowrd' )
    })

    it('checkbox time', () => {
        checkbox()
        .should('exist')
        .check().should('be.checked')
    })

    it('check for all validations', () => { //this function purposfully fails on button click because it hits the submit button when all fields are not entered
        
        button().should('exist')
        name().type('Adam')
        button().should('be.disabled')
        name().clear() 
        email().type('ruffneradam10@gmail.com')
        email().clear()
        password().type('mycurrentpassowrd')
        password().clear()
        checkbox().check().should('be.checked')
        checkbox().uncheck()
        button().should('be.disabled')
        // button().click()
    }) 

    it('submit everything and post', () => {
        name().type('Adam')
        email().type('ruffneradam10@gmail.com')
        password().type('mycurrentpassowrd')
        checkbox().check().should('be.checked')
        button().click()
    })





})