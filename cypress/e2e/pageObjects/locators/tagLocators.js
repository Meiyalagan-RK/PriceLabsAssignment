class TagLocators {

    columnVisibilityButton = '[qa-id="pd-row-coloumn-visibility"]'
    tagsCheckbox = '[qa-id="tags-checkbox"]'

    addTagButton = '[qa-id^="add-tag-"]'
    tagInput = '[qa-id^="tag-name-input-"]'
    saveTagButton = '[qa-id^="save-tag-"]'

    errorToast = '[data-status="error"] p'
    successToast = '[data-status="success"]'

}

export default new TagLocators()