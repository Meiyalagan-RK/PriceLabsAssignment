import LoginPage from "../e2e/pageObjects/pages/LoginPage";
import columnGridLocators from "../e2e/pageObjects/locators/columnGridLocators";

const loginPage = new LoginPage();

Cypress.Commands.add("loginSession", (username, password) => {
  cy.session(
    [username, password],
    () => {
      loginPage.visitLogin();
      loginPage.enterEmail(username);
      loginPage.enterPassword(password);
      loginPage.clickRemember();
      loginPage.clickLogin();
      loginPage.verifyLogin();
    },
    {
      cacheAcrossSpecs: true // keep session state when running multiple spec files
    }
  );
});


// multicalenderDSO.selectDateSingleMonth(14, 20)
Cypress.Commands.add("selectDateRangeSameMonth", (startDay, endDay) => {
  // open start date picker 
  cy.get('[qa-id="dso-modal-date-range-picker"] [qa-id="date-picker-calendar-start"]')
    .scrollIntoView()
    .click({ force: true });

  cy.get('.react-datepicker').should('be.visible');

  cy.get('.react-datepicker__month')
    .first()
    .within(() => {
      [startDay, endDay].forEach((day) => {
        cy.contains('.react-datepicker__day', new RegExp(`^${day}$`))
          .not('.react-datepicker__day--outside-month')
          .not('.react-datepicker__day--disabled') // prevents selecting past dates
          .click({ force: true });
      });
    });
});

Cypress.Commands.add("selectDateRangeDifferentMonths", (startMonth, startDay, endMonth, endDay) => {
  // open start date picker 
  cy.get('[qa-id="dso-modal-date-range-picker"] [qa-id="date-picker-calendar-start"]')
    .scrollIntoView()
    .click({ force: true });

  cy.get('.react-datepicker').should('be.visible');

  // select start date from the first (start) month
  cy.get('.react-datepicker__month')
    .first()
    .within(() => {
      cy.contains('.react-datepicker__day', new RegExp(`^${startDay}$`))
        .not('.react-datepicker__day--outside-month')
        .not('.react-datepicker__day--disabled') // prevents selecting past dates
        .click({ force: true });
    });

  // select end date from the last (end) month
  cy.get('.react-datepicker__month')
    .last()
    .within(() => {
      cy.contains('.react-datepicker__day', new RegExp(`^${endDay}$`))
        .not('.react-datepicker__day--outside-month')
        .not('.react-datepicker__day--disabled') // prevents selecting past dates
        .click({ force: true });
    });
});

Cypress.Commands.add('mockBulkUpdateTags', (data) => {
  cy.intercept('POST', '**/api/bulk_update_tags*', (req) => {
    expect(req.body.rowData[0].listing_id).to.eq(data.listingId);
    expect(req.body.rowData[0].tags).to.eq(data.tag);

    req.reply({
      statusCode: 200,
      body: {
        message: "SUCCESS",
        response: {
          mapped: [],
          unmapped: [
            {
              listing_id: data.listingId,
              pms_name: data.pmsName,
              unique_id: `${data.listingId}___${data.pmsName}`,
              taglist: null,
              tags: data.tag
            }
          ],
          failure: []
        }
      }
    });
  }).as('bulkUpdateTags');
});

Cypress.Commands.add("mockAddCustomPricing", () => {
  cy.intercept("POST", "**/api/add_custom_pricing", {
    statusCode: 200,
    body: {
      message: "SUCCESS",
      response: {
        success: "Your custom prices have been updated."
      },
      status: 200
    }
  }).as("customPricing");
});

Cypress.Commands.add("mockCalendarData", (mockData) => {
  cy.intercept(
    {
      method: "GET",
      pathname: "/api/get_calendar_data"
    },
    {
      statusCode: 200,
      body: mockData
    }
  ).as("getCalendarData");
});

Cypress.Commands.add('findListingRow', (listingName) => {
  return cy.contains(columnGridLocators.listingRow, listingName).should('be.visible');
});

Cypress.Commands.add('clickPricingCell', (listingName, colIndex) => {
  cy.findListingRow(listingName).within(() => {
    cy.get(`${columnGridLocators.pricingCellPrefix}[qa-id$="-${colIndex}"]`)
      .should('be.visible')
      .click();
  });
});

Cypress.Commands.add('dragSelectPricingCells', (listingName, fromColIndex, toColIndex) => {
  cy.findListingRow(listingName).within(() => {
    cy.get(`${columnGridLocators.pricingCellPrefix}[qa-id$="-${fromColIndex}"]`)
      .should('be.visible')
      .then(($startCell) => {
        cy.get(`${columnGridLocators.pricingCellPrefix}[qa-id$="-${toColIndex}"]`)
          .should('be.visible')
          .then(($endCell) => {
            const startRect = $startCell[0].getBoundingClientRect();
            const endRect = $endCell[0].getBoundingClientRect();

            const startX = startRect.left + startRect.width / 2;
            const startY = startRect.top + startRect.height / 2;
            const endX = endRect.left + endRect.width / 2;
            const endY = endRect.top + endRect.height / 2;

            const steps = Math.abs(toColIndex - fromColIndex);

            cy.wrap($startCell).trigger('mousedown', {
              button: 0,
              clientX: startX,
              clientY: startY,
              force: true
            });

            for (let i = 1; i <= steps; i++) {
              const progress = i / steps;
              const currentX = startX + (endX - startX) * progress;
              const currentY = startY + (endY - startY) * progress;

              cy.wrap($startCell).trigger('mousemove', {
                button: 0,
                clientX: currentX,
                clientY: currentY,
                force: true
              });
            }

            cy.wrap($endCell).trigger('mouseup', {
              button: 0,
              clientX: endX,
              clientY: endY,
              force: true
            });
          });
      });
  });
});
