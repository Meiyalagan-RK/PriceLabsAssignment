describe('Remove Custom Pricing API', () => {

    let payloads
    const endpoint = 'https://app.pricelabs.co/api/remove_custom_pricing'

    before(() => {
        cy.fixture('payloads/removePricing').then((data) => {
            payloads = data
        })
    })

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
        })
    })


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