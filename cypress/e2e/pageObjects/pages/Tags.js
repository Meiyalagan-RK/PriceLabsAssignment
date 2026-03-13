import tagLocators from "../locators/tagLocators"

class TagPage {

  visitHomePage() {
    cy.visit('/multicalendar')
  }

  enableTagsColumn() {

    cy.get(tagLocators.columnVisibilityButton).click()
    cy.get(tagLocators.tagsCheckbox).click()
    cy.get(tagLocators.columnVisibilityButton).click()

  }

  getRow(listingName) {

    cy.contains('tr', listingName)
      .as('row')

  }

  addTag(tagName) {

    cy.get('@row')
      .find(tagLocators.addTagButton)
      .click()

    cy.get(tagLocators.tagInput)
      .should('be.visible')
      .clear()
      .type(tagName)

    cy.get(tagLocators.saveTagButton)
      .click()

  }

  addAndValidateTag(listingName, tagName) {

    this.getRow(listingName)
    this.addTag(tagName)

  }

  deleteTag(listingName, listingId) {

    this.getRow(listingName)

    cy.get('@row')
      .find(`[id="tag-${listingId}-a-delete"]`)
      .click()

  }

  validateError(messages) {

    messages.forEach((msg) => {

      cy.get(tagLocators.errorToast)
        .should('contain.text', msg)

    })

  }

  validateToast(message) {

    cy.get(tagLocators.successToast)
      .should('contain.text', message)

  }

}

export default new TagPage()