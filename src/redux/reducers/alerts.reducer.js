const alerts = (state = {
    inPlaySheet: false,
    advancementSheet: false
}, action) => {
    switch (action.type) {
        case 'SET_CHARSHEET_ALERT_STATUS':
            return {
                ...state,
                inPlaySheet: action.payload
            }
        case 'SET_ADVANCEMENT_ALERT_STATUS':
        // currently only coming from advancementGarageOption to avoid throwing error when div is child of a <tr>    
        return {
                ...state,
                advancementSheet: action.payload
            }
        default:
            return state
    }

}

export default alerts