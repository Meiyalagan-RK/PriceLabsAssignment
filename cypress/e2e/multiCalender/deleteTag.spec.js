import MulticalenderPage from '../pageObjects/MulticalenderPage';
import LoginPage from '../pageObjects/LoginPage';

describe('Delete Tag Test Suite', () => {
  
  beforeEach(() => {
    // Login and navigate to homepage
    MulticalenderPage.visitHomePage()
  });

  it('should delete a created tag and validate success toast message', () => {
    const listingName = 'Copy of Sandeep Test Property'
    const tagName = 'automation'

    // Add and validate tag creation
    MulticalenderPage.addAndValidateTag(listingName, tagName)
    
    // Verify tag exists before deletion
    cy.get(`[qa-id="tag-VRMREALTY___239-${tagName}"]`)
      .should('be.visible')
      .should('contain.text', tagName)
    
    // Delete and validate the tag
    MulticalenderPage.deleteAndValidateTag(tagName)
    
    // Verify tag no longer exists after deletion
    cy.get(`[qa-id="tag-VRMREALTY___239-${tagName}"]`)
      .should('not.exist')
  });

  it('should validate delete button is visible on tag hover', () => {
    const listingName = 'Copy of Sandeep Test Property'
    const tagName = 'automation'

    // Add tag first
    MulticalenderPage.addAndValidateTag(listingName, tagName)
    
    // Hover over the tag to make delete button visible
    cy.get(`[qa-id="tag-VRMREALTY___239-${tagName}"]`)
      .should('be.visible')
      .realHover()
    
    // Verify delete button is visible on hover
    cy.get(`[qa-id="delete-tag-VRMREALTY___239-${tagName}"]`)
      .should('be.visible')
  });

  it('should delete multiple tags one by one', () => {
    const listingName = 'Copy of Sandeep Test Property'
    const tags = ['automation', 'test', 'delete']

    // Add multiple tags
    tags.forEach((tag) => {
      MulticalenderPage.addAndValidateTag(listingName, tag)
    })

    // Delete tags one by one
    tags.forEach((tag) => {
      MulticalenderPage.deleteAndValidateTag(tag)
      
      // Verify each tag is deleted
      cy.get(`[qa-id="tag-VRMREALTY___239-${tag}"]`)
        .should('not.exist')
    })
  });

  it('should validate success toast message after tag deletion', () => {
    const listingName = 'Copy of Sandeep Test Property'
    const tagName = 'automation'

    // Add tag
    MulticalenderPage.addAndValidateTag(listingName, tagName)
    
    // Delete tag
    cy.get(`[qa-id="delete-tag-VRMREALTY___239-${tagName}"]`)
      .should('be.visible')
      .click()
    
    // Validate success toast message appears
    cy.get('[data-status="success"]')
      .should('be.visible')
      .should('have.length', 1)
      .should('contain.text', 'Tag removed successfully')
  });

});
