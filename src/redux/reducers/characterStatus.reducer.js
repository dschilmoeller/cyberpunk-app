const characterStatus = (state = {
    current_stun: 0,
    current_lethal: 0,
    current_agg: 0,
    current_armor_loss: 0,
    current_luck_loss: 0,
}, action) => {
    switch (action.type) {
        case 'CLEAR_CHARACTER_STATUS':
            return {
                current_stun: 0,
                current_lethal: 0,
                current_agg: 0,
                current_armor_loss: 0,
                current_luck_loss: 0,
            }
        case 'SET_CHARACTER_STATUS':
            return action.payload;
        case 'SET_ADVANCEMENT_STATUS':
            return action.payload;
        case 'ADD_STUN_WOUND':
            return { ...state, current_stun: state.current_stun + 1 }
        case 'ADD_LETHAL_WOUND':
            return { ...state, current_stun: state.current_stun - 1, current_lethal: state.current_lethal + 1 }
        case 'ADD_AGG_WOUND':
            return { ...state, current_lethal: state.current_lethal - 1, current_agg: state.current_agg + 1 }
        case 'REMOVE_WOUND':
            return { ...state, current_agg: state.current_agg - 1 }
        case 'REMOVE_ONE_ARMOR':
            return { ...state, current_armor_loss: state.current_armor_loss + 1 }
        case 'ADD_ONE_ARMOR':
            return { ...state, current_armor_loss: state.current_armor_loss - 1 }
        case 'REMOVE_ONE_LUCK':
            return { ...state, current_luck_loss: state.current_luck_loss + 1 }
        case 'ADD_ONE_LUCK':
            return { ...state, current_luck_loss: state.current_luck_loss - 1 }
        case 'CLEAR_CHARACTER_STATUS':
            return {
                current_stun: 0,
                current_lethal: 0,
                current_agg: 0,
                current_armor_loss: 0,
                current_luck_loss: 0,
            };
        default:
            return state
    }
}

export default characterStatus;