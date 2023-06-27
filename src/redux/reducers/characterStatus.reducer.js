const characterStatus = (state={
    current_stun: 0,
    current_lethal: 0,
    current_agg: 0,
    current_armor_loss: 0,
    current_luck_loss: 0
}, action) => {
    if (action.type === "SET_CHARACTER_STATUS") {
        return action.payload;
    }
    if (action.type === "ADD_STUN_WOUND") {
        return {...state, current_stun: state.current_stun+1}
    }
    if (action.type === "ADD_LETHAL_WOUND") {
        return {...state, current_stun: state.current_stun-1, current_lethal: state.current_lethal+1}
    }
    if (action.type === "ADD_AGG_WOUND") {
        return {...state, current_lethal: state.current_lethal-1, current_agg: state.current_agg+1}
    }
    if (action.type === "REMOVE_WOUND") {
        return {...state, current_agg: state.current_agg-1}
    }
    
    if (action.type === "REMOVE_ONE_ARMOR") {
        return {...state, current_armor_loss: state.current_armor_loss +1}
    }
    if (action.type === "ADD_ONE_ARMOR") {
        return {...state, current_armor_loss: state.current_armor_loss -1}
    }
    
    if (action.type === "REMOVE_ONE_LUCK") {
        return {...state, current_luck_loss: state.current_luck_loss +1}
    }
    if (action.type === "ADD_ONE_LUCK") {
        return {...state, current_luck_loss: state.current_luck_loss -1}
    }
    

    if (action.type === "CLEAR_CHARACTER_STATUS") {
        return {
    current_stun: 0,
    current_lethal: 0,
    current_agg: 0,
    current_armor_loss: 0,
    current_luck_loss: 0
};
    }
    return state
}

export default characterStatus;