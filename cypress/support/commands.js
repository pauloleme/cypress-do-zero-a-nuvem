  const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)
  
Cypress.Commands.add('fillMandatoryForm', mandatoryField => {
    
    cy.get('#firstName').type(mandatoryField.firstName)
    cy.get('#lastName').type(mandatoryField.lastName)
    cy.get('#email').type(mandatoryField.email, {log: false})
    cy.get('#open-text-area').type(longText, {delay:0 })
    
})

