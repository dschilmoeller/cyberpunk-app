const treasureMaster = (state = {
    armor: [],
    shields: [],
    miscGear: [],
    netrunnerGear: [],
    weapons: [],
    cyberware: [],
    vehicles: []
}, action) => {
    if (action.type === "SET_TREASURE_ARMOR_LIST") {
        return {
            ...state,
            armor: action.payload
        }
    }
    if (action.type === "SET_TREASURE_SHIELD_LIST") {
        return {
            ...state,
            shields: action.payload
        }
    }
    if (action.type === "SET_TREASURE_MISC_GEAR_LIST") {
        return {
            ...state,
            miscGear: action.payload
        }
    }
    if (action.type === "SET_TREASURE_NETRUNNER_LIST") {
        return {
            ...state,
            netrunnerGear: action.payload
        }
    }
    if (action.type === "SET_TREASURE_WEAPON_LIST") {
        return {
            ...state,
            weapons: action.payload
        }
    }
    if (action.type === "SET_TREASURE_CYBERWARE_LIST") {
        return {
            ...state,
            cyberware: action.payload
        }
    }
    if (action.type === "SET_TREASURE_VEHICLE_LIST") {
        return {
            ...state,
            vehicles: action.payload
        }
    }
    return state
}

export default treasureMaster