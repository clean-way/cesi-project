describe('Navigation to articles', () => {
    it('should navigate to the articles page', () => {
        // Start from the index page
        cy.visit('/')

        // Find a link with an href attribute containing "articles" and click it
        cy.get('a[href*="articles"]').click({multiple: true, force: true})

        // The new url should include "/articles"
        cy.url().should('include', '/articles')

        // The new page should contain a div with "Articles du jour"
        cy.get('div').contains('Articles du jour')

        // The new page should contain a div with "Articles de la semaine"
        cy.get('div').contains('Articles de la semaine')
    })
})

describe('Navigate to map page', () => {
    it('should navigate to the sign in page and sign in then go to map', () => {
        cy.visit('/auth/signin')

        cy.url().should('include', '/auth/signin')

        cy.get('input[name="email"]').type('toto2@gmail.com');
        cy.get('input[name="password"]').type('1Azertyuiop');

        cy.get('form').submit()

        cy.get('a[href*="map"]').click({multiple: true, force: true})

        cy.url().should('include', '/map')

        cy.get('canvas')
    })
})