const vehicleModMaster = (state = [], action) => {
    if (action.type === "SET_VEHICLE_MOD_LIST") {
        return action.payload
    }
    return state
}

export default vehicleModMaster