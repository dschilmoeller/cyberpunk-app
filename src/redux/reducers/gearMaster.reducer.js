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
    if (action.type === "SET_MASTER_EQUIPMENT_LISTS") {
        return {
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
    }
    return state
}

export default gearMaster