const characterMiscGear = (state = [], action) => {
    if (action.type === "SET_CHARACTER_MISC_GEAR") {
        return action.payload;
    }
    if (action.type === 'CONSUMABLE_USED') {
        console.log(`action.payload:`, action.payload);
        return state.filter(gear => gear.char_gear_bridge_id !== action.payload.char_gear_bridge_id)
    }
    return state;
}

export default characterMiscGear;