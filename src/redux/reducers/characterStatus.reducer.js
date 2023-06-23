const characterStatus = (state=[], action) => {
    if (action.type === "SET_CHARACTER_STATUS") {
        return action.payload;
    }
    return state
}

export default characterStatus;