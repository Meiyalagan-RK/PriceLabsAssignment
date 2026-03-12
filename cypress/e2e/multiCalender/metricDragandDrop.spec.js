
import multicalenderPage from "../pageObjects/pages/MulticalenderPage";

describe('Testing multicalender features', () => {

  it('Validate the metric should move first metric to 3rd position - drag and drop assertion', () => {
    multicalenderPage.visitHomePage()
    multicalenderPage.creatingMetrics('Add Metrics', 'Select Metrics')
    multicalenderPage.dragFirstMetricToThirdPosition()
  })
});




