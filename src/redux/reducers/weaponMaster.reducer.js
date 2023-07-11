const weaponMaster = (state = [], action) => {
    if (action.type === "SET_WEAPON_LIST") {
        return action.payload
    }
    return state
}

export default weaponMaster