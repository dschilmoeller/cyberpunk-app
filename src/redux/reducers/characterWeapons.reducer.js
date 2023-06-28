const characterWeapons = (state=[], action) => {
    if (action.type === "SET_CHARACTER_WEAPONS") {
        return action.payload;
    }
    return state
}

export default characterWeapons;