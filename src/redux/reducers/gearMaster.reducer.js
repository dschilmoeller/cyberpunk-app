const gearMaster = (state = {
    armor: [],
    shields: [],
    weapons: [],
    grenades: [],
    miscGear: [],
    cyberware: [],
    netrunnerGear: [],
    vehicles: [],
    vehicleMods: [],
    clothing: [],
    lifestyle: []
}, action) => {
    switch (action.type) {
        case "SET_MASTER_EQUIPMENT_LISTS":
            return {
                ...state,
                armor: action.payload.armor,
                shields: action.payload.shields,
                weapons: action.payload.weapons,
                grenades: action.payload.grenades,
                miscGear: action.payload.miscGear,
                cyberware: action.payload.cyberware,
                netrunnerGear: action.payload.netrunnerGear,
                vehicles: action.payload.vehicles,
                vehicleMods: action.payload.vehicleMods,
                clothing: action.payload.clothing,
                lifestyle: action.payload.lifestyle
            }
        case 'SET_ARMOR_MASTER_LISTS':
            return {
                ...state,
                armor: action.payload.armor,
                shields: action.payload.shields
            }
        case 'SET_WEAPON_MASTER_LIST':
            return {
                ...state,
                weapons: action.payload.weapons
            }
        case 'SET_GRENADE_MASTER_LIST':
            return {
                ...state,
                grenades: action.payload.grenades
            }
        case 'SET_MISC_GEAR_MASTER_LIST':
            return {
                ...state,
                miscGear: action.payload.miscGear
            }
        case 'SET_CYBERWARE_MASTER_LIST':
            return {
                ...state,
                cyberware: action.payload.cyberware
            }
        case 'SET_NETRUNNER_MASTER_LIST':
            return {
                netrunnerGear: action.payload.netrunnerGear
            }
        case 'SET_VEHICLE_MASTER_LISTS':
            return {
                ...state,
                vehicles: action.payload.vehicles,
                vehicleMods: action.payload.vehicleMods
            }
        case 'SET_CLOTHING_MASTER_LIST':
            return {
                ...state,
                clothing: action.payload.clothing
            }
        default:
            return state
    }
}

export default gearMaster