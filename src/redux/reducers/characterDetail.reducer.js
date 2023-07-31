const characterDetail = (state = {}, action) => {
    if (action.type === "SET_CHARACTER_DETAIL") {
        return action.payload;
    }
    if (action.type === 'CLEAR_CHARACTER_DETAIL') {
        return {}
    }

    if (action.type === 'GM_CHANGE_XP') {
        return {...state,
        max_xp: state.max_xp + action.payload}
    }
    if (action.type === 'GM_CHANGE_BANK') {
        return {...state,
        bank: state.bank + action.payload}
    }
    return state
}

export default characterDetail;