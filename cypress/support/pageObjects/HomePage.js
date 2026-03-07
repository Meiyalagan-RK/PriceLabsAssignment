class HomePage {
  getSearchInput() {
    return cy.get('#search');
  }

  search(term) {
    this.getSearchInput().type(term);
    cy.get('button[type=submit]').click();
  }
}

export default new HomePage();
