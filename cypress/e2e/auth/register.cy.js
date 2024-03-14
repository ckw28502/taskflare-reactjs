describe("register page tests", () => {

  let user;

  beforeEach(() => {
    cy.visit(Cypress.env("base_url") + "/register");
  })

  before(async() => {
    user = await cy.fixture("auth/register.json");
  })

  it("should show error message if input is empty!", () => {
    cy.get("#register-email").click()
    cy.get("#register-password").click()
    cy.get("#register-confirmation-password").click()
    cy.get("#register-button").click()
    
    cy.contains("div","Email is required!")
    cy.contains("div","Password is required!")
    cy.contains("div","Confirmation password is required!")
  })

  it("should show error message if email is invalid!", () => {
    cy.get("#register-email").type("user")
    cy.get("#register-button").click()

    cy.contains("div","Invalid email address!")
  })

  it("should show error message if password and confirmation password missmatch!", async() => {
    cy.get("#register-email").type(user.email)
    cy.get("#register-password").type(user.password)
    cy.get("#register-confirmation-password").type("useer")
    cy.get("#register-button").click()

    cy.contains("div","Passwords must match!")
  })

  it("should toast an error if email is already used!", async() => {
    cy.mockServerRequest("POST", "/register", 400, {
      message: "EMAIL_EXISTS"
    })

    cy.get("#register-email").type(user.email)
    cy.get("#register-password").type(user.password)
    cy.get("#register-confirmation-password").type(user.confirmationPassword)
    cy.get("#register-button").click()

    cy.contains("div", "Email is registered!")
  });

  it("should toast user is registered!", async() => {
    cy.mockServerRequest("POST", "/register", 201, {})

    cy.get("#register-email").type(user.email)
    cy.get("#register-password").type(user.password)
    cy.get("#register-confirmation-password").type(user.confirmationPassword)
    cy.get("#register-button").click()

    cy.contains("div", "You are registered now!")
  });

})