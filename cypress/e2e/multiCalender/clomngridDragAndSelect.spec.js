import multicalenderPage from "../pageObjects/MulticalenderPage";


describe('', () => {
    context('', () => {

        it('validate the drag and drop across prices', () => {
            multicalenderPage.visitHomePage()
            const startIndex = 12
            const endIndex = 14

            cy.get('tbody')
                .contains('tr', '192 Seasonal Property')
                .as('row')
            cy.get('@row')
                .find(`[qa-id="price-tooltip--VRMREALTY___108-${startIndex}"]`)
                .trigger('mousedown', { button: 0 })
            cy.get('@row')
                .find(`[qa-id="price-tooltip--VRMREALTY___108-${endIndex}"]`)
                .trigger('mousemove')
                .trigger('mouseup', { force: true })

        })



    })
})