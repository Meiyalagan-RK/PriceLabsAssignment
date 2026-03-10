class TagPage {

  visitHomePage() {
    cy.visit('/multicalendar')
  }

  enableTagsColumn() {
    cy.get('[qa-id="pd-row-coloumn-visibility"]').click()
    cy.get('[qa-id="tags-checkbox"]').click()
    cy.get('[qa-id="pd-row-coloumn-visibility"]').click()
  }

  addAndValidateTag(listingName, tagName) {

    cy.contains('tr', listingName)
      .as('row')

    this.clickAndAddTag(tagName)

  }

  clickAndAddTag(tagName) {

    cy.get('@row')
      .find('[qa-id^="add-tag-"]')
      .click()

    cy.get('[qa-id^="tag-name-input-"]')
      .should('be.visible')
      .clear()
      .type(tagName)

    cy.get('[qa-id^="save-tag-"]').click()

  }

  clickOnAddTagIcon(tagName) {

    cy.get('@row')
      .find('[qa-id^="add-tag-"]')
      .click()

    cy.get('[qa-id^="tag-name-input-"]')
      .clear()
      .type(tagName)

    cy.get('[qa-id^="save-tag-"]').click()

  }

  deleteTag(listingName, listingId) {

    cy.contains('tr', listingName)
      .as('row')

    cy.get('@row')
      .find(`[id="tag-${listingId}-a-delete"]`)
      .click()

  }

  validateError(messages) {

    messages.forEach((msg) => {

      cy.get('[data-status="error"] p')
        .should('contain.text', msg)

    })

  }

  validateToast(message) {

    cy.get('[data-status="success"]')
      .should('contain.text', message)

  }

}

export default new TagPage()