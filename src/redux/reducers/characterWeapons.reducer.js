const characterWeapons = (state = [], action) => {
    if (action.type === "SET_CHARACTER_WEAPONS") {
        return action.payload;
    }
    switch (action.type) {
        case 'FIRE_ONE_SHOT':
            // map through current weapons
            return state.map(weapon => {
                // if weapon.weapon_bridge_id matches the payload
                if (weapon.weapon_bridge_id === action.payload) {
                    // return current weapon object with +1 to current shots fired inside the object
                    return { ...weapon, current_shots_fired: weapon.current_shots_fired + 1 }
                };
                // no need to spread as no changes being made.
                return weapon;
            });
        case 'RELOAD_ONE_SHOT':
            // as fire one shot but obv. reloading.
            return state.map(weapon => {
                if (weapon.weapon_bridge_id === action.payload) {
                    return { ...weapon, current_shots_fired: weapon.current_shots_fired - 1 }
                };
                return weapon;
            });
        case 'RELOAD_WEAPON':
            return state.map(weapon => {
                if (weapon.weapon_bridge_id === action.payload) {
                    return { ...weapon, current_shots_fired: 0 }
                };
                return weapon;
            });
        case 'FIRE_WEAPON_AUTOMATIC':
            return state.map(weapon => {
                if (weapon.weapon_bridge_id === action.payload) {
                    return { ...weapon, current_shots_fired: weapon.current_shots_fired + 10 }
                };
                return weapon;
            });
        default: return state
    }
}

export default characterWeapons;