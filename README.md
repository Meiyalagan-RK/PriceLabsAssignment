## PriceLabsAssignment

Cypress automation for the PriceLabs Multicalendar, implemented using a hybrid TDD / data‑driven Page Object Model (POM) with UI and API coverage.

### 🛠️ Setup & Requirements

- **Node.js**: v16+ (LTS recommended) and **npm**.
- **Clone** this repository and navigate to the root:
```

- **Install dependencies**:

```bash
npm install
```

### How to Run the Tests

- **Open Cypress runner (interactive UI)**:

```bash
npm run cypress:open
```

- **Run all specs headless (CI‑style)**:

```bash
npm run cypress:run
```

- **Run with Mochawesome reporting** (HTML + JSON reports under `cypress/reports`):

```bash
npm run cypress:run:report
```

Screenshots and videos on failure are captured by Cypress, and the **`cypress-mochawesome-reporter`** plugin aggregates results into a single HTML report.

### 🌐 Environment & Configuration

- **Base URL (QA environment)** is configured in `cypress.config.js`:
  - `baseUrl`: `https://app.pricelabs.co`
  - `env.loginUrl`: `https://pricelabs.co/signin`
- **Credentials** for the demo account are configured via `Cypress.env` in `cypress.config.js` and used by the `loginSession` custom command.
- Global hooks and behavior live in:
  - `cypress/support/e2e.js` – imports commands, real‑events, mochawesome reporter, and sets up a `beforeEach` to restore the authenticated session plus global `uncaught:exception` handling.
  - `cypress/support/commands.js` – custom commands for:
    - Session‑based login (`cy.loginSession`)
    - Date‑picker interactions
    - Multicalendar drag‑and‑drop helpers
    - Mocking DSO/tag APIs for deterministic UI tests

You can override sensitive values locally using `cypress.env.json` (not committed) or CLI env variables

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
  - Specs and page classes reference these locators instead of inlining raw CSS/XPath, which keeps selectors centralized and reduces duplication.

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

- **Wait‑for‑Settle / Flake Avoidance**
  - Uses `cy.intercept().as(...)` with `cy.wait('@alias')` to wait for network calls.
  - **No `cy.wait(number)`** is used.

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

