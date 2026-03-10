import searchPage from "../pageObjects/search"

describe("Search feature", () => {

    it("Validate the search functionality", () => {
        searchPage.visitHomePage()
        searchPage.searchAndValidate("192 Seasonal Property")
    })

})