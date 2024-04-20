describe("Project page tests", () => {
    let project;

    let user;

    let today;
    before(async() => {
        await Promise.all([
            cy.fixture("projects.json"),
            cy.fixture("users.json")
          ]).then(([projectData, userData]) => {
            // Extract the desired data from the resolved values
            project = projectData.project;
            user = userData.user;
          
            // Log the loaded data (optional)
            cy.log("Project:", project);
            cy.log("User:", user);
        });
        today = new Date();
    });

    beforeEach(() => {
        cy.mockServerRequest("GET", "/projects/1", 200, project);

        cy.visit(`${Cypress.env("base_url")}/1`, {
            onBeforeLoad: win => {
                win.sessionStorage.setItem("token", "token");
            }
        });
    });

    function dateToString() {
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const year = today.getFullYear();

        return `${month}${day}${year}`;
    }

    describe("Edit project tests", () => {
        beforeEach(() => {
            cy.get("#btn-project-edit").click();
        });

        it("should show error messages if input are invalid", () => {
            cy.get("#text-title").clear();
            cy.get("#text-description").clear();
            cy.get("input[name='deadline']").clear().type(dateToString(today));
            cy.get("#btn-submit").click();
    
            cy.contains("div", "Title field is required!");
            cy.contains("div", "Description field is required!");
            cy.contains("div", "Deadline field is invalid!");
        });
    
        it("should create project without deadline inputted", () => {
            cy.mockServerRequest("POST", "/projects", 201, {
                projectId: 1
            });
    
            cy.get("#text-title").type(project.title);
            cy.get("#text-description").type(project.description);
            cy.get("#btn-submit").click();
            cy.url().should("include", "/1");
    
        });
    
        it("should create project with deadline inputted", () => {
            cy.mockServerRequest("POST", "/projects", 201, {
                projectId: 1
            });
    
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
    
            cy.get("#text-title").type(project.title);
            cy.get("#text-description").type(project.description);
            cy.get("#text-description").type(dateToString(tomorrow));
            cy.get("#btn-submit").click();
    
            cy.url().should("include", "/1");
    
        });
    })

    describe("Add user tests", () => {
        beforeEach(() => {
            cy.get("#btn-invite").click();
        })

        function mockAddUser(status, value) {
            cy.mockServerRequest("POST", "/positions", status, value);
        }

        function submit(email) {
            cy.get("#text-email").type(email);
            cy.get("#button-submit").click();
        }

        it("Should show error if email field is empty", () => {
            cy.get("#text-email").click();
            cy.get("#button-submit").click();

            cy.contains("div","Email field is required!");
        })

        it("Should show error if email is invalid", () => {
            submit("email")

            cy.contains("div","Email is invalid!");
        })

        it("Should show error if user not found", () => {
            mockAddUser(400, { message: "USER_NOT_FOUND" });

            submit(user.email);

            cy.contains("div","User is not found!");
        });

        it("Should show error if user is already assigned", () => {
            mockAddUser(400, { message: "USER_ALREADY_ASSIGNED" });

            submit(user.email);

            cy.contains("div","User has already assigned!");
        });

        it("Should show error if user is already assigned", () => {
            mockAddUser(201);

            submit(user.email);

            cy.contains("div","User is successfully assigned!");
        });
    })
});
