import multicalenderDSO from '../pageObjects/pages/multicalenderOverride'

describe("Multicalender DSO feature", () => {

  context('Create and validate DSO Overrides', () => {
    beforeEach(() => {
      // home page
      multicalenderDSO.visitHomePage()
    });

    it('Verify the Listing Level override is empty in viewOverides', () => {
      cy.intercept({
        method: 'GET',
        pathname: '/api/get_calendar_data'
      }).as('getCalendarData')
      multicalenderDSO.viewOverridesListing("192 Seasonal Property")
      cy.wait('@getCalendarData')
      multicalenderDSO.validateListingOverridesEmptyState("No Date Specific Overrides")
    })

    it('validate user should not save DSO as empty', () => {
      multicalenderDSO.openAddOverrideModal("192 Seasonal Property")
      multicalenderDSO.validateDSOModal("Date Specific Overrides")
      multicalenderDSO.clickOnAdd()
      multicalenderDSO.validateError(["You need to set at least one custom pricing setting before you add."])
    })

    it('Validating final price should not be saved less tham 10 USD', () => {
      multicalenderDSO.openAddOverrideModal("192 Seasonal Property")
      multicalenderDSO.validateDSOModal("Date Specific Overrides")
      multicalenderDSO.selectDateSingleMonth(26, 30)
      multicalenderDSO.enterfinalprice(1)
      multicalenderDSO.clickOnAdd()
      multicalenderDSO.validateError(['Fixed custom pricing should be greater than 10'])
    })

    it('Validating final price should not be saved less than 10 USD for different months', () => {
      multicalenderDSO.openAddOverrideModal("192 Seasonal Property")
      multicalenderDSO.validateDSOModal("Date Specific Overrides")
      // start date from first visible month, end date from second visible month
      multicalenderDSO.selectDateDifferentMonths('2026-03', 28, '2026-04', 2)
      multicalenderDSO.enterfinalprice(1)
      multicalenderDSO.clickOnAdd()
      multicalenderDSO.validateError(['Fixed custom pricing should be greater than 10'])
    })

    it('Validating DSO updated successfully', () => {

      cy.fixture('mock/listOverrideData.json').then((data) => {
        cy.mockAddCustomPricing()
        cy.fixture('mock/validatingCreatedData').then((mockData) => {
          cy.mockCalendarData(mockData)
          multicalenderDSO.openAddOverrideModal("192 Seasonal Property")
          multicalenderDSO.validateDSOModal("Date Specific Overrides")
          multicalenderDSO.selectDateSingleMonth(27, 30)
          multicalenderDSO.enterfinalprice(100)
          multicalenderDSO.clickOnAdd()
          multicalenderDSO.viewOverridesListing("192 Seasonal Property")
          multicalenderDSO.valiateListheader('Listing Level Overrides')
          cy.wait("@getCalendarData")
          const override = mockData.response.calendar_data[0]
          const price = `${override.price} $`
          multicalenderDSO.validateListingprice(14, 20, price)
        })

      })

    })
  })
})