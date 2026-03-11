import tagPage from "../pageObjects/addingTags"

describe('Multi Calendar - Tag Management', () => {

  const tagData = {
    listingId: "VRMREALTY___239",
    pmsName: "vrm",
    listingName: "Copy of Sandeep Test Property",
    tag: "automation"
  }

  context('Add tag to listing using mocked API', () => {

    it('Validate creating tags added from the row', () => {

      tagPage.visitHomePage()

      cy.mockBulkUpdateTags(tagData)

      tagPage.enableTagsColumn()

      tagPage.addAndValidateTag(
        tagData.listingName,
        tagData.tag
      )

      cy.wait('@bulkUpdateTags')

      tagPage.validateToast('Tags have been updated!')

      // Validate duplicate tag
      tagPage.clickOnAddTagIcon(tagData.tag)
      tagPage.validateError(['Tag already exists'])

    })

    it('validate remove tags from the selected row', () => {

      tagPage.visitHomePage()

      cy.mockBulkUpdateTags(tagData)

      tagPage.enableTagsColumn()

      tagPage.deleteTag(
        tagData.listingName,
        tagData.listingId
      )

      cy.wait('@bulkUpdateTags')

      tagPage.validateToast('Tags have been updated!')

    })

  })

})