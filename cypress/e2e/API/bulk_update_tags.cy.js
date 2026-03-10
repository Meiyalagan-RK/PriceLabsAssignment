describe('Bulk Update Tags API Test', () => {
  it('should successfully update tags for a listing', () => {
    const timestamp = Date.now();
    const endpoint = `https://app.pricelabs.co/api/bulk_update_tags?${timestamp}`;
    const payload = {
      "rowData": [
        {
          "listing_id": "VRMREALTY___239",
          "pms_name": "vrm",
          "tags": "automation"
        }
      ],
      "page": 1,
      "rowIndex": 2,
      "successMessage": "Tags have been updated!",
      "cacheBuster": timestamp - 1
    };
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
      "rowData": [
        {
          "listing_id": "VRMREALTY___239",
          "pms_name": "vrm",
          "tags": ""
        }
      ],
      "page": 1,
      "rowIndex": 2,
      "successMessage": "Tags have been updated!",
      "cacheBuster": timestamp - 3
    };

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
      expect(unmappedItem.tags).to.eq('');
    });
  });
});
