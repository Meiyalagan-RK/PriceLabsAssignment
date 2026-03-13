// This suite tests creating and updating custom prices for a DSO listing
describe('Update Custom Prices API Test', () => {

  // Common endpoints for creating prices and reading calendar data
  const endpoint = 'https://app.pricelabs.co/api/add_custom_pricing'
  const getEndpoint = 'https://app.pricelabs.co/api/get_calendar_data'
  let payloads

  before(() => {
    // Load all price update payloads once and reuse across tests
    cy.fixture('payloads/priceUpdate').then((data) => {
      payloads = data
    })
  })

  // Helper to send POST request to add/update custom pricing
  const sendRequest = (payload, headers = {}) => {
    return cy.request({
      method: 'POST',
      url: endpoint,
      headers,
      body: {
        ...payload,
        cacheBuster: Date.now()
      },
      failOnStatusCode: false
    })
  }

  // Helper to call calendar API and verify what is stored on server
  const getCalendarRequest = (query) => {
    return cy.request({
      method: 'GET',
      url: getEndpoint,
      qs: query,
      failOnStatusCode: false
    })
  }

  // Reusable success validation: checks common SUCCESS response shape
  const validateSuccess = (response) => {
    expect(response.status).to.eq(200)
    expect(response.body.message).to.eq('SUCCESS')
    expect(response.body.status).to.eq(200)
    expect(response.body.response.success)
      .to.eq('Your custom prices have been updated.')
  }

  context('Custom Price API validations', () => {

    it('Validate creating custom prices for a listing', () => {

      const createPayload = payloads.createPrice

      sendRequest(createPayload)
        .then(validateSuccess)
        .then(() => {
          const { query, expected } = payloads.getCalendarForDso

          const qs = {
            ...query,
            a: Date.now()
          }

          return getCalendarRequest(qs).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('SUCCESS')

            const calendarData = response.body.response.calendar_data
            expect(calendarData).to.be.an('array').and.to.have.length.greaterThan(0)

            const firstEntry = calendarData[0]

            // basic identifiers
            expect(firstEntry.listing_id).to.eq(expected.listing_id)
            expect(firstEntry.pms_name).to.eq(expected.pms_name)
            expect(firstEntry.parent_key).to.eq(expected.parent_key)

            // price fields
            expect(firstEntry.price).to.eq(expected.price)
            expect(firstEntry.base_price).to.eq(expected.base_price)
            expect(firstEntry.min_price).to.eq(expected.min_price)
            expect(firstEntry.max_price).to.eq(expected.max_price)

            // date range
            expect(firstEntry.start_date).to.eq(expected.start_date)
            expect(firstEntry.end_date).to.eq(expected.end_date)
          })
        })

    })


    it('Validate updating custom prices for a listing', () => {

      sendRequest(payloads.updatePrice)
        .then(validateSuccess)

    })


    it('Validate empty pricing update custom prices for a listing', () => {

      sendRequest(payloads.emptyPriceUpdate)
        .then(validateSuccess)

    })


    it('Validate request with expired/invalid auth token', () => {

      cy.clearCookies()
      cy.clearLocalStorage()

      sendRequest(
        payloads.updatePrice,
        {
          Authorization: 'Bearer invalid_token_123',
          Cookie: ''
        }
      ).then((response) => {

        expect(response.status).to.eq(200)

        const res = response.body.response

        expect(res.error_code).to.eq('ERR-403-NS')
        expect(res.message)
          .to.eq('Unauthorized Access. Please sign out and sign back in.')

      })

    })

  })

})