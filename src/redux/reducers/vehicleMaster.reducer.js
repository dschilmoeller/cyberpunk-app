const vehicleMaster = (state = [], action) => {
    if (action.type === "SET_VEHICLE_LIST") {
        return action.payload
    }
    return state
}

export default vehicleMaster