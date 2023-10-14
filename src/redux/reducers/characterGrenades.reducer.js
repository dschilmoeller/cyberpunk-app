const characterGrenades = (state = [], action) => {
    if (action.type === "SET_CHARACTER_GRENADES") {
        return action.payload;
    }
    if (action.type === 'GRENADE_USED') {
        return state.filter(grenade => grenade.grenade_bridge_id !== action.payload.grenade_bridge_id)
    }
    return state;
}

export default characterGrenades;