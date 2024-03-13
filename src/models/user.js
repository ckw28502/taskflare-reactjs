class user {
    #email;

    constructor(email){
        this.#email = email;
    }

    getEmail() {
        return this.#email;
    }
}

export default user;
