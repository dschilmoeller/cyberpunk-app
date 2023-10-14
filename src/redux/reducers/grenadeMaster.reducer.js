const grenadeMaster = (state = [], action) => {
    if (action.type === "SET_GRENADE_LIST") {
        return action.payload
    }
    return state
}

export default grenadeMaster