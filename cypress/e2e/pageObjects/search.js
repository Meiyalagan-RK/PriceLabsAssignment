class SearchPage {

    visitHomePage() {
        cy.visit('/multicalendar')
    }

    clickOnSearch() {
        cy.get('[qa-id="search-input"]').should('be.visible').click()
    }

    enterSearchQuery(query) {
        cy.get('[qa-id="search-input"]').type(query)
    }

    verifyListName(listingName) {
        cy.contains('tr', listingName)
            .should('have.length', 1)
    }
    searchAndValidate(listingName) {
        this.clickOnSearch()
        this.enterSearchQuery(listingName)
        this.verifyListName(listingName)
    }

}

export default new SearchPage()