describe('Tags feature', () => {

  context('Validation of tags CRUD from the table',()=>{
  let payloads
  before(() => {
    cy.fixture("payloads/tagsPayloads").then((data) => {
      payloads = data
    })
  })
  
  it('should successfully update tags for a listing', () => {
    const timestamp = Date.now();
    const endpoint = `https://app.pricelabs.co/api/bulk_update_tags?${timestamp}`;
    const payload = {
      ...payloads.addTag,
      cacheBuster: timestamp
    }
    cy.request({
      method: 'POST',
      url: endpoint,
      body: payload,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('SUCCESS');
      const resData = response.body.response;
      expect(resData).to.exist;
      expect(resData.unmapped).to.be.an('array').that.has.lengthOf(1);

      const unmappedItem = resData.unmapped[0];
      expect(unmappedItem.listing_id).to.eq('VRMREALTY___239');
      expect(unmappedItem.pms_name).to.eq('vrm');
      expect(unmappedItem.unique_id).to.eq('VRMREALTY___239___vrm');
      expect(unmappedItem.tags).to.eq('automation');
    });
  });

  it('should successfully remove tags for a listing', () => {
    const timestamp = Date.now();
    const endpoint = `https://app.pricelabs.co/api/bulk_update_tags?${timestamp}`;

    const payload = {
      ...payloads.removeTag,
    cacheBuster: timestamp 
    }

    cy.request({
      method: 'POST',
      url: endpoint,
      body: payload,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('SUCCESS');
      const resData = response.body.response;
      expect(resData).to.exist;
      expect(resData.unmapped).to.be.an('array').that.has.lengthOf(1);
      expect(resData.failure).to.be.an('array').that.has.lengthOf(0);

      const unmappedItem = resData.unmapped[0];
      expect(unmappedItem.listing_id).to.eq('VRMREALTY___239');
      expect(unmappedItem.pms_name).to.eq('vrm');
      expect(unmappedItem.unique_id).to.eq('VRMREALTY___239___vrm');
      expect(unmappedItem.tags).to.eq('');
    });
  });

    it('Validating request with invalid payload missing listing_id', () => {
    const timestamp = Date.now();
    const endpoint = `https://app.pricelabs.co/api/bulk_update_tags?${timestamp}`;

    const payload = {
      ...payloads.invalidPayload,
    cacheBuster: timestamp 
    }

    cy.request({
      method: 'POST',
      url: endpoint,
      body: payload,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.message).to.eq('SUCCESS');
      const resData = response.body.response;
      expect(resData).to.exist;
      expect(resData.failure).to.be.an('array').that.has.lengthOf(1);
      const failure = resData.failure[0];
      expect(failure.listing_id).to.eq('undefined')
      expect(failure.pms_name).to.eq('vrm');
      expect(failure.message).be.eq("Unable to update listing -- Please ensure that you have permission to edit this listing or contact support@pricelabs.co to resolve your issue.")

    });

  });

  it('Send request with expired/invalid auth token', () => {
    cy.clearCookies()
    cy.clearLocalStorage()
    const timestamp = Date.now();
    const endpoint = `https://app.pricelabs.co/api/bulk_update_tags?${timestamp}`;

    const payload = {
      ...payloads.addTag,
    cacheBuster: timestamp 
    }

    cy.request({
      method: 'POST',
      url:endpoint,
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
