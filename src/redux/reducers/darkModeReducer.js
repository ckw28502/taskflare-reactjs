const initialState = {
    isDarkMode: false
}

function darkModeReducer(state = initialState, action) {
    switch(action.type){

        case "TOOGLE_DARK_MODE":
            return {
                ...state,
                isDarkMode: !state.isDarkMode
            };

        default:
            return state;
    }
}

export default darkModeReducer;