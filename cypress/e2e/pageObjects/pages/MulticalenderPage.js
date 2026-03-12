import multicalenderLocators from "../locators/multicalenderLocators"
import columnGridLocators from "../locators/columnGridLocators"

class MulticalenderPage {

  visitHomePage(){
    cy.visit('/multicalendar')
  }

  creatingMetrics(text,title){
    cy.get(multicalenderLocators.addMetricsTriggerButton)
      .contains(text)
      .click()

    cy.get(multicalenderLocators.addMetricsTitle)
      .should('contain.text',title)
  }

  clickAddMetrics(){
    cy.get(multicalenderLocators.addMetricsAddButton).click()
  }

  hoverValues(metricText){
    cy.contains(multicalenderLocators.selectMetricRevenuePrefix, metricText)
      .should('be.visible')
      .realMouseDown()
  }

  dragFirstMetricToThirdPosition(){

    const dataTransfer = new DataTransfer()

    cy.get(multicalenderLocators.selectMetricTextPrefix).eq(0)
      .invoke('text')
      .then((metricText)=>{

        expect(metricText.trim()).to.not.be.empty

        cy.get(multicalenderLocators.gripDotsVerticalIcon).eq(0)
          .trigger('mousedown',{ which:1 })
          .trigger('dragstart',{ dataTransfer })

        cy.get(multicalenderLocators.gripDotsVerticalIcon).eq(2)
          .trigger('mousemove')
          .trigger('drop',{ dataTransfer })
          .trigger('mouseup',{ force:true })

        cy.get(multicalenderLocators.selectMetricTextPrefix)
          .eq(2)
          .should('contain',metricText.trim())

      })
  }

  validateDSOModal(){
    cy.get(multicalenderLocators.dsoModalTitle)
      .should('be.visible')
      .and('contain','Date Specific Overrides')
  }

}

export default new MulticalenderPage()