describe("login page tests", () => {
  let user;

  beforeEach(() => {
    cy.visit(Cypress.env("base_url") + "/login");
  })

  before(async() => {
    user = await cy.fixture("auth/login.json");
  })

  it("should return error if field is empty", () => {
    cy.get("#login-email").click()
    cy.get("#login-password").click()
    cy.get("#login-button").click()

    cy.contains("div","Email is required!")
    cy.contains("div","Password is required!")
  });
  
  it("should return error if email is invalid", () => {
    cy.get("#login-email").type("user")
    cy.get("#login-button").click()

    cy.contains("div","Invalid email address!")
  });

  it("should return error if email is not registered", () => {
    cy.mockServerRequest("POST", "/login", 400, {
        message: "EMAIL_NOT_FOUND"
    });

    cy.get("#login-email").type(user.email)
    cy.get("#login-password").type(user.password)
    cy.get("#login-button").click()

    cy.contains("div","Email is not registered!")
  });

  it("should return error if password is incorrect", () => {
    cy.mockServerRequest("POST", "/login", 400, {
        message: "PASSWORD_INVALID"
    });

    cy.get("#login-email").type(user.email)
    cy.get("#login-password").type(user.password)
    cy.get("#login-button").click()

    cy.contains("div","Password is invalid!")
  });

  it("should logged in", () => {
    cy.mockServerRequest("POST", "/login", 200, {
        token: "token",
        refreshToken: "refresh token"
    });

    cy.get("#login-email").type(user.email)
    cy.get("#login-password").type(user.password)
    cy.get("#login-button").click()

    cy.url().should("not.include", "/login");
  });
})