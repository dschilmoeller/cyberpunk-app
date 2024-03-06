const loaders = (state = {
    inPlaySheet: false
}, action) => {
    if (action.type === "SET_CHARSHEET_LOAD_STATUS") {
        return {
            ...state,
            inPlaySheet: action.payload
        }
    }
    return state
}

export default loaders