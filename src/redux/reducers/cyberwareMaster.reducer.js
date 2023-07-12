const cyberwareMaster = (state = [], action) => {
    if (action.type === "SET_CYBERWARE_LIST") {
        return action.payload
    }
    return state
}

export default cyberwareMaster