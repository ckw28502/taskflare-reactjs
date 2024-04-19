describe("Projects page tests", () => {
    let projectData;

    let projects;

    before(async() => {
        projectData = await cy.fixture("projects.json");

        projects = projectData.projects;
    })

    beforeEach(() => {
        cy.mockServerRequest("GET", "/projects", 200, projects)
        cy.visit(Cypress.env("base_url"), {
            onBeforeLoad: win => {
                win.sessionStorage.setItem("token", "token");
            }
        });
    })

    describe("Create project tests", () => {
        let project;

        let today;

        before(() => {
            project = projectData.project;
        
            today = new Date();
        })

        beforeEach(() => {
            cy.get("#btn-add").click();
        })

        function dateToString() {
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const year = today.getFullYear();
    
            return `${month}${day}${year}`;
        }
    
        it("should show error messages if input are invalid", () => {
            cy.get("#text-title").click();
            cy.get("#text-description").click();
            cy.get("input[name='deadline']").type(dateToString(today));
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

    describe("Project list tests", () => {
        
        it("should go to the project page", () => {
            projects.forEach((project, index) => {
                const projectId = project.id;

                cy.mockServerRequest("GET", `/projects/${projectId}`, 200, project);

                cy.get(`#card-project-${projectId}`).click();

                cy.url().should("include", `/${projectId}`)

                if (index < projects.length - 1) {
                    cy.visit(Cypress.env("base_url"));
                }
            })
        })
    })
})