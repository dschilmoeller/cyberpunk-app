const armorMaster = (state = [], action) => {
    if (action.type === "SET_ARMOR_LIST") {
        return action.payload
    }
    return state
}

export default armorMaster