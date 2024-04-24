class ProjectModel {
    #id;
    #title;
    #description;
    #deadline;

    constructor({ id, title, description, deadline }) {
        this.#id = id;
        this.#title = title;
        this.#description = description;
        this.#deadline = deadline;
    }

    getId() {
        return this.#id;
    }

    getTitle() {
        return this.#title;
    }

    getDescription() {
        return this.#description;
    }

    getDeadline() {
        return this.#deadline;
    }

    editProject({ title, description, deadline }) {
        this.#title = title;
        this.#description = description;
        this.#deadline = deadline;
    }
}

export default ProjectModel;