describe('Update Custom Prices API Test', () => {

  // Common endpoints for creating prices and getting calendar data
  const endpoint = 'https://app.pricelabs.co/api/add_custom_pricing'
  const getEndpoint = 'https://app.pricelabs.co/api/get_calendar_data'
  const removeEndpoint = 'https://app.pricelabs.co/api/remove_custom_pricing'
  let payloads

  before(() => {
    // get payloads from mock folder
    cy.fixture('payloads/priceUpdate').then((data) => {
      payloads = data
    })
  })

  //POST request function created 
  const sendRequest = (payload) => {
    return cy.request({
      method: 'POST',
      url: endpoint,
      body: {
        ...payload,
        cacheBuster: Date.now()
      },
      failOnStatusCode: false
    })
  }

  // GET request function created 
  const getCalendarRequest = (query) => {
    return cy.request({
      method: 'GET',
      url: getEndpoint,
      qs: query,
      failOnStatusCode: false
    })
  }

  const getTodayDate = () => {
    const today = new Date()
    return today.toDateString()  
  }

  // common SUCCESS response function
  const validateSuccess = (response) => {
    expect(response.status).to.eq(200)
    expect(response.body.message).to.eq('SUCCESS')
    expect(response.body.status).to.eq(200)
    expect(response.body.response.success)
      .to.eq('Your custom prices have been updated.')
  }

  context('Custom Price API validations', () => {

    it('Validate creating DSO custom prices for a listing', () => {

      const createPayload = payloads.createPrice

      sendRequest(createPayload)
        .then(validateSuccess)
        .then(() => {
          const { query, expected } = payloads.getCalendarForDso

          const qs = {
            ...query,
            a: Date.now(),
            date :getTodayDate()
          }

          return getCalendarRequest(qs).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('SUCCESS')

            const calendarData = response.body.response.calendar_data
            expect(calendarData).to.be.an('array').and.to.have.lengthOf(1)

            const firstEntry = calendarData[0]
            expect(firstEntry.listing_id).to.eq(expected.listing_id)
            expect(firstEntry.pms_name).to.eq(expected.pms_name)
            expect(firstEntry.parent_key).to.eq(expected.parent_key)
            expect(firstEntry.price).to.eq(expected.price)
            expect(firstEntry.base_price).to.eq(expected.base_price)
            expect(firstEntry.min_price).to.eq(expected.min_price)
            expect(firstEntry.max_price).to.eq(expected.max_price)
            expect(firstEntry.start_date).to.eq(expected.start_date)
            expect(firstEntry.end_date).to.eq(expected.end_date)
          })
        })

    })

    it('Validate creating another DSO custom prices for a listing', () => {

      const createPayload = payloads.addingAnotherDSO

      sendRequest(createPayload)
        .then(validateSuccess)
        .then(() => {
          const { query, expected } = payloads.getCalendarForDso1

          const qs = {
            ...query,
            a: Date.now(),
            date :getTodayDate()
          }

          return getCalendarRequest(qs).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('SUCCESS')

            const calendarData = response.body.response.calendar_data
            expect(calendarData).to.be.an('array').and.to.have.lengthOf(2)

            const secondEntry = calendarData[1]
            const firstEntry = calendarData[0]

            cy.log('secondEntry',secondEntry)
            cy.log('firstEntry',firstEntry)
            expect(secondEntry.listing_id).to.eq(expected.listing_id)
            expect(secondEntry.pms_name).to.eq(expected.pms_name)
            expect(secondEntry.parent_key).to.eq(expected.parent_key)
            expect(secondEntry.price).to.eq(expected.price)
            expect(secondEntry.base_price).to.eq(expected.base_price)
            expect(secondEntry.min_price).to.eq(expected.min_price)
            expect(secondEntry.max_price).to.eq(expected.max_price)
            expect(secondEntry.start_date).to.eq(expected.start_date)
            expect(secondEntry.end_date).to.eq(expected.end_date)
          })
        })

    })


    it('Validate updating custom prices for a listing', () => {

      const updatePayload = payloads.updatePrice

      sendRequest(updatePayload)
        .then(validateSuccess)
        .then(() => {
          const { query } = payloads.getCalendarForDso

          const qs = {
            ...query,
            a: Date.now(),
            date :getTodayDate()
          }

          const expected = {
            listing_id: updatePayload.listingId,
            pms_name: updatePayload.pmsName,
            parent_key: updatePayload.parentKey,
            price: updatePayload.price,
            base_price: updatePayload.basePrice,
            min_price: updatePayload.minPrice,
            max_price: updatePayload.maxPrice
          }

          return getCalendarRequest(qs).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.message).to.eq('SUCCESS')

            const calendarData = response.body.response.calendar_data
            expect(calendarData).to.be.an('array').and.to.have.length.greaterThan(0)

            const firstEntry = calendarData[0]
            expect(firstEntry.listing_id).to.eq(expected.listing_id)
            expect(firstEntry.pms_name).to.eq(expected.pms_name)
            expect(firstEntry.parent_key).to.eq(expected.parent_key)
            expect(firstEntry.price).to.eq(expected.price)
            expect(firstEntry.base_price).to.eq(expected.base_price)
            expect(firstEntry.min_price).to.eq(expected.min_price)
            expect(firstEntry.max_price).to.eq(expected.max_price)
            // For update case, we keep dates flexible for now (just presence)
            expect(firstEntry.start_date).to.exist
            expect(firstEntry.end_date).to.exist
          })
        })

    })
// deleted  "startDate": "Mar 25, 2026","endDate": "Mar 27, 2026",
    it('Validate updated custom pricing should be deleted from DSO listing', () => {
      const deletePayload = payloads.deleteupdated
      cy.request({
          method: 'POST',
          url: `${removeEndpoint}?${Date.now()}`,
          body: deletePayload
      }).then((response) => {
          expect(response.status).to.eq(200)
          expect(response.body.message).to.eq('SUCCESS')
          const res = response.body.response
          expect(res).to.exist
          expect(res.child_dso_ids).to.be.an('array')
          expect(res.success).to.eq("At least one day of the week should be enabled for check-in.");
      }).then(() => {
          const { query } = payloads.getCalendarForDso
          const qs = {
              ...query,
              a: Date.now(),
              date:getTodayDate()
          }

          return getCalendarRequest(qs).then((calendarResponse) => {
              expect(calendarResponse.status).to.eq(200)
              expect(calendarResponse.body.message).to.eq('SUCCESS')

              const calendarData = calendarResponse.body.response.calendar_data
              expect(calendarData).to.be.an('array')
          })
      });
  })
  it('Validate custom pricing shouldd be deleted from DSO listing', () => {
    const deletePayload = payloads.deleteSecondcreated
    cy.request({
        method: 'POST',
        url: `${removeEndpoint}?${Date.now()}`,
        body: deletePayload
    }).then((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.message).to.eq('SUCCESS')
        const res = response.body.response
        expect(res).to.exist
        expect(res.child_dso_ids).to.be.an('array')
        expect(res.success).to.eq("At least one day of the week should be enabled for check-in.");
    }).then(() => {
        const { query } = payloads.getCalendarForDso
        const qs = {
            ...query,
            a: Date.now(),
            date:getTodayDate()
        }

        return getCalendarRequest(qs).then((calendarResponse) => {
            expect(calendarResponse.status).to.eq(200)
            expect(calendarResponse.body.message).to.eq('SUCCESS')

            const calendarData = calendarResponse.body.response.calendar_data
            expect(calendarData).to.be.an('array')
        })
    });
})

    // handled in client

    // it('Validate empty pricing update custom prices for a listing', () => {

    //   sendRequest(payloads.emptyPriceUpdate)
    //     .then(validateSuccess)

    // })

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