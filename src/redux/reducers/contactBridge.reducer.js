const contactBridge = (state = [], action) => {
    switch (action.type) {
        case "SET_CONTACT_BRIDGE_DATA":
            return action.payload
        default:
            return state
    }
}

export default contactBridge