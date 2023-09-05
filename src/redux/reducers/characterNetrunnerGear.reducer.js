const characterNetrunnerGear = (state = [], action) => {
    if (action.type === 'CLEAR_CHARACTER_NETRUNNER_GEAR') {
        return [];
    }
    if (action.type === "SET_CHARACTER_NETRUNNER_GEAR") {
        return action.payload
    }

    if (action.type === 'PREP_CHARACTER_NETRUNNER_GEAR') {
        return state.map(item => {
            // logic
            return {
                ...item,
                active: false,
                current_rez_damage: 0
            }
        })
    }

    if (action.type === 'ACTIVATE_NETRUNNER_GEAR') {
        return state.map(item => {
            if (item.netrunner_bridge_id === action.payload) {
                return {
                    ...item,
                    active: true
                }
            } else {
                return item
            }
        })
    }

    if (action.type === 'RELOAD_NETRUNNER_GEAR') {
        return state.map(item => {
            if (item.netrunner_bridge_id === action.payload) {
                return {
                    ...item,
                    active: true,
                    current_rez_damage: 0
                }
            } else {
                return item
            }
        })
    }

    if (action.type === 'DEACTIVATE_NETRUNNER_GEAR') {
        return state.map(item => {
            if (item.netrunner_bridge_id === action.payload) {
                return {
                    ...item,
                    active: false
                }
            } else {
                return item
            }
        })
    }

    if (action.type === 'LOSE_ONE_REZ') {
        return state.map(item => {
            if (item.netrunner_bridge_id === action.payload) {
                return {
                    ...item,
                    current_rez_damage: item.current_rez_damage + 1
                }
            } else {
                return item
            }
        })
    }

    if (action.type === 'NETRUNNER_SOFTWARE_DEACTIVATED') {
        return state.map(item => {
            if (item.netrunner_bridge_id === action.payload) {
                return {
                    ...item,
                    active: false,
                    current_rez_damage: 0
                }
            } else {
                return item
            }
        })
    }

    return state
}

export default characterNetrunnerGear