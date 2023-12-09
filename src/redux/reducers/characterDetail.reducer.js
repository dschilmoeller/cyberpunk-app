const characterDetail = (state = {}, action) => {
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
        case 'ARBITRARY_BANK_CHANGE':
            return {
                ...state,
                bank: action.payload
            }
        default:
            return state
    }
}

export default characterDetail;