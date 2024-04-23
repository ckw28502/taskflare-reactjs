describe("Project page tests", () => {
    let project;

    let user;

    let today;

    let tasks;

    let task;

    let positions;
    before(async() => {
        await Promise.all([
            cy.fixture("projects.json"),
            cy.fixture("users.json"),
            cy.fixture("tasks.json")
          ]).then(([projectData, userData, taskData]) => {
            project = projectData.project;
            user = userData.user;
            tasks = [];
            for (const taskDatum of taskData.tasks) {
                tasks.push(fillTaskResponse(taskDatum, user));
            }
            task = fillTaskResponse(taskData.task, user);

            positions = userData.users.map(userDatum => {
                return {
                    id: userDatum.id,
                    email: userDatum.email
                }
            })
        });
        today = new Date();
    });

    function fillTaskResponse(task, user) {
        return {
            id: task.id,
            assigneeId: "1",
            assigneeName: user.name,
            assigneeEmail: user.email,
            title: task.title,
            description: task.description,
            deadline: null,
            status: "PLANNED"
        };
    }

    beforeEach(() => {
        cy.mockServerRequest("GET", "/projects/3", 200, project);
        cy.mockServerRequest("GET", "/tasks/3", 200, tasks);
        cy.mockServerRequest("GET", "/positions/3", 200, positions);

        cy.visit(`${Cypress.env("base_url")}/3`, {
            onBeforeLoad: win => {
                win.sessionStorage.setItem("token", "token");
            }
        });
    });

    function dateToString(date) {
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();

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
    
        it("should edit project without deadline inputted", () => {
            cy.mockServerRequest("PUT", "/projects", 204, null);
    
            cy.get("#text-title").clear().type(project.title);
            cy.get("#text-description").clear().type(project.description);
            cy.get("#btn-submit").click();

            cy.get("#h2-title").should("have.text", project.title.toUpperCase()); 
            cy.contains("div", "Project successfully modified!") ;
        });
    
        it("should edit project with deadline inputted", () => {
            cy.mockServerRequest("PUT", "/projects", 204, null);

    
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);

            cy.get("#text-title").clear().type(project.title);
            cy.get("#text-description").clear().type(project.description);
            cy.get("input[name='deadline']").clear().type(dateToString(tomorrow));
            cy.get("#btn-submit").click();
    
            cy.get("#h2-title").should("have.text", project.title.toUpperCase()); 
            cy.contains("div", "Project successfully modified!") ; 
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

        it("Should assign user", () => {
            mockAddUser(201);

            submit(user.email);

            cy.contains("div","User is successfully assigned!");
        });
    })

    describe("Remove position tests", () => {
        beforeEach(() => {
            cy.get("#btn-project-exit").click();
        })

        it("Should not remove self", () => {
            cy.get("#btn-no").click();

            cy.url().should("include", `/${project.id}`);
        });

        it("Should remove self", () => {
            cy.mockServerRequest("DELETE", `/positions/${project.id}`, 204)

            cy.get("#btn-yes").click();

            cy.url().should("not.include", `/${project.id}`);
        });
    })

    describe("Add task tests", () => {
        beforeEach(() => {
            cy.get("#btn-task-add").click();
        })

        it("Should show error if input invalid", () => {
            cy.get("#text-title").click();
            cy.get("#text-description").click();
            cy.get("input[name='deadline']").type(dateToString(today));
            cy.get("#btn-submit").click();
    
            cy.contains("div", "Title field is required!");
            cy.contains("div", "Description field is required!");
            cy.contains("div", "Deadline field is invalid!");
        });

        it("should create task without deadline inputted", () => {
            cy.mockServerRequest("POST", "/tasks", 201, task);
    
            cy.get("#text-title").type(task.title);
            cy.get("#text-description").type(task.description);
            cy.get("#btn-submit").click();

            cy.get(`#card-project-${task.id}`).should("exist");
            cy.contains("div", "Task created successfully!");
        });
    
        it("should create task with deadline inputted", () => {
            cy.mockServerRequest("POST", "/tasks", 201, task);
    
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
    
            cy.get("#text-title").type(task.title);
            cy.get("#text-description").type(task.description);
            cy.get("input[name='deadline']").type(dateToString(tomorrow));
            cy.get("#btn-submit").click();
    
            cy.get(`#card-project-${task.id}`).should("exist");
            cy.contains("div", "Task created successfully!");
        });

        it("should create task with user inputted", () => {
            cy.mockServerRequest("POST", "/tasks", 201, task);
    
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
    
            cy.get("#select-user").click();
            cy.contains("li", positions[0].email.toUpperCase()).click();
            cy.get("#text-title").type(task.title);
            cy.get("#text-description").type(task.description);
            cy.get("#btn-submit").click();
    
            cy.get(`#card-project-${task.id}`).should("exist");
            cy.contains("div", "Task created successfully!");
        });

        it("should create task with user and deadline inputted", () => {
            cy.mockServerRequest("POST", "/tasks", 201, task);
    
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
    
            cy.get("#select-user").click();
            cy.contains("li", positions[0].email.toUpperCase()).click();
            cy.get("#text-title").type(task.title);
            cy.get("#text-description").type(task.description);
            cy.get("input[name='deadline']").type(dateToString(tomorrow));
            cy.get("#btn-submit").click();
    
            cy.get(`#card-project-${task.id}`).should("exist");
            cy.contains("div", "Task created successfully!");
        });
    })

    describe("Edit task tests", () => {
        beforeEach(() => {
            cy.get("#edit-task-1").click();
        })

        it("Should show error if input invalid", () => {
            cy.get("#text-title").clear();
            cy.get("#text-description").clear();
            cy.get("input[name='deadline']").clear().type(dateToString(today));
            cy.get("#btn-submit").click();
    
            cy.contains("div", "Title field is required!");
            cy.contains("div", "Description field is required!");
            cy.contains("div", "Deadline field is invalid!");
        });

        it("should edit task without deadline inputted", () => {
            cy.mockServerRequest("PUT", "/tasks", 200, task);
    
            cy.get("#text-title").type(task.title);
            cy.get("#text-description").type(task.description);
            cy.get("#btn-submit").click();

            cy.contains("div", "Task successfully modified!");
        });
    
        it("should edit task with deadline inputted", () => {
            cy.mockServerRequest("PUT", "/tasks", 200, task);
    
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
    
            cy.get("#text-title").type(task.title);
            cy.get("#text-description").type(task.description);
            cy.get("input[name='deadline']").type(dateToString(tomorrow));
            cy.get("#btn-submit").click();
    
            cy.contains("div", "Task successfully modified!");
        });

        it("should edit task with user inputted", () => {
            cy.mockServerRequest("PUT", "/tasks", 200, task);
    
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
    
            cy.get("#select-user").click();
            cy.contains("li", positions[0].email.toUpperCase()).click();
            cy.get("#text-title").type(task.title);
            cy.get("#text-description").type(task.description);
            cy.get("#btn-submit").click();
    
            cy.contains("div", "Task successfully modified!");
        });

        it("should edit task with user and deadline inputted", () => {
            cy.mockServerRequest("PUT", "/tasks", 200, task);
    
            const tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
    
            cy.get("#select-user").click();
            cy.contains("li", positions[0].email.toUpperCase()).click();
            cy.get("#text-title").type(task.title);
            cy.get("#text-description").type(task.description);
            cy.get("input[name='deadline']").type(dateToString(tomorrow));
            cy.get("#btn-submit").click();
    
            cy.contains("div", "Task successfully modified!");
        });
    })

    describe("Delete task tests", () => {
        beforeEach(() => {
            cy.get("#delete-task-1").click();
        })

        it("Should not delete task", () => {
            cy.get("#btn-no").click();

            cy.get("#card-project-1").should("exist");
        });

        it("Should delete task", () => {
            cy.mockServerRequest("DELETE", "/tasks/1", 204)

            cy.get("#btn-yes").click();

            cy.get("#card-project-1").should("not.exist");
            cy.contains("div", "Task successfully deleted!");
        });
    })
});
