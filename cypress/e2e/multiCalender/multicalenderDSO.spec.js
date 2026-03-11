import multicalenderDSO from '../pageObjects/multicalenderOverride'

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
      multicalenderDSO.viewOverrides("192 Seasonal Property")
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
      multicalenderDSO.selectDateSingleMonth(14, 20)
      multicalenderDSO.enterfinalprice(1)
      multicalenderDSO.clickOnAdd()
      multicalenderDSO.validateError(['Fixed custom pricing should be greater than 10'])
    })
    it('Validating DSO updated successfully', () => {
      cy.intercept("POST", "**/api/add_custom_pricing", {
        statusCode: 200,
        body: {
          message: "SUCCESS",
          response: {
            success: "Your custom prices have been updated."
          },
          status: 200
        }
      }).as("customPricing")

      cy.fixture('validatingCreatedData').then((mockData) => {

        cy.intercept(
          {
            method: 'GET',
            pathname: '/api/get_calendar_data'
          },
          {
            statusCode: 200,
            body: mockData
          }
        ).as('getCalendarData')

        multicalenderDSO.openAddOverrideModal("192 Seasonal Property")

        multicalenderDSO.validateDSOModal("Date Specific Overrides")

        multicalenderDSO.selectDateRange(10, 15)

        multicalenderDSO.enterfinalprice(100)

        multicalenderDSO.clickOnAdd()

        cy.wait("@customPricing")
          .its("request.body")
          .then((body) => {
            expect(body.price).to.eq("100")
            expect(body.priceType).to.eq("fixed")
            expect(body.currency).to.eq("USD")
            expect(body.listingId).to.eq("VRMREALTY___108")
          })

        multicalenderDSO.viewOverrides("192 Seasonal Property")
        cy.wait("@getCalendarData")
        const override = mockData.response.calendar_data[0]
        const startDate = 'March 10, 2026'
        const endDate = 'March 10, 2026'
        const price = `${override.price} $`

        multicalenderDSO.validateListingOverrides(
          startDate,
          endDate,
          price
        )
      })
    })
  })
})