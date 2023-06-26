const characterHealthTracker = (state = {
    stunWounds: 0,
    lethalWounds: 0,
    aggWounds: 0
}, action) => {
    if (action.type === "SET_CHARACTER_STATUS") {
console.log(`action.payload:`, action.payload);
        return {
            stunWounds: action.payload.current_stun,
            lethalWounds: action.payload.current_lethal,
            aggWounds: action.payload.current_agg
        }
    }
    if (action.type === "ADD_STUN_WOUND") {
        return {...state, stunWounds: state.stunWounds+1}
    }
    if (action.type === "ADD_LETHAL_WOUND") {
        return {...state, stunWounds: state.stunWounds-1, lethalWounds: state.lethalWounds+1}
    }
    if (action.type === "ADD_AGG_WOUND") {
        return {...state, lethalWounds: state.lethalWounds-1, aggWounds: state.aggWounds+1}
    }
    if (action.type === "REMOVE_WOUND") {
        return {...state, aggWounds: state.aggWounds-1}
    }
    if (action.type === "CLEAR_WOUNDS") {
        return {
            stunWounds: 0,
            lethalWounds: 0,
            aggWounds: 0
        }
    }
    return state
}

export default characterHealthTracker;