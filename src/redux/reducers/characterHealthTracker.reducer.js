const characterHealthTracker = (state = {
    stunWounds: 0,
    lethalWounds: 0,
    aggWounds: 0
}, action) => {
    if (action.type === "SET_WOUNDS") {
        return action.payload;
    }
    if (action.type === "CLEAR_WOUNDS") {
        return {
            stunWounds: 0,
            lethalWounds: 0,
            aggWounds: 0
        }
    }
    return state
}

export default characterHealthTracker;