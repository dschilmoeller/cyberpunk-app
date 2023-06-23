const characterStatus = (state=[], action) => {
    if (action.type === "SET_CHARACTER_STATUS") {
        return action.payload;
    }
    if (action.type === "CLEAR_CHARACTER_STATUS") {
        return [];
    }
    return state
}

export default characterStatus;