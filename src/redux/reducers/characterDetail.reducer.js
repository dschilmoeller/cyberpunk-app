const characterDetail = (state = { saved: false }, action) => {
    switch (action.type) {
        case 'SET_CHARACTER_DETAIL':
            return action.payload;
        case 'CLEAR_CHARACTER_DETAIL':
            return {}
        case 'PLAYER_BURN_ONE_LUCK':
            return {
                ...state,
                max_luck: state.max_luck - 1
            }
        case 'MAKE_PHARMACEUTICAL':
            return {
                ...state,
                bank: action.payload.newBank
            }
        case 'SET_CHARACTER_BANK':
            return {
                ...state,
                bank: action.payload.bank
            }
        case 'SAVE_CHARACTER_SHEET':
            return {
                ...state,
                saved: false
            }
        case 'SET_SAVED_FALSE':
            return {
                ...state,
                saved: false
            }
        case 'CHARACTER_SHEET_SAVE_SUCCESSFUL':
            return {
                ...state,
                saved: true
            }
        default:
            return state
    }
}

export default characterDetail;