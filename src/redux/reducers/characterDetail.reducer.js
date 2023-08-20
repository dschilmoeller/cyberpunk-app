const characterDetail = (state = {}, action) => {
    if (action.type === "SET_CHARACTER_DETAIL") {
        return action.payload;
    }
    if (action.type === 'CLEAR_CHARACTER_DETAIL') {
        return {}
    }

    if (action.type === 'GM_CHANGE_TEMP_HUMANITY_LOSS') {
        return {...state,
            temp_humanity_loss: state.temp_humanity_loss + action.payload}
    }
    
    if (action.type === 'GM_CHANGE_PERM_HUMANITY_LOSS') {
        return {
            ...state,
            perm_humanity_loss: state.perm_humanity_loss + action.payload
        }
    }
    if (action.type === 'GM_CHANGE_BANK') {
        return {
            ...state,
            bank: state.bank + action.payload
        }
    }
    if (action.type === 'GM_CHANGE_XP') {
        return {
            ...state,
            max_xp: state.max_xp + action.payload
        }
    }
    if (action.type === 'GM_CHANGE_STREET_CRED') {
        return {
            ...state,
            street_cred: state.street_cred + action.payload
        }
    }

    if (action.type === 'GM_CHANGE_PERM_LUCK') {
        return {...state,
        max_luck: state.max_luck + action.payload}
    }

    if (action.type === 'SAVE_GM_CHANGES') {
        return action.payload
    }

    if (action.type === 'PLAYER_BURN_ONE_LUCK') {
        return {
            ...state,
            max_luck: state.max_luck - 1
        }
    }

    if (action.type === 'MAKE_PHARMACEUTICAL') {
        return {
            ...state,
            bank: action.payload.newBank
        }
    }

    if (action.type === 'ARBITRARY_BANK_CHANGE') {
        return {
            ...state,
            bank: action.payload
        }
    }

    return state
}

export default characterDetail;