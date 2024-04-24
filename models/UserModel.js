class UserModel {
    #email;
    #name;

    constructor(email){
        this.#email = email;
    }

    getEmail() {
        return this.#email;
    }
    
    getName() {
        return this.#name;
    }
}

export default UserModel;
