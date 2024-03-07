const characterStatus = (state = {
    current_stun: 0,
    current_lethal: 0,
    current_agg: 0,
    current_luck_loss: 0,
}, action) => {
    switch (action.type) {
        case 'CLEAR_CHARACTER_STATUS':
            return {
                current_stun: 0,
                current_lethal: 0,
                current_agg: 0,
                current_luck_loss: 0,
            }
        case 'SET_CHARACTER_STATUS':
            return action.payload;
        case 'SET_ADVANCEMENT_STATUS':
            return action.payload;
        default:
            return state
    }
}

export default characterStatus;