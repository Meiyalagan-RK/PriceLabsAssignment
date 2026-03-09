
import multicalenderPage from "../pageObjects/MulticalenderPage";

describe('Testing multicalender features', () => {
  before(()=>{
  cy.loginSession('qa.pricelabs@gmail.com','qg33N$yxJP')
})

it('validating metric creation', () => {
multicalenderPage.visitHomePage()
multicalenderPage.creatingMetrics('Add Metrics','Select Metrics')
multicalenderPage.clickAddMetrics()
multicalenderPage.hoverValues('Total Revenue')
});

it('Validate the metric should move first metric to 3rd position - drag and drop assertion', () => {
  multicalenderPage.visitHomePage()
  multicalenderPage.creatingMetrics('Add Metrics','Select Metrics')
  multicalenderPage.dragFirstMetricToThirdPosition()
})

it('Validate creating tags added from the row',()=>{
multicalenderPage.visitHomePage()
multicalenderPage.addAndValidateTag(
  "Copy of Sandeep Test Property",
  "automation",
)
multicalenderPage.validateToast('Tags have been updated!')
})
it('Verify tags should not be added with same name again',()=>{
  multicalenderPage.visitHomePage()
  multicalenderPage.addAndValidateTag(
  "Copy of Sandeep Test Property",
  "automation",
)
cy.get('[data-status="error"]').should('contain.text','Tag already exists')
})
it('Verfy tag is deleted',()=>{
cy.get('[data-status="error"]').should('contain.text','Tag already exists')
})
});




