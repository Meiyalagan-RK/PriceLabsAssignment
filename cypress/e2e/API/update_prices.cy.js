describe('Update Custom Prices API Test', () => {
  it('should successfully update custom prices for a listing', () => {
    const timestamp = Date.now();
    const endpoint = `https://app.pricelabs.co/api/add_custom_pricing`;

    const payload = {
      "price": "100",
      "reason": "",
      "basePrice": "103",
      "priceType": "fixed",
      "pmsName": "vrm",
      "minStay": "",
      "minPrice": "101",
      "minPriceType": "fixed",
      "maxPrice": "102",
      "maxPriceType": "fixed",
      "listingId": "VRMREALTY___108",
      "currency": "USD",
      "parentKey": 2102208,
      "page": 1,
      "cacheBuster": timestamp,
      "syncChildren": true,
      "isParentListing": true,
      "hasChildren": false,
      "startDate": "Mar 10 2026",
      "endDate": "Mar 10 2026",
      "leadTimeExpiry": "",
      "checkInCheckOutEnabled": false,
      "checkIn": "0000000",
      "checkOut": "1111111",
      "actualStartDate": "2026-03-10",
      "actualEndDate": "2026-03-10",
      "currentRowIndex": 1,
      "snoozeDso": false,
      "isPricingPage": false
    };

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

  it('validate error when removing custom pricing with invalid checkIn rules', () => {
    // Note: The response provided by the user shows a validation error
    // "At least one day of the week should be enabled for check-in."
    // We will assert for this exact message.

    const endpoint = `https://app.pricelabs.co/api/remove_custom_pricing`;

    const payload = {
      "price": "200",
      "reason": "",
      "basePrice": 203,
      "priceType": "fixed",
      "pmsName": "vrm",
      "minStay": 0,
      "minPrice": 201,
      "minPriceType": "fixed",
      "maxPrice": 202,
      "maxPriceType": "fixed",
      "listingId": "VRMREALTY___108",
      "currency": "USD",
      "parentKey": 2102208,
      "hasChildren": false,
      "page": 1,
      "startDate": "Mar 11, 2026",
      "endDate": "Mar 11, 2026",
      "isParentListing": true,
      "currentRowIndex": 1,
      "isViewOverrideCopyDsoChecked": false,
      "isPricingPage": false,
      "checkIn": "0000000",
      "checkOut": "1111111",
      "checkInCheckOutEnabled": false,
      "leadTimeExpiry": ""
    };

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
      expect(resData.success).to.eq('At least one day of the week should be enabled for check-in.');
    });
  });
});
