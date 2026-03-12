
class multicalenderDSO {

  visitHomePage() {
    cy.visit('/multicalendar')
  }
  viewOverridesListing(listingName) {
    cy.contains('tr', listingName)
      .find('[qa-id="listing-ellipses-VRMREALTY___108"]')
      .should('be.visible')
      .click({ force: true })
    cy.get('[qa-id="dso-view-VRMREALTY___108"]').contains('View Overrides')
      .should('be.visible')
      .click()
  }

  validateListingOverridesEmptyState(emptyState) {
    cy.get('[qa-id="no-dso"]').should('contain.text', emptyState)
  }

  valiateListheader(header) {
    cy.get('[qa-id="update-remove-to-child-mc"]')
      .should('contain.text', header)
  }

  validateListingprice(startDate, endDate, price) {
    cy.contains('tbody tr', startDate)
      .should('be.visible')
      .within(() => {
        cy.get('td').eq(0).should('contain', startDate)
        cy.get('td').eq(1).should('contain', endDate)
        cy.get('td').eq(2).should('contain', price)
      })

  }

  openAddOverrideModal(listingName) {
    cy.get('tbody')
      .contains('tr', listingName)
      .find('[qa-id="listing-ellipses-VRMREALTY___108"]')
      .click({ force: true })
    cy.get('[qa-id="dso-add-VRMREALTY___108"]')
      .should('be.visible')
      .click()
  }
  validateDSOModal(title) {
    cy.get('[qa-id="dso-modal-title"]')
      .should('be.visible')
      .and('contain', title)
      .scrollIntoView()
  }

  validateError(messages) {
    messages.forEach((msg) => {
      cy.get('[data-status="error"] p')
        .should('contain.text', msg)
    })
  }

  clickOnAdd() {
    cy.get('[qa-id="add-dso-button"]').click()
  }

  enterfinalprice(price) {
    // cy.contains('Final Price').closest('[qa-id="dso-price"]').should('be.visible').type(100)
    cy.get('[qa-id="dso-price"]').should('be.visible').type(price)
  }

  enterMinimumPrice(price) {
    cy.get('[qa-id="dso-min-price"]').should('be.visible').type(price)
  }

  enterMaxprice(price) {
    cy.get('[qa-id="dso-max-price"]').should('be.visible').type(price)
  }
  enterBasePrice(price) {
    cy.get('[qa-id="dso-base-price"]').should('be.visible').type(price)
  }

  selectDateSingleMonth(startDay, endDay) {
    cy.selectDateRangeSameMonth(startDay, endDay)
  }

  openDatePicker() {
    cy.get('[qa-id="dso-modal-date-range-picker"]').click()
  }


}

export default new multicalenderDSO