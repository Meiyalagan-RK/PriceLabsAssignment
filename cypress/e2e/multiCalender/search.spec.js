import searchPage from "../pageObjects/search"

describe("Search feature Home Page", () => {
    

context('Validate the List search functionality in home ga',()=>{
    it("Validate the list search with name", () => {
        searchPage.visitHomePage()
        searchPage.searchAndValidate("192 Seasonal Property")
    })
})


})