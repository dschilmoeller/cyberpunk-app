const characterList = (state=[], action) => {
    if (action.type === "SET_CHARACTER_LIST") {
        return action.payload;
    }
    return state
}

export default characterList;