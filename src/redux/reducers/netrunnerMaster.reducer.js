const netrunnerGearMaster = (state = [], action) => {
    if (action.type === "SET_NETRUNNER_LIST") {
        return action.payload
    }
    return state
}

export default netrunnerGearMaster