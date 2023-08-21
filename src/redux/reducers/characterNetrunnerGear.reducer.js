const characterNetrunnerGear = (state = [], action) => {
    if (action.type === "SET_CHARACTER_NETRUNNER_GEAR") {
        return action.payload
    }
    return state
}

export default characterNetrunnerGear