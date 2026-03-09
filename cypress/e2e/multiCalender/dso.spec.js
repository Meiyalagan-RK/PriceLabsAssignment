import MulticalenderPage from '../pageObjects/MulticalenderPage';

describe("DSO Date Selection", () => {

beforeEach(() => {
        // Login and navigate to homepage
    MulticalenderPage.visitHomePage()
    });

  it('should open DSO modal and choose March 2026', () => {

    multiCalendarPage.openListingEllipsis()

    multiCalendarPage.clickAddDSO()

    multiCalendarPage.validateDSOModal()

    multiCalendarPage.openDatePicker()

    cy.selectDateRange("2026-03", 10, 12)

  })

})