import tagPage from "../pageObjects/pages/Tags"

describe('Multi Calendar - Tag Management', () => {

  const tagData = {
    listingId: "VRMREALTY___239",
    pmsName: "vrm",
    listingName: "Copy of Sandeep Test Property",
    tag: "automation"
  }

  context('Add tag to listing using mocked API', () => {

    beforeEach(() => {

      tagPage.visitHomePage()

      cy.mockBulkUpdateTags(tagData)

      tagPage.enableTagsColumn()

    })

    it('Validate creating tags added from the row', () => {

      tagPage.addAndValidateTag(
        tagData.listingName,
        tagData.tag
      )

      cy.wait('@bulkUpdateTags')

      tagPage.validateToast('Tags have been updated!')

      tagPage.addTag(tagData.tag)

      tagPage.validateError(['Tag already exists'])

    })

  })

})