describe('Update Custom Prices API Test', () => {

  context('d', () => {
    let payloads
    before(() => {
      cy.fixture('payloads/priceUpdate').then((data) => {
        payloads = data
      })
    })

    it('Validate creating custom prices for a listing', () => {
      const timestamp = Date.now();
      const endpoint = `https://app.pricelabs.co/api/add_custom_pricing`;

      const payload = {
        ...payloads.createPrice,
        cacheBuster: timestamp
      }

      cy.request({
        method: 'POST',
        url: endpoint,
        body: payload,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('SUCCESS');
        expect(response.body.status).to.eq(200);

        const resData = response.body.response;
        expect(resData.success).to.eq('Your custom prices have been updated.');
      });
    });

    it('Validate updating custom prices for a listing', () => {
      const timestamp = Date.now();
      const endpoint = `https://app.pricelabs.co/api/add_custom_pricing`;

      const payload = {
        ...payloads.updatePrice,
        cacheBuster: timestamp
      }
      cy.request({
        method: 'POST',
        url: endpoint,
        body: payload,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('SUCCESS');
        expect(response.body.status).to.eq(200);

        const resData = response.body.response;
        expect(resData).to.exist;
        expect(resData.success).to.eq('Your custom prices have been updated.');
      });
    });
    // empty case handled in client 
    it('Validate empty pricing update custom prices for a listing', () => {
      const timestamp = Date.now();
      const endpoint = `https://app.pricelabs.co/api/add_custom_pricing`;

      const payload = {
        ...payloads.emptyPriceUpdate,
        cacheBuster: timestamp
      }

      cy.request({
        method: 'POST',
        url: endpoint,
        body: payload,
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.eq('SUCCESS');
        expect(response.body.status).to.eq(200);

        const resData = response.body.response;
        expect(resData.success).to.eq('Your custom prices have been updated.');
      });
    });

    it('Validate send request with expired/invalid auth token', () => {
      cy.clearCookies()
      cy.clearLocalStorage()
      const timestamp = Date.now();
      const endpoint = `https://app.pricelabs.co/api/add_custom_pricing`;

      const payload = {
        ...payloads.updatePrice,
        cacheBuster: timestamp
      }

      cy.request({
        method: 'POST',
        url: endpoint,
        headers: {
          Authorization: 'Bearer invalid_token_123',
          Cookie: ''
        },
        body: payload
      }).then((response) => {
        expect(response.status).to.eq(200)

        const res = response.body.response

        expect(res.error_code).to.eq('ERR-403-NS')
        expect(res.failure).to.eq('Unauthorized Access. Please sign out and sign back in.')
        expect(res.error).to.eq('Unauthorized Access. Please sign out and sign back in.')
        expect(res.message).to.eq('Unauthorized Access. Please sign out and sign back in.')

      });
    });




  })
});
