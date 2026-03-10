class MulticalenderPage {

  visitHomePage(){
    cy.visit('/multicalendar')
  }

  creatingMetrics(text,title){
    cy.get('[qa-id="mc-add-metrics-btn-v2"] [qa-id="add-metrics-trigger-btn"]')
      .contains(text)
      .click()

    cy.get('[qa-id="add-metrics-title"]')
      .should('contain.text',title)
  }

  clickAddMetrics(){
    cy.get('[qa-id="add-metrics-add-btn"]').click()
  }

  hoverValues(metricText){
    cy.contains('[qa-id^="select-metric-revenue-"]', metricText)
      .should('be.visible')
      .realMouseDown()
  }

  dragFirstMetricToThirdPosition(){

    const dataTransfer = new DataTransfer()

    cy.get('[qa-id^="select-metric-text-"]').eq(0)
      .invoke('text')
      .then((metricText)=>{

        expect(metricText.trim()).to.not.be.empty

        cy.get('[data-icon="grip-dots-vertical"]').eq(0)
          .trigger('mousedown',{ which:1 })
          .trigger('dragstart',{ dataTransfer })

        cy.get('[data-icon="grip-dots-vertical"]').eq(2)
          .trigger('mousemove')
          .trigger('drop',{ dataTransfer })
          .trigger('mouseup',{ force:true })

        cy.get('[qa-id^="select-metric-text-"]')
          .eq(2)
          .should('contain',metricText.trim())

      })
  }

  validateDSOModal(){
    cy.get('[qa-id="dso-modal-title"]')
      .should('be.visible')
      .and('contain','Date Specific Overrides')
  }

}

export default new MulticalenderPage()