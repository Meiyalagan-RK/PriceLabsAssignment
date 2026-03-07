# PriceLabsAssignment
Cypress automation with Page Object Model (POM)

## 🛠️ Setup & Requirements
1. **Node.js** (v14+, LTS recommended) and **npm** installed on your system.
2. Clone or download this repository.
3. Open a terminal and navigate to the project root:
   ```bash
   cd /path/to/PriceLabsAssignment
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. (Optional) install any additional reporters or helpers, for example:
   ```bash
   npm install cypress-mochawesome-reporter --save-dev
   ```
6. You can use npm scripts defined in `package.json`:
   ```bash
   npm run cypress:open    # opens interactive runner
   npm run cypress:run     # runs all specs headless
   ```
   or invoke Cypress directly:
   ```bash
   npx cypress open
   ```
   or run headless tests:
   ```bash
   npx cypress run
   ```

## 📁 Page Object Model (POM)
The POM pattern encourages separation of test code and page-specific interactions. Each page class exports methods to interact with elements, making tests easier to read and maintain.
