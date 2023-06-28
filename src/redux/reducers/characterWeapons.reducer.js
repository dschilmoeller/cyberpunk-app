const characterWeapons = (state=[], action) => {
    if (action.type === "SET_CHARACTER_WEAPONS") {
        return action.payload;
    }
    if (action.type === "FIRE_ONE_SHOT") {
        
    }
    return state
}

export default characterWeapons;