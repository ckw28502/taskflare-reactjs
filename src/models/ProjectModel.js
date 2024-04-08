class ProjectModel {
    #title;
    #description;
    #deadline;

    constructor({ title, description, deadline }) {
        this.#title = title;
        this.#description = description;
        this.#deadline = deadline;
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
}

export default ProjectModel;