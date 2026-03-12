
import multicalenderOverrideLocators from "../locators/multicalenderOverrideLocators"
import columnGridLocators from "../locators/columnGridLocators"


class multicalenderDSO {

  visitHomePage() {
    cy.visit('/multicalendar')
  }
  viewOverridesListing(listingName) {
    cy.contains('tr', listingName)
      .find(multicalenderOverrideLocators.listingEllipsesVrm108)
      .should('be.visible')
      .click({ force: true })
    cy.get(multicalenderOverrideLocators.dsoViewVrm108).contains('View Overrides')
      .should('be.visible')
      .click()
  }

  validateListingOverridesEmptyState(emptyState) {
    cy.get(multicalenderOverrideLocators.noDso).should('contain.text', emptyState)
  }

  valiateListheader(header) {
    cy.get(multicalenderOverrideLocators.updateRemoveToChildMc)
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
      .find(multicalenderOverrideLocators.listingEllipsesVrm108)
      .click({ force: true })
    cy.get(multicalenderOverrideLocators.dsoAddVrm108)
      .should('be.visible')
      .click()
  }
  validateDSOModal(title) {
    cy.get(multicalenderOverrideLocators.dsoModalTitle)
      .should('be.visible')
      .and('contain', title)
      .scrollIntoView()
  }

  validateError(messages) {
    messages.forEach((msg) => {
      cy.get(multicalenderOverrideLocators.errorToastMessage)
        .should('contain.text', msg)
    })
  }

  clickOnAdd() {
    cy.get(multicalenderOverrideLocators.addDsoButton).click()
  }

  enterfinalprice(price) {
    // cy.contains('Final Price').closest('[qa-id="dso-price"]').should('be.visible').type(100)
    cy.get(multicalenderOverrideLocators.dsoPrice).should('be.visible').type(price)
  }

  enterMinimumPrice(price) {
    cy.get(multicalenderOverrideLocators.dsoMinPrice).should('be.visible').type(price)
  }

  enterMaxprice(price) {
    cy.get(multicalenderOverrideLocators.dsoMaxPrice).should('be.visible').type(price)
  }
  enterBasePrice(price) {
    cy.get(multicalenderOverrideLocators.dsoBasePrice).should('be.visible').type(price)
  }

  selectDateSingleMonth(startDay, endDay) {
    cy.selectDateRangeSameMonth(startDay, endDay)
  }

  openDatePicker() {
    cy.get(multicalenderOverrideLocators.dsoModalDateRangePicker).click()
  }

  // findListingRow(listingName) {
  //   return cy.contains(columnGridLocators.listingRow, listingName).should('be.visible')
  // }

  // dragAcrossPrices(listingName, fromColIndex, toColIndex) {

  //   this.findListingRow(listingName).within(() => {
  //  //   qa-id="price-tooltip--VRMREALTY___108-10"
  //           cy.get(`[qa-id="price-tooltip--VRMREALTY___108-${fromColIndex}"]`).should('be.visible')
  //       .realMouseDown()

  //     cy.get(`[qa-id="price-tooltip--VRMREALTY___108-${toColIndex}"]`)
  //       .realMouseMove()

  //     cy.get(`[qa-id="price-tooltip--VRMREALTY___108-${toColIndex}"]`)
  //       .realMouseUp()

  //   })
  // }

  // verifyDSOModalVisible() {
  //   cy.get(columnGridLocators.modal).should("be.visible")
  // }


}

export default new multicalenderDSO