const faker = require('faker')
 let mandatoryField = {}

beforeEach(() => {


  cy.visit('../src/index.html')

  mandatoryField.firstName = faker.name.firstName()
  mandatoryField.lastName = faker.name.lastName()
  mandatoryField.email = faker.internet.email()
})


describe('Central de Atendimento ao Cliente TAT', () => {

  
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')   

  })

  it('Preenche os campos obrigatórios e envia o formulário', () =>{
    cy.clock()
    cy.fillMandatoryForm(mandatoryField)

    cy.get('.button')
    .as('confirmButton')
    .click()

    cy.get('.success')
    .should('be.visible')

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
  }) 

   it('Exibe Mensagem de erro ao submeter o formulario com um email com formatação inválida', () =>{
     cy.clock()
    cy.get('#firstName')
    .type('Paulo')

    cy.get('#lastName')
    .type('Silva')

    cy.get('#open-text-area')
    .type('testing field to validate a box')

     cy.get('#email')
    .type('teste@teste')

    cy.contains('button', 'Enviar').click()

    cy.get('.error > strong')
    .should('be.visible')
      cy.tick(3000)

    cy.get('.success').should('not.be.visible')
     })

 it('Validação telefone', ()=>{
   it('Validar numero de telefone', () => {
     cy.get('#phone')
     .type('abcdefghi')
     .should('have.value', '')


  })
 })


 it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', ()=>{
  cy.clock()
  cy.fillMandatoryForm(mandatoryField)

     cy.get('#phone-checkbox')
    .should('be.visible')
    .check()

    cy.contains('button', 'Enviar').click()

    cy.get('.error > strong')
    .should('be.visible')

      cy.tick(3000)

    cy.get('.success').should('not.be.visible')
     })


it('Preenche e limpa os campos nome, sobrenome, email e telefone', ()=>{

  cy.get('#firstName')
    .type('Paulo')
    .should('have.value', 'Paulo')
    .clear()
    .should('have.value', '')

    cy.get('#lastName')
    .type('Silva')
    .should('have.value', 'Silva')
    .clear()
    .should('have.value', '')

     cy.get('#email')
    .type('teste@teste.com')
    .should('have.value', 'teste@teste.com')
    .clear()
    .should('have.value', '')

    cy.get('#phone')
     .type('11478246984')
    .should('have.value', '11478246984')
    .clear()
    .should('have.value', '')
    

})


it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
  cy.clock()
  cy.get('.button')
  .click()

  cy.get('.error')
  .should('be.visible')

   cy.tick(3000)

    cy.get('.success').should('not.be.visible')
})

it('envia o formulario com sucesso usando um comando customizado', () =>{
   cy.clock()

     cy.fillMandatoryForm(mandatoryField)

    cy.tick(3000)

    cy.get('.success').should('not.be.visible')
})

it('Seleciona um produto (YouTube) por seu texto', () =>{

  cy.fillMandatoryForm(mandatoryField)

  cy.get('#product')
  .select('YouTube')
  .should('have.value', 'youtube')


    cy.get('.button')
    .as('confirmButton')
    .click()

    cy.get('.success')
    .should('be.visible')

})

it('Seleciona um produto (Mentoria) por seu value', () =>{
  cy.fillMandatoryForm(mandatoryField)

  cy.get('#product').select('mentoria').should('have.value', 'mentoria')


    cy.get('.button')
    .as('confirmButton')
    .click()

    cy.get('.success')
    .should('be.visible')
})

it('Seleciona um produto (Blog) por seu índice', () =>{
  
   cy.fillMandatoryForm(mandatoryField)

  cy.get('#product').select(1).should('have.value', 'blog')


    cy.get('.button')
    .as('confirmButton')
    .click()

    cy.get('.success')
    .should('be.visible')

})

it('Marca o tipo de atendimento "Feedback"', () => { 

    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
})

it('Marca cada tipo de Atendimento"', () => { 

    cy.get('input[type="radio"]')
    .each(typeOfService => {
      cy.wrap(typeOfService)
      .check()
      .should('be.checked')
    })
})

it('Marca ambos checkboxes, depois desmarca o ultimo', () => {

  cy.get('input[type="checkbox"]')
  .check()
  .should('be.checked')
  .last()
  .uncheck()
  .should('not.be.checked')
  
})

it('Seleciona um arquivo da pasta fixtures', () =>{
  cy.get('#file-upload')
   .selectFile('cypress/fixtures/example.json')
   .should(input  => {
    expect(input[0].files[0].name).to.equal('example.json')
   })
})

it('Seleciona um arquivo simulnado um drag-and-drop', () => {
  cy.get('#file-upload')
   .selectFile('cypress/fixtures/example.json', {action : 'drag-drop'})
   .should(input  => {
    expect(input[0].files[0].name).to.equal('example.json')
   })
})



it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
  cy.fixture('example.json').as('samplefile')
  cy.get('#file-upload')
   .selectFile('@samplefile')
   .should(input  => {
    expect(input[0].files[0].name).to.equal('example.json')
   })
})


it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', ()=> {
  cy.contains('a', 'Política de Privacidade')
  .should('have.attr', 'href', 'privacy.html')
  .and('have.attr', 'target', '_blank')
})

it('Acessa a página da política de privacidade removendo o target e então clicando no link', ()=> {
  cy.contains('a', 'Política de Privacidade')
  .invoke('removeAttr', 'target')
  .click()
  cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')
})

it('Testa a página da politica de privacidade de forma indepentende, ', ()=> {
  cy.visit('./src/privacy.html')
  cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')
   cy.contains('p','Talking About Testing').should('be.visible')
})

it('exibe e oculta as mensagens de sucesso e erro usando .invoke()', () => {
  cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')
  cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')
})


  
it('preenche o campo da área de texto usando o comando invoke', () => {
cy.get('#open-text-area')
.invoke('val', 'Um texto qualquer')
.should('have.value', 'Um texto qualquer')
})
  

it('Faz uma requisição HTTP', () => {
  cy.request('https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html')
  .as('getRequest')
  .its('status')
  .should('be.equal', 200)

  cy.get('@getRequest')
  .its('statusText')
  .should('be.equal', 'OK')

   cy.get('@getRequest')
   .its('body')
   .should('include', 'CAC TAT')
})
  
it('Encontra o Gato escondido', () =>{
  cy.get('#cat')
  .invoke('show')
  .should('be.visible')

  cy.get('#title')
  .invoke('text', 'CAT TAT')

  cy.get('#subtitle')
  .invoke('text', 'I Love Cats <3 ')
})



})

  
  