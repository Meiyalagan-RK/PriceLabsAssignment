class MulticalenderPage {
  // Add metric feature
  visitHomePage(){
    cy.visit('/multicalendar')
  }
  creatingMetrics(text,title){
    cy.get('[qa-id="mc-add-metrics-btn-v2"] [qa-id="add-metrics-trigger-btn"]').contains(text).click()
    cy.get('[qa-id="add-metrics-title"]').should('contain.text',title)
  }
  // click on +add Metrics button
  clickAddMetrics(){
        cy.get('[qa-id="add-metrics-add-btn"]').click()
  }

  hoverValues(metricText){
        // use realHover (or realMouseDown) from cypress-real-events plugin
    // find any revenue metric that contains the provided text
    cy.contains('[qa-id^="select-metric-revenue-"]', metricText)
      .should('be.visible')
      .realMouseDown();
  }

  dragFirstMetricToThirdPosition(){
    const dataTransfer = new DataTransfer();
    // Capture first metric text
    cy.get('[qa-id^="select-metric-text-"]').eq(0)
      .invoke('text')
      .then((metricText) => {
        // verify initial position
        expect(metricText.trim()).to.not.be.empty;
        // Drag first element → position 3
        cy.get('[data-icon="grip-dots-vertical"]').eq(0)
          .trigger('mousedown', { which: 1 })
          .trigger('dragstart', { dataTransfer });
        cy.get('[data-icon="grip-dots-vertical"]').eq(2)
          .trigger('mousemove')
          .trigger('drop', { dataTransfer })
          .trigger('mouseup', { force: true });
        // Verify new order
        cy.get('[qa-id^="select-metric-text-"]')
          .eq(2)
          .should('contain', metricText.trim());
      });
  }
//   'Here are several ideas for negative test cases you can write for the "Filter Listings" modal, leveraging the input#multi-select-search and other elements identified:

// Invalid or Non-existent Search Input (for tags):
// Scenario: Type a tag name into input#multi-select-search that does not exist in the available options (e.g., "nonexistenttag").
// Expected Outcome: The list of checkboxes should be empty or display a "No results found" message. No tag should be selectable.
// Follow-up: Attempt to "Apply Filter" with no tags selected after an invalid search. The filter should not be applied, or a relevant error/warning should appear.
// Special Characters/Malicious Input in Search:
// Scenario: Type special characters (e.g., !@#$%^&*()) or potential injection strings (e.g., ' OR '1'='1) into input#multi-select-search.
// Expected Outcome: The system should handle these inputs gracefully without crashing, displaying errors, or allowing unintended actions. The search should either yield no results or escape the characters properly.
// Applying Filter with No Selections:
// Scenario: Open the modal, make no selections in any dropdown or checkboxes, and immediately click "Apply Filter".
// Expected Outcome: The filter should either not be applied (i.e., the original list remains unchanged) or a message should inform the user that no filters were selected.
// Leaving Required Fields Empty (if applicable):
// Scenario: If there are any implicitly or explicitly required fields (e.g., if "Tags" dropdown needs a selection to make the search meaningful), test leaving them unselected.
// Expected Outcome: The system should prevent filter application or provide validation feedback.
// Interacting with Disabled Elements:
// Scenario: If certain elements (e.g., "Apply Filter" button) are disabled until a valid selection is made, try to interact with them programmatically or simulate disabled states.
// Expected Outcome: The interaction should be prevented, and no unintended action should occur.
// Clearing Filters After Partial Selection:
// Scenario: Select some tags, then click the "Clear Filter" button.
// Expected Outcome: All selections should be cleared, and the modal should revert to its initial state.
// Canceling After Partial Selection:
// Scenario: Select some tags, then click the "Cancel" button.
// Expected Outcome: The modal should close, and none of the selections should be applied to the main listings. The original state of the listings should be preserved.
// Multiple "Add Another Tag Filter" Rows (Edge Case):
// Scenario: Continuously click "Add Another Tag Filter" many times (e.g., 10-20 times) to see how the UI and performance handle numerous filter rows.
// Expected Outcome: The UI should remain responsive, and new rows should be added without layout issues. There might be a reasonable limit to how many can be added, and the system should handle exceeding that limit gracefully.
// Removing All Filter Rows:
// Scenario: Add multiple filter rows, then remove all of them using the trash can icon.
// Expected Outcome: The modal should return to its initial state with a single, empty filter row (or no rows if that's the default).
// State Persistence on Modal Re-opening (if applicable):
// Scenario: Select some filters, close the modal via the 'X' button or "Cancel," then re-open it.
// Expected Outcome: The modal should open with its default state (no filters applied from the previous session), assuming filters are only applied upon clicking "Apply Filter". If the modal is designed to remember temporary selections, then it should correctly display them.
// Browser Navigation during Modal Open:
// Scenario: While the modal is open, try using the browser's back/forward buttons or refreshing the page.
// Expected Outcome: The modal should ideally close, and the page should navigate/refresh as expected without errors.
// These test cases will help ensure the robustness and user-friendliness of your filter modal.'

  ValidateFilters(){
    cy.get('[qa-id="filter-listings-button"]').should('contain','Filters')
    cy.get('[qa-id="filters-drawer-header-text"]').should('contain.text','Filter Listings')
    // qa-id="filters-drawer-body-text"
    // qa-id="listing-filter-select-dropdown"
    // qa-id="filter-by-listing-info-header"
    // qa-id="filter-dropdown-opt-tags"
    // qa-id="filter-dropdown-tags-0"
    //qa-id="multi-select-search"
    // class="chakra-text css-1yd1q2x"
    // qa-id="clear-search"
    // qa-id="multi-select-option-checkbox"
    // qa-id="3 Selected"
    // qa-id="mc-listing-filter-show-listings"
    // qa-id="pd-row-coloumn-visibility"
  }

 // Validate tags added

 // Copy of Sandeep Test Property
 // data-syncing="undefined"
 // qa-id="add-tag-VRMREALTY___239"
 // qa-id="tag-name-input-VRMREALTY___239___vrm"
 // qa-id="save-tag-VRMREALTY___239___vrm"
 // qa-id="tag-VRMREALTY___239-price"

 validateToast(message) {
  cy.get('[data-status="success"]')
    .should('contain.text', message)
}

addAndValidateTag(listingName, tagName, toast) {
cy.get('[qa-id="pd-row-coloumn-visibility"]').click()
cy.get('[qa-id="tags-checkbox"]').click()
cy.get('[qa-id="pd-row-coloumn-visibility"]').click()
  cy.contains(listingName)
    .closest('[data-index="2"]')
    .as('row')
  cy.get('@row').within(()=>{
    cy.get('[qa-id="add-tag-VRMREALTY___239"]').click()
  })
  cy.get('[qa-id="tag-name-input-VRMREALTY___239___vrm"]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type(tagName)
  cy.get('[qa-id="save-tag-VRMREALTY___239___vrm"]').click()
// 
}

deleteAndValidateTag(tagName) {
  // Assert the tag exists before deletion
  cy.get(`[qa-id="tag-VRMREALTY___239-${tagName}"]`)
    .should('be.visible')
    .should('contain.text', tagName)
  
  // Click the delete button for the tag
  cy.get(`[qa-id="delete-tag-VRMREALTY___239-${tagName}"]`)
    .should('be.visible')
    .click()
  
  // Validate success toast message
  cy.get('[data-status="success"]')
    .should('be.visible')
    .should('contain.text', 'Tag removed successfully')
}

  openListingEllipsis() {

    cy.get('tr[data-index="1"] [qa-id^="listing-ellipses"]')
      .should('be.visible')
      .click()

  }

  clickAddDSO() {

    cy.get('[qa-id^="dso-add"]')
      .should('be.visible')
      .click()

  }

  validateDSOModal() {

    cy.get('[qa-id="dso-modal-title"]')
      .should('be.visible')
      .and('contain', 'Date Specific Overrides')

  }

  openDatePicker() {

    cy.get('[qa-id="dso-modal-date-range-picker"]').click()

    cy.get('[qa-id="date-picker-default-range"]').click()

  }
}

export default new MulticalenderPage();
