const miscGearMaster = (state = [], action) => {
    if (action.type === "SET_MISC_GEAR_LIST") {
        return action.payload
    }
    return state
}

export default miscGearMaster