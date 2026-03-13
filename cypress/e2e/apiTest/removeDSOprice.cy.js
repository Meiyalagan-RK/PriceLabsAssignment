// This suite tests removing existing custom prices for a DSO listing
describe('Remove Custom Pricing API', () => {

    let payloads
    // Endpoint for removing custom pricing and reading calendar data
    const endpoint = 'https://app.pricelabs.co/api/remove_custom_pricing'
    const getEndpoint = 'https://app.pricelabs.co/api/get_calendar_data'

    before(() => {
        // Load all remove pricing payloads once and reuse across tests
        cy.fixture('payloads/removePricing').then((data) => {
            payloads = data
        })
    })

    // Helper to call calendar API to check prices on server
    const getCalendarRequest = (query) => {
        return cy.request({
            method: 'GET',
            url: getEndpoint,
            qs: query,
            failOnStatusCode: false
        })
    }

    // Valid remove flow: send remove request and then check calendar data
    it('should attempt to remove custom pricing', () => {
        const payload = {
            ...payloads.validRemove
        }
        cy.request({
            method: 'POST',
            url: `${endpoint}?${Date.now()}`,
            body: payload
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
                a: Date.now()
            }

            return getCalendarRequest(qs).then((calendarResponse) => {
                expect(calendarResponse.status).to.eq(200)
                expect(calendarResponse.body.message).to.eq('SUCCESS')

                const calendarData = calendarResponse.body.response.calendar_data
                expect(calendarData).to.be.an('array')
            })
        });
    })


    // Negative case: invalid payload should return 404 style error in body
    it('Validate invalid payload  pricing removal', () => {
        const payload = {
            ...payloads.emptyPriceUpdate,
        }
        cy.request({
            method: 'POST',
            url: endpoint,
            body: payload,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.message).to.eq('SUCCESS');
            expect(response.body.status).to.eq(404);

            const resData = response.body.response;
            expect(resData.message).to.eq("Listing: undefined does not exist in your account");


        });
    });

    // Security case: request with invalid token should return unauthorized error
    it('Validate send request with expired/invalid auth token', () => {
        cy.clearCookies()
        cy.clearLocalStorage()

        const payload = {
            ...payloads.validRemove,
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