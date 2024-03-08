const loaders = (state = {
    inPlaySheet: false,
    advancementSheet: false
}, action) => {
    switch (action.type) {
        case 'SET_CHARSHEET_LOAD_STATUS':
            return {
                ...state,
                inPlaySheet: action.payload
            }
        case 'SET_ADVANCEMENT_LOAD_STATUS':
            return {
                ...state,
                advancementSheet: action.payload
            }
        default:
            return state
    }

}

export default loaders