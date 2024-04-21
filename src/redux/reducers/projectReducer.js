const initialState = {
    id: "",
    title: "",
    description: "",
    deadline: ""
};

function projectReducer(state = initialState, action) {
    switch (action.type) {
        case "SET_PROJECT":
            return {
                ...state,
                ...action.payload
            };
        case "REMOVE_PROJECT":
            return initialState;    
        default:
            return state;
    }
}

export default projectReducer;