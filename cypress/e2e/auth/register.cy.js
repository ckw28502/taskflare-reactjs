describe("register page tests", () => {

  let user;

  beforeEach(() => {
    cy.visit(Cypress.env("base_url") + "/register");
  })

  before(async() => {
    const userData = await cy.fixture("users.json");
    user = userData.user;

  })

  it("should show error message if input is empty!", () => {
    cy.get("#text-email").click()
    cy.get("#text-name").click()
    cy.get("#text-password").click()
    cy.get("#text-confirmation-password").click()
    cy.get("#button-submit").click()
    
    cy.contains("div","Name field is required!")
    cy.contains("div","Password field is required")
    cy.contains("div","Confirmation password field is required")
  })

  it("should show error message if email is invalid!", () => {
    cy.get("#text-email").type("user")
    cy.get("#button-submit").click()

    cy.contains("div","Email is invalid!")
  })

  it("should show error message if password and confirmation password missmatch!", async() => {
    cy.get("#text-email").type(user.email)
    cy.get("#text-name").type(user.name)
    cy.get("#text-password").type(user.password)
    cy.get("#text-confirmation-password").type("useer")
    cy.get("#button-submit").click()

    cy.contains("div","Password and confirmation password are different!")
  })

  it("should toast an error if email is already used!", async() => {
    cy.mockServerRequest("POST", "/register", 400, {
      message: "EMAIL_EXISTS"
    })

    cy.get("#text-email").type(user.email)
    cy.get("#text-name").type(user.name)
    cy.get("#text-password").type(user.password)
    cy.get("#text-confirmation-password").type(user.confirmationPassword)
    cy.get("#button-submit").click()

    cy.contains("div", "Email is registered!")
  });

  it("should toast user is registered!", async() => {
    cy.mockServerRequest("POST", "/register", 201, {})

    cy.get("#text-email").type(user.email)
    cy.get("#text-name").type(user.name)
    cy.get("#text-password").type(user.password)
    cy.get("#text-confirmation-password").type(user.confirmationPassword)
    cy.get("#button-submit").click()

    cy.contains("div", "You are registered now!")
  });

})