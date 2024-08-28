describe('Navigation', () => {
    it('should navigate to the articles page', () => {
        // Start from the index page
        cy.visit('/')

        // Find a link with an href attribute containing "articles" and click it
        cy.get('a[href*="articles"]').click({multiple: true, force: true})

        // The new url should include "/articles"
        cy.url().should('include', '/articles')

        // The new page should contain an h4 with "Articles du jour"
        cy.get('div').contains('Articles du jour')

        cy.get('div').contains('Articles de la semaine')
    })
})