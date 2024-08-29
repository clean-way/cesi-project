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

describe('Declare trash', () => {
    it('should navigate to the sign in page and sign in then go to map to declare trash', () => {    
        cy.intercept('POST', '**/api/auth/**').as('login');  

        // Go to sign in page
        cy.visit('/auth/signin')

        cy.url().should('include', '/auth/signin')

        // Enter information in sign in form
        cy.get('input[name="email"]').type('toto2@gmail.com');
        cy.get('input[name="password"]').type('1Azertyuiop');

        // Submit
        cy.get('form').submit();
        
        cy.wait('@login');

        //Go to map page
        cy.get('a[href*="map"]').should('be.visible');
        cy.get('a[href*="map"]').click({multiple: true, force: true});

        cy.url().should('include', '/map');

        // Check if the map is visible
        cy.get('canvas');

        // Add a trash spot
        cy.get('*[class^="lucide"]').click({multiple: true, force: true});

        // Enter form informations
        cy.get('input[name="name"]').first().type('Déchet');
        cy.get('input[name="description"]').first().type('Description Déchet');
        // Open Combobox
        cy.get('[role="combobox"]').first().click();
        cy.get("select")
            .first()
            .select("MOUNTAIN", {force: true})
            .should("have.value", "MOUNTAIN");
        // Select an image
        cy.get('input[name="file"]').first().selectFile('public/unpicked_trash.png');
        // Trash n°1
        cy.get('input[name="name"]').last().type('Déchet 1');
        cy.get('input[name="quantity"]').last().type('1');

        // Add a trash
        cy.get('button').contains('Ajouter un déchet').first().click();

        // Trash n°2
        cy.get('input[name="name"]').last().type('Déchet 2');
        cy.get('input[name="quantity"]').last().type('2');        

        // // Add a trash
        // cy.get('button').contains('Ajouter un déchet').first().click();

        // // Remove last trash
        // cy.get('button').contains('-').last().click();

        // Submit
        cy.get('form').submit();

        // Click on the trash
        cy.get('img[src="/_next/image?url=%2Funpicked_trash.png&w=64&q=75"]').first().click({force: true});

        // Pick up trash
        cy.get('button').contains('Ramasser').first().click();

        // Select an image
        cy.get('input[name="file"]').first().selectFile('public/picked_trash.png');
        
        // Submit
        cy.get('form').submit();

        // Close the window
        cy.get('button').contains('Fermer').first().click();

        

    })
})