## PriceLabsAssignment

Cypress automation for the PriceLabs Multicalendar, implemented using a hybrid TDD / data‑driven Page Object Model (POM) with UI and API coverage.

### What I covered

- **UI tests** for the main Multicalendar scenarios (including negative validations).
- **API mocking** where needed so the tests stay stable and predictable.
- **Reusable structure** (kept the code organized as per the requirements).

### Environment setup

- The tests run against the QA app URL.
- Login is done using environment values (so credentials are not hardcoded inside tests).
- You can set values using either:
  - **CLI env** (recommended for CI), or
  - a local **`cypress.env.json`** file (not committed)
- Global hooks and behavior live in:
  - `cypress/support/e2e.js` – imports commands, real‑events, mochawesome reporter, 
  and sets up a `beforeEach` to restore the authenticated session plus global 
  `uncaught:exception` handling.
  - `cypress/support/commands.js` – custom commands for:
    - Session‑based login (`cy.loginSession`)
    - Date‑picker interactions
    - Multicalendar drag‑and‑drop helpers
    - Mocking DSO/tag APIs for deterministic UI tests

### Setup

- Install dependencies:

```bash
npm install
```

### Run tests

- Open Cypress runner:

```bash
npm run cypress:open
```

- Run all tests headless:

```bash
npm run cypress:run
```

- Run tests with HTML report:

```bash
npm run cypress:run:report
```

### 📁 Architecture: POM + Locators + Data‑Driven Fixtures

- **Page Object Model (POM)**
  - `cypress/e2e/pageObjects/pages/*` contains **page classes** such as:
    - `LoginPage` – login workflow
    - `MulticalenderPage` / `multicalenderOverride` – multicalendar metrics and DSO overrides
    - `SearchPage` – listing search
    - `TagPage` – tag management
- **Dedicated Locators Layer**
  - `cypress/e2e/pageObjects/locators/*` holds all selectors:
    - `loginLocators`, `multicalenderLocators`, `multicalenderOverrideLocators`, `searchLocators`, `tagLocators`, `columnGridLocators`.
  - Specs and page classes reference these locators reduces duplication.

- **Data‑Driven Fixtures**
  - All dynamic inputs and payloads are externalized in **fixtures** under `cypress/fixtures`:
    - `fixtures/payloads/*.json` – API payloads for prices/tags/remove pricing.
    - `fixtures/mock/*.json` – mock calendar/override data for UI validation (e.g. DSO creation and final price checks).
  - Specs load fixtures via `cy.fixture(...)` and pass data into page objects or API helpers, keeping test logic declarative and separate from data.

### Hybrid TDD / Data‑Driven POM

- **Hybrid TDD / Data‑Driven POM**
  - Uses **Mocha** structure:
    - `describe` for features (`Multicalender DSO feature`, `Multi Calendar - Tag Management`, API suites).
    - `context` for scenarios/states (e.g. “Create and validate DSO Overrides”).
    - `it` blocks for atomic assertions.
  - Test input values and API payloads live in **fixtures**; page objects and a dedicated locators layer implement the POM.

- **Multicalendar DSO UI Scenarios**
  - Functional:
  - Drag & Drop:
  - End‑to‑End:
    - DSO changes are applied, and the grid/summary values are validated using mock responses to ensure deterministic behavior.
  - Negative:
    - Attempts to save DSO with empty values or invalid/out‑of‑bounds final price assert correct error messages via toast components.

- **API Testing**
  - `cypress/e2e/API/*.cy.js` specs:
  - E2E DSO changes and attempts to save DSO with empty values or invalid/out‑of‑bounds final price 

- **Extra dependencies I added for this assignment**
  - **`cypress-real-events`**: Needed for real user actions like mouse hover / real mouse drag (some UI interactions don’t work reliably with normal Cypress events).
  - **`@4tw/cypress-drag-drop`**: Used to make drag-and-drop actions easier to write and more stable.
  - **`cypress-mochawesome-reporter`**: Used to generate a simple HTML report after the test run.

- **UI Components Coverage**
  - Tests interact with:
    - **Modals** (DSO modal, metrics modal).
    - **DatePickers** (React date picker via custom commands).
    - **Search Inputs** (listing search).
    - **Tooltips** (pricing tooltip grid cells).
    - **Data Grids / Tables** (multicalendar listings and overrides tables).

- **Reporting**
  - **Mochawesome reporter** integrated via:
    - `cypress.config.js` (`reporter: 'cypress-mochawesome-reporter'` and options).
    - `cypress/support/e2e.js` (`import 'cypress-mochawesome-reporter/register'`).
  - Headless runs (`npm run cypress:run:report`) generate combined HTML/JSON reports with embedded screenshots on failure.

