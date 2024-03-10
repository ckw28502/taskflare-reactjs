import errors from "./error.json"

function getError(errorCode) {
    return errors[errorCode] || "Oops, something went wrong!";
}

export default getError;