const shieldMaster = (state = [], action) => {
    if (action.type === "SET_SHIELD_LIST") {
        return action.payload
    }
    return state
}

export default shieldMaster