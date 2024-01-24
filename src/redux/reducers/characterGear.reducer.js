const characterGear = (state = {
    armor: [],
    shield: [],
    weapons: [],
    grenades: [],
    gear: [],
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
                cyberware: [],
                netrunnerGear: [],
                vehicles: [],
                vehicleMods: [],
            }
        case 'SET_CHARACTER_EQUIPMENT':
            return {
                ...state,
                armor: action.payload.armor,
                shield: action.payload.shield,
                weapons: action.payload.weapons,
                grenades: action.payload.grenades,
                gear: action.payload.miscGear,
                cyberware: action.payload.cyberware,
                netrunnerGear: action.payload.netrunnerGear,
                vehicles: action.payload.vehicles,
                vehicleMods: action.payload.vehicleMods
            }
        // weapon handlers
        case 'CLEAR_CHARACTER_WEAPONS':
            return {
                ...state,
                weapons: []
            }
        case 'FIRE_ONE_SHOT':
            // map through current weapons and increase shots fired - logic to allow this or not is handled on front end.
            return {
                ...state,
                weapons: state.weapons.map(weapon => {
                    // if weapon.weapon_bridge_id matches the payload...
                    if (weapon.weapon_bridge_id === action.payload) {
                        // ...return current weapon object with +1 to current shots fired inside the object
                        return { ...weapon, current_shots_fired: weapon.current_shots_fired + 1 }
                    } else {
                        // else return current weapon status
                        return weapon;
                    }
                })
            }
        case 'FIRE_WEAPON_AUTOMATIC':
            // as FIRE_ONE_SHOT but fires 10.
            return {
                ...state,
                weapons: state.weapons.map(weapon => {
                    if (weapon.weapon_bridge_id === action.payload) {
                        return { ...weapon, current_shots_fired: weapon.current_shots_fired + 10 }
                    };
                    return weapon;
                })
            }
        case 'RELOAD_WEAPON':
            // as FIRE_ONE_SHOT but resets shots fired to 0.
            return {
                ...state,
                weapons: state.weapons.map(weapon => {
                    if (weapon.weapon_bridge_id === action.payload) {
                        return { ...weapon, current_shots_fired: 0 }
                    };
                    return weapon;
                })
            }

        // handle shield and armor losses / repairs from in play sheet
        case 'CHARACTER_LOSE_ONE_SHIELD_QUALITY':
            return {
                ...state,
                shield: {
                    ...state.shield,
                    this_shield_loss: state.shield.this_shield_loss + 1
                }
            }
        case 'CHARACTER_ADD_ONE_SHIELD_QUALITY':
            return {
                ...state,
                shield: {
                    ...state.shield,
                    this_shield_loss: state.shield.this_shield_loss - 1
                }
            }
        case 'CHARACTER_LOSE_ONE_ARMOR_QUALITY':
            return {
                ...state,
                armor: {
                    ...state.armor,
                    this_armor_loss: state.armor.this_armor_loss + 1
                }
            }
        case 'CHARACTER_ADD_ONE_ARMOR_QUALITY':
            return {
                ...state,
                armor: {
                    ...state.armor,
                    this_armor_loss: state.armor.this_armor_loss - 1
                }
            }

        // Misc gear handlers
        case 'SET_CHARACTER_MISC_GEAR':
            return {
                ...state,
                gear: action.payload
            }
        case 'CLEAR_MISC_GEAR':
            return {
                ...state,
                gear: []
            }
        case 'CONSUMABLE_USED': {
            return {
                ...state,
                gear: state.gear.filter(gear => gear.char_gear_bridge_id !== action.payload.char_gear_bridge_id)
            }
        }
        case 'GRENADE_USED':
            return {
                ...state,
                grenades: state.grenades.filter(grenade => grenade.grenade_bridge_id !== action.payload.grenade_bridge_id)
            }


        // Cyberware Handlers
        case 'CLEAR_CHARACTER_CYBER_DETAIL':
            return {
                ...state,
                cyberware: []
            }
        case 'SET_CHARACTER_CYBER_DETAIL':
            return {
                ...state,
                cyberware: action.payload
            }


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