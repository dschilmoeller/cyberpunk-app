const characterGear = (state = {
    armor: [],
    shield: [],
    weapons: [],
    grenades: [],
    gear: [],
    pharma: [],
    cyberware: [],
    netrunnerGear: [],
    vehicles: [],
    vehicleMods: [],
}, action) => {
    switch (action.type) {
        case 'CLEAR_CHARACTER_GEAR_DETAILS':
            return {
                armor: [],
                shield: [],
                weapons: [],
                grenades: [],
                gear: [],
                pharma: [],
                cyberware: [],
                netrunnerGear: [],
                vehicles: [],
                vehicleMods: [],
            }
        case 'CLEAR_CHARACTER_WEAPONS':
            return {
                ...state,
                weapons: []
            }
        case 'CLEAR_MISC_GEAR':
            return {
                ...state,
                gear: []
            }
        case 'CLEAR_CHARACTER_CYBER_DETAIL':
            return {
                ...state,
                cyberware: []
            }
        case 'SET_CHARACTER_EQUIPMENT':
            return {
                ...state,
                armor: action.payload.armor,
                shield: action.payload.shield,
                weapons: action.payload.weapons,
                grenades: action.payload.grenades,
                gear: action.payload.miscGear,
                pharma: action.payload.pharma,
                cyberware: action.payload.cyberware,
                netrunnerGear: action.payload.netrunnerGear,
                vehicles: action.payload.vehicles,
                vehicleMods: action.payload.vehicleMods
            }
        case 'SET_CHARACTER_ARMOR':
            return {
                ...state,
                armor: action.payload
            }
        case 'SET_CHARACTER_SHIELD':
            return {
                ...state,
                shield: action.payload
            }
        case 'SET_CHARACTER_WEAPONS':
            return {
                ...state,
                weapons: action.payload
            }
        case 'SET_CHARACTER_GRENADES':
            return {
                ...state,
                grenades: action.payload
            }
        case 'SET_CHARACTER_MISC_GEAR':
            return {
                ...state,
                gear: action.payload
            }
        case 'SET_CHARACTER_PHARMA_GEAR':
            return {
                ...state,
                pharma: action.payload
            }

        // Cyberware Handlers

        // case 'SET_CHARACTER_CYBER_DETAIL':
        //     return {
        //         ...state,
        //         cyberware: action.payload
        //     }
        // Netrunner Gear Handlers
        case 'CLEAR_CHARACTER_NETRUNNER_GEAR':
            return {
                ...state,
                netrunnerGear: []
            }
        case 'PREP_CHARACTER_NETRUNNER_GEAR':
            return {
                ...state,
                netrunnerGear: state.netrunnerGear.map(item => {
                    // logic
                    return {
                        ...item,
                        active: false,
                        current_rez_damage: 0
                    }
                })
            }
        case 'ACTIVATE_NETRUNNER_GEAR':
            return {
                ...state,
                netrunnerGear: state.netrunnerGear.map(item => {
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
        case 'RELOAD_NETRUNNER_GEAR':
            return {
                ...state,
                netrunnerGear: state.netrunnerGear.map(item => {
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
        case 'DEACTIVATE_NETRUNNER_GEAR':
            return {
                ...state,
                netrunnerGear: state.netrunnerGear.map(item => {
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
        case 'LOSE_ONE_REZ':
            return {
                ...state,
                netrunnerGear: state.netrunnerGear.map(item => {
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
        case 'NETRUNNER_SOFTWARE_DEACTIVATED':
            return {
                ...state,
                netrunnerGear: state.netrunnerGear.map(item => {
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


        // vehicle handlers
        case 'CLEAR_CHARACTER_VEHICLES':
            return {
                ...state,
                vehicles: []
            }
        case 'VEHICLE_ADD_ONE_DAMAGE':
            return {
                ...state,
                vehicles: state.vehicles.map(vehicle => {
                    if (vehicle.vehicle_bridge_id === action.payload) {
                        return { ...vehicle, current_damage: vehicle.current_damage + 1 }
                    };
                    return vehicle;
                })
            }
        case 'VEHICLE_REMOVE_ONE_DAMAGE':
            return {
                ...state,
                vehicles: state.vehicles.map(vehicle => {
                    if (vehicle.vehicle_bridge_id === action.payload) {
                        return { ...vehicle, current_damage: vehicle.current_damage - 1 }
                    };
                    return vehicle;
                })
            }
        case 'VEHICLE_ADD_ONE_ARMOR_DAMAGE':
            return {
                ...state,
                vehicles: state.vehicles.map(vehicle => {
                    if (vehicle.vehicle_bridge_id === action.payload) {
                        return { ...vehicle, current_armor_damage: vehicle.current_armor_damage + 1 }
                    };
                    return vehicle;
                })
            }
        case 'VEHICLE_REMOVE_ONE_ARMOR_DAMAGE':
            return {
                ...state,
                vehicles: state.vehicles.map(vehicle => {
                    if (vehicle.vehicle_bridge_id === action.payload) {
                        return { ...vehicle, current_armor_damage: vehicle.current_armor_damage - 1 }
                    };
                    return vehicle;
                })
            }
        default: return state
    }

}

export default characterGear;