import multicalenderDSO from '../pageObjects/pages/multicalenderOverride'
import searchPage from '../pageObjects/pages/search'

describe("Multicalender DSO feature", () => {

  context('Create and validate DSO Overrides', () => {
    beforeEach(() => {
      // home page
      multicalenderDSO.visitHomePage()
    });

    it('selects 28 and 30 cells using drag', () => {
      const listingName = "192 Seasonal Property"

      // ensure listing row is visible
      searchPage.searchAndValidate(listingName)

      // wait until cells load for this listing
      cy.findListingRow(listingName).within(() => {
        cy.get('[qa-id*="price-tooltip--"]')
          .should('have.length.greaterThan', 5)
      })

      // use shared helper to drag-select cells
      cy.dragSelectPricingCells(listingName, 9, 10)
    })
  })
})