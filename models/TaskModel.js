class TaskModel {
    #assigneeId;
    #assigneeEmail;
    #assigneeName;
    #title;
    #description;
    #deadline;
    #id;
    #status;
  
    constructor(task) {
      this.#id = task.id;
      this.#title = task.title;
      this.#description = task.description;
      this.#deadline = task.deadline;
      this.#assigneeId = task.assigneeId;
      this.#assigneeEmail = task.assigneeEmail;
      this.#assigneeName = task.assigneeName;
      this.#status = task.status;
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

    getAssigneeId() {
        return this.#assigneeId;
    }

    getAssigneeEmail() {
        return this.#assigneeEmail;
    }

    getAssigneeName() {
        return this.#assigneeName;
    }

    getStatus() {
        return this.#status;
    }

    setStatus(status) {
        this.#status = status;
    }
}

export default TaskModel;
