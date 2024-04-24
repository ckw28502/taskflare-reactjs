describe("login page tests", () => {
  let user;

  beforeEach(() => {
    cy.visit(Cypress.env("base_url") + "/login");
  })

  before(async() => {
    const userData = await cy.fixture("users.json");
    user = userData.user;
  })

  it("should return error if field is empty", () => {
    cy.get("#text-email").click()
    cy.get("#pass-password").click()
    cy.get("#button-submit").click()

    cy.contains("div","Email field is required!")
    cy.contains("div","Password field is required")
  });
  
  it("should return error if email is invalid", () => {
    cy.get("#text-email").type("user")
    cy.get("#button-submit").click()

    cy.contains("div","Email is invalid!")
  });

  it("should return error if email is not registered", () => {
    cy.mockServerRequest("POST", "/login", 400, {
        message: "EMAIL_NOT_FOUND"
    });

    cy.get("#text-email").type(user.email)
    cy.get("#pass-password").type(user.password)
    cy.get("#button-submit").click()

    cy.contains("div","Email is not registered!")
  });

  it("should return error if password is incorrect", () => {
    cy.mockServerRequest("POST", "/login", 400, {
        message: "PASSWORD_INVALID"
    });

    cy.get("#text-email").type(user.email)
    cy.get("#pass-password").type(user.password)
    cy.get("#button-submit").click()

    cy.contains("div","Password is invalid!")
  });

  it("should logged in", () => {
    cy.mockServerRequest("POST", "/login", 200, {
        token: "token",
        refreshToken: "refresh token"
    });

    cy.get("#text-email").type(user.email)
    cy.get("#pass-password").type(user.password)
    cy.get("#button-submit").click()

    cy.url().should("not.include", "/login");
  });
})