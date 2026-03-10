import { empty } from "rxjs"

class multicalenderDSO { 
 
    // 
viewOverrides(listingName){
    cy.contains('tr', listingName)
    .find('[qa-id="listing-ellipses-VRMREALTY___108"]')
    .should('be.visible')
    .click({force:true})
    cy.get('[qa-id="dso-view-VRMREALTY___108"]')
    .should('be.visible')
    .click()
}

validateListingOverridesEmptyState(emptyState){
    cy.get('[qa-id="no-dso"]').should('contain.text',emptyState)
}

validateListingOverrides(startDate, endDate, price){

  cy.get('[qa-id="update-remove-to-child-mc"]')
    .should('contain.text','Listing Level Overrides')

  cy.contains('tbody tr', startDate)
    .should('be.visible')
    .within(()=>{
      cy.get('td').eq(0).should('contain', startDate)
      cy.get('td').eq(1).should('contain', endDate)
      cy.get('td').eq(2).should('contain', price)
    })

}

openAddOverrideModal(listingName){
  cy.contains('tr', listingName)
    .find('[qa-id="listing-ellipses-VRMREALTY___108"]')
    .should('be.visible')
    .click({force:true})
  cy.get('[qa-id="dso-add-VRMREALTY___108"]')
    .should('be.visible')
    .click()
}
validateDSOModal(title){
    cy.get('[qa-id="dso-modal-title"]')
      .should('be.visible')
      .and('contain', title)
      .scrollIntoView()
  }

validateError(messages){
  messages.forEach((msg)=>{
    cy.get('[data-status="error"] p')
      .should('contain.text', msg)
  })
}

  clickOnAdd(){
    cy.get('[qa-id="add-dso-button"]').click()
  }

  enterfinalprice(price){
    // cy.contains('Final Price').closest('[qa-id="dso-price"]').should('be.visible').type(100)
    cy.get('[qa-id="dso-price"]').should('be.visible').type(price)
  }

  enterMinimumPrice(price){
    cy.get('[qa-id="dso-min-price"]').should('be.visible').type(price)
  }

  enterMaxprice(price){
    cy.get('[qa-id="dso-max-price"]').should('be.visible').type(price)
  }
  enterBasePrice(price){
    cy.get('[qa-id="dso-base-price"]').should('be.visible').type(price)
  }


  // multicalenderDSO.selectDateRange(10, 15)
    // Start → Mar 10
    // End   → Mar 15

selectDateRange(startDay, endDay){
    cy.get('[qa-id="dso-modal-date-range-picker"] [qa-id="date-picker-calendar-start"]').click()
    cy.get('.react-datepicker__month-container')
     .first()
     .within(()=>{

    cy.get(`.react-datepicker__day--${String(startDay).padStart(3,'0')}`)
      .click()

    cy.get(`.react-datepicker__day--${String(endDay).padStart(3,'0')}`)
      .click()

  })
    cy.get('[qa-id="dso-modal-date-range-picker"] [qa-id="date-picker-calendar-start"]')
      .invoke('text')
      .should('include', 'Mar 10')
    cy.get('[qa-id="dso-modal-date-range-picker"] [qa-id="date-picker-calendar-end"]')
      .invoke('text')
     .should('include', 'Mar 15')
}


}

export default new multicalenderDSO