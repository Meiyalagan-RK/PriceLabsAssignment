import multicalenderDSO from '../pageObjects/pages/multicalenderOverride'
import searchPage from '../pageObjects/pages/search'

describe("Multicalender DSO feature", () => {

  context('Create and validate DSO Overrides', () => {
    beforeEach(() => {
      // home page
      multicalenderDSO.visitHomePage()
    });

    it('selects 28 and 30 cells using drag', () => {

        // ensure listing row is visible
        searchPage.searchAndValidate("192 Seasonal Property")
      
        cy.contains('tr', '192 Seasonal Property', { timeout: 10000 })
          .should('be.visible')
          .within(() => {
      
            // wait until cells load
            cy.get('[qa-id*="price-tooltip--"]', { timeout: 10000 })
              .should('have.length.greaterThan', 5)
      
            // get start cell again (fresh query)
            // start drag
            cy.get('[qa-id="price-tooltip--VRMREALTY___108-9"]')
            .scrollIntoView()
            .should('be.visible')
              .trigger('mousedown', { button: 0, force: true })
      
            // get end cell separately (fresh DOM query)
            cy.get('[qa-id="price-tooltip--VRMREALTY___108-10"]')
              .scrollIntoView()
              .should('be.visible')
              .trigger('mousemove', { button: 0, force: true })
      
            // release mouse
            cy.get('[qa-id="price-tooltip--VRMREALTY___108-10"]')
              .trigger('mouseup', { force: true })
      
          })
      })
    
  })
})