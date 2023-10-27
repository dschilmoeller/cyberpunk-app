const campaigns = (state = [], action) => {
    if (action.type === "SET_CAMPAIGN_LIST") {
        return action.payload
    }
    return state
}

export default campaigns