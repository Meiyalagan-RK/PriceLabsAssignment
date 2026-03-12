import searchLocators from "../locators/searchLocators"

class SearchPage {

    visitHomePage() {
        cy.visit('/multicalendar')
    }

    clickOnSearch() {
        cy.get(searchLocators.searchInput).should('be.visible').click()
    }

    enterSearchQuery(query) {
        cy.get(searchLocators.searchInput).type(query)
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