const characterStatus = (state=[{
    current_stun: 0,
    current_lethal: 0,
    current_agg: 0
}], action) => {
    if (action.type === "SET_CHARACTER_STATUS") {
        return action.payload;
    }
    if (action.type === "CLEAR_CHARACTER_STATUS") {
        return [];
    }
    return state
}

export default characterStatus;