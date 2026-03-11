describe('Update Custom Prices API Test', () => {

  const endpoint = 'https://app.pricelabs.co/api/add_custom_pricing'
  let payloads

  before(() => {
    cy.fixture('payloads/priceUpdate').then((data) => {
      payloads = data
    })
  })

  // reusable API function
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

  // reusable success validation
  const validateSuccess = (response) => {
    expect(response.status).to.eq(200)
    expect(response.body.message).to.eq('SUCCESS')
    expect(response.body.status).to.eq(200)
    expect(response.body.response.success)
      .to.eq('Your custom prices have been updated.')
  }

  context('Custom Price API validations', () => {

    it('Validate creating custom prices for a listing', () => {

      sendRequest(payloads.createPrice)
        .then(validateSuccess)

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