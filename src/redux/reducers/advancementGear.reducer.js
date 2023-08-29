const advancementGear = (state = {
    armor: [],
    shield: [],
    weapons: [],
    gear: [],
    cyberware: [],
    netrunnerGear: [],
    vehicles: [],
    vehicleMods: [],
    cyberwareSlots: {},
    totalArmorQuality: 0,
    totalShieldQuality: 0,
    totalCyberwareArmorQuality: 0,
    totalCyberwareHealthBoxesCreated: 0,
    useNomadFreebie: false,
    boughtArmor: [],
    soldArmor: [],
    armorID: 0,
    boughtShield: [],
    soldShield: [],
    shieldID: 0,
    boughtWeapons: [],
    soldWeapons: [],
    weaponID: 0,
    boughtMiscGear: [],
    soldMiscGear: [],
    miscGearID: 0,
    boughtNetrunnerGear: [],
    soldNetrunnerGear: [],
    netrunnerGearID: 0,
    boughtVehicles: [],
    soldVehicles: [],
    vehicleID: 0,
    boughtVehicleMods: [],
    soldVehicleMods: [],
    vehicleModID: 0,
    boughtCyberware: [],
    soldCyberware: [],
    cyberwareID: 0
}, action) => {
    if (action.type === 'SET_ADVANCEMENT_DETAIL') {
        return {
            ...state,
            totalArmorQuality: action.payload.current_armor_quality,
            totalShieldQuality: action.payload.current_shield_quality,
            totalCyberwareArmorQuality: action.payload.current_cyberware_armor_quality,
            totalCyberwareHealthBoxesCreated: action.payload.current_cyberware_health_boxes
        }
    }

    if (action.type === 'CLEAR_ADVANCEMENT_DETAIL') {
        return {
            armor: [],
            shield: [],
            weapons: [],
            gear: [],
            cyberware: [],
            netrunnerGear: [],
            vehicles: [],
            vehicleMods: [],
            cyberwareSlots: {},
            totalArmorQuality: 0,
            totalShieldQuality: 0,
            totalCyberwareArmorQuality: 0,
            totalCyberwareHealthBoxesCreated: 0,
            useNomadFreebie: false,
            boughtArmor: [],
            soldArmor: [],
            armorID: 0,
            boughtShield: [],
            soldShield: [],
            shieldID: 0,
            boughtWeapons: [],
            soldWeapons: [],
            weaponID: 0,
            boughtMiscGear: [],
            soldMiscGear: [],
            miscGearID: 0,
            boughtNetrunnerGear: [],
            soldNetrunnerGear: [],
            netrunnerGearID: 0,
            boughtVehicles: [],
            soldVehicles: [],
            vehicleID: 0,
            boughtVehicleMods: [],
            soldVehicleMods: [],
            vehicleModID: 0,
            boughtCyberware: [],
            soldCyberware: [],
            cyberwareID: 0
        }
    }
    if (action.type === 'SET_ADVANCEMENT_ARMOR') {
        return { ...state, armor: action.payload }
    } else if (action.type === 'SET_ADVANCEMENT_SHIELD') {
        return { ...state, shield: action.payload }
    } else if (action.type === 'SET_ADVANCEMENT_WEAPONS') {
        return { ...state, weapons: action.payload }
    } else if (action.type === 'SET_ADVANCEMENT_GEAR') {
        return { ...state, gear: action.payload }
    } else if (action.type === 'SET_ADVANCEMENT_CYBERWARE') {
        return { ...state, cyberware: action.payload }
    } else if (action.type === 'SET_ADVANCEMENT_CYBERWARE_SLOTS') {
        return { ...state, cyberwareSlots: action.payload }
    } else if (action.type === 'SET_ADVANCEMENT_NETRUNNER_GEAR') {
        return { ...state, netrunnerGear: action.payload }
    } else if (action.type === 'SET_ADVANCEMENT_VEHICLES') {
        return { ...state, vehicles: action.payload }
    } else if (action.type === 'SET_ADVANCEMENT_VEHICLE_MODS') {
        return { ...state, vehicleMods: action.payload }
    } else if (action.type === 'SET_NOMAD_FREEBIE') {
        return {
            ...state,
            useNomadFreebie: action.payload
        }
    }

    if (action.type === 'EQUIP_ARMOR') {
        let equippedArmorQuality = 0
        return {
            ...state,
            armor: state.armor.map(item => {
                if (item.armor_bridge_id === action.payload.armor_bridge_id) {
                    item.equipped = true
                    equippedArmorQuality = action.payload.quality
                    return item
                } else {
                    item.equipped = false
                    return item
                }
            }),
            totalArmorQuality: equippedArmorQuality
        }
    }

    if (action.type === 'UNEQUIP_ARMOR') {
        return {
            ...state,
            armor: state.armor.map(item => {
                if (item.armor_bridge_id === action.payload.armor_bridge_id) {
                    item.equipped = false
                    return item
                }
                return item
            }),
            equippedArmorQuality: 0
        }
    }

    if (action.type === 'EQUIP_SHIELD') {
        let equippedShieldQuality = 0
        return {
            ...state,
            shield: state.shield.map(item => {
                if (item.shield_bridge_id === action.payload.shield_bridge_id) {
                    item.equipped = true
                    equippedShieldQuality = action.payload.quality
                    return item
                } else {
                    item.equipped = false
                    return item
                }
            }),
            totalShieldQuality: equippedShieldQuality
        }
    }

    if (action.type === 'UNEQUIP_SHIELD') {
        return {
            ...state,
            shield: state.shield.map(item => {
                if (item.shield_bridge_id === action.payload.shield_bridge_id) {
                    item.equipped = false
                    return item
                }
                return item
            }),
            equippedShieldQuality: 0
        }
    }

    if (action.type === 'EQUIP_WEAPON') {
        return {
            ...state,
            weapons: state.weapons.map(item => {
                if (item.weapon_bridge_id === action.payload.weapon_bridge_id) {
                    item.equipped = true
                    return item
                }
                return item
            })
        }
    }

    if (action.type === 'UNEQUIP_WEAPON') {
        return {
            ...state,
            weapons: state.weapons.map(item => {
                if (item.weapon_bridge_id === action.payload.weapon_bridge_id) {
                    item.equipped = false
                    return item
                }
                return item
            })
        }
    }

    if (action.type === 'EQUIP_NETRUNNER_DECK') {
        return {
            ...state,
            netrunnerGear: state.netrunnerGear.map(item => {
                if (item.netrunner_bridge_id === action.payload.netrunner_bridge_id) {
                    item.equipped = true
                    return item
                } else {
                    item.equipped = false
                    return item
                }
            }),
        }
    }

    if (action.type === 'UNEQUIP_NETRUNNER_DECK') {
        return {
            ...state,
            netrunnerGear: state.netrunnerGear.map(item => {
                if (item.netrunner_bridge_id === action.payload.netrunner_bridge_id) {
                    item.equipped = false
                    return item
                } else {
                    item.equipped = false
                    return item
                }

            }),
        }
    }

    if (action.type === 'EQUIP_NETRUNNER_GEAR') {
        return {
            ...state,
            netrunnerGear: state.netrunnerGear.map(item => {
                if (item.netrunner_bridge_id === action.payload.netrunner_bridge_id) {
                    item.equipped = true
                    return item
                } else {
                    return item
                }
            })
        }
    }

    if (action.type === 'UNEQUIP_NETRUNNER_GEAR') {
        return {
            ...state,
            netrunnerGear: state.netrunnerGear.map(item => {
                if (item.netrunner_bridge_id === action.payload.netrunner_bridge_id) {
                    item.equipped = false
                    return item
                } else {
                    return item
                }
            })
        }
    }

    if (action.type === 'EQUIP_CYBERWARE') {
        return {
            ...state,
            cyberwareSlots: {
                ...state.cyberwareSlots,
                [action.payload.slot_type]: action.payload.slot_count
            },
            cyberware: state.cyberware.map(item => {
                if (item.owned_cyberware_id === action.payload.incomingCyber.owned_cyberware_id) {
                    item.equipped = true
                    return item
                }
                return item
            })
        }
    }

    if (action.type === 'CYBERWARE_ARMOR_EQUIPPED') {
        return {
            ...state,
            totalCyberwareArmorQuality: state.totalCyberwareArmorQuality + action.payload.armor,
            totalCyberwareHealthBoxesCreated: state.totalCyberwareHealthBoxesCreated + action.payload.healthBoxes
        }
    }

    if (action.type === 'UNEQUIP_CYBERWARE') {
        console.log(`cyberware:`, action.payload);
        return {
            ...state,
            cyberwareSlots: {
                ...state.cyberwareSlots,
                [action.payload.slot_type]: action.payload.slot_count
            },
            cyberware: state.cyberware.map(item => {
                if (item.owned_cyberware_id === action.payload.incomingCyber.owned_cyberware_id) {
                    item.equipped = false
                    return item
                }
                return item
            })
        }
    }

    if (action.type === 'CYBERWARE_ARMOR_REMOVED') {
        return {
            ...state,
            totalCyberwareArmorQuality: state.totalCyberwareArmorQuality + action.payload.armor,
            totalCyberwareHealthBoxesCreated: state.totalCyberwareHealthBoxesCreated + action.payload.healthBoxes
        }
    }

    if (action.type === 'CYBERLIMB_EQUIPPED') {
        return {
            ...state,
            totalCyberwareHealthBoxesCreated: state.totalCyberwareHealthBoxesCreated + 1
        }
    }

    if (action.type === 'CYBERLIMB_REMOVED') {
        return {
            ...state,
            totalCyberwareHealthBoxesCreated: state.totalCyberwareHealthBoxesCreated - 1
        }
    }

    // when buying armor, put into a new area of the reducer for use with a PUT command
    if (action.type === 'BUY_ARMOR') {
        return {
            ...state,
            boughtArmor: [...state.boughtArmor,
            {
                // to give each piece a unique ID for use in selling, armor is specified as part of the payload.item from AdvancementShopArmor
                armor_master_id: action.payload.item.armor_master_id,
                description: action.payload.item.description,
                name: action.payload.item.name,
                price: action.payload.item.price,
                quality: action.payload.item.quality,
                armorID: action.payload.armorID
            }],
            // increment Armor ID to give each piece of armor a unique identifier. Now when using SELL_ADVANCEMENT_ARMOR below,
            // individual armors can be sold even if they otherwise have the same ID.
            armorID: state.armorID + 1
        }
    }

    // parse through bought armor to remove armor purchased and sold in the same session.
    // armor from this sell command is NOT added to the soldArmor array as it will not need to be deleted from the database.
    if (action.type === 'SELL_ADVANCEMENT_ARMOR') {
        return {
            ...state,
            boughtArmor: state.boughtArmor.filter(armor => armor.armorID !== action.payload.armorID),
        }
    }

    // unlike above, this version uses the bridge ID from the database, which is inherently unique.
    // armors sold via this method are added to the soldArmor array so they can be deleted from the database when changes are saved.
    if (action.type === 'SELL_OWNED_ARMOR') {
        return {
            ...state,
            armor: state.armor.filter(armor => armor.armor_bridge_id !== action.payload.armor_bridge_id),
            soldArmor: [...state.soldArmor, action.payload]
        }
    }

    // remaining versions dropped into a switch statement, but perform the same functions as above.
    switch (action.type) {
        case 'BUY_SHIELD':
            return {
                ...state,
                boughtShield: [...state.boughtShield,
                {
                    shield_master_id: action.payload.item.shield_master_id,
                    description: action.payload.item.description,
                    name: action.payload.item.name,
                    price: action.payload.item.price,
                    quality: action.payload.item.quality,
                    shieldID: action.payload.shieldID
                }],
                shieldID: state.shieldID + 1
            }
        case 'SELL_ADVANCEMENT_SHIELD':
            return {
                ...state,
                boughtShield: state.boughtShield.filter(shield => shield.shieldID !== action.payload.shieldID),
            }
        case 'SELL_OWNED_SHIELD':
            return {
                ...state,
                shield: state.shield.filter(shield => shield.shield_bridge_id !== action.payload.shield_bridge_id),
                soldShield: [...state.soldShield, action.payload]
            }
        case 'BUY_WEAPON':
            return {
                ...state,
                boughtWeapons: [...state.boughtWeapons,
                {
                    weapon_master_id: action.payload.item.weapon_master_id,
                    concealable: action.payload.item.concealable,
                    damage: action.payload.item.damage,
                    description: action.payload.item.description,
                    max_clip: action.payload.item.max_clip,
                    range: action.payload.item.range,
                    rof: action.payload.item.rof,
                    name: action.payload.item.name,
                    hands: action.payload.item.hands,
                    price: action.payload.item.price,
                    weaponID: action.payload.weaponID
                }],
                weaponID: state.weaponID + 1
            }
        case 'SELL_ADVANCEMENT_WEAPON':
            return {
                ...state,
                boughtWeapons: state.boughtWeapons.filter(weapon => weapon.weaponID !== action.payload.weaponID),
            }
        case 'SELL_OWNED_WEAPON':
            return {
                ...state,
                weapons: state.weapons.filter(weapon => weapon.weapon_bridge_id !== action.payload.weapon_bridge_id),
                soldWeapons: [...state.soldWeapons, action.payload]
            }
        case 'BUY_MISC_GEAR':
            return {
                ...state,
                boughtMiscGear: [...state.boughtMiscGear,
                {
                    description: action.payload.item.description,
                    misc_gear_master_id: action.payload.item.misc_gear_master_id,
                    name: action.payload.item.name,
                    price: action.payload.item.price,
                    miscGearID: action.payload.miscGearID
                }],
                miscGearID: state.miscGearID + 1
            }
        case 'SELL_ADVANCEMENT_MISC_GEAR':
            return {
                ...state,
                boughtMiscGear: state.boughtMiscGear.filter(gear => gear.miscGearID !== action.payload.miscGearID),
            }
        case 'SELL_OWNED_MISC_GEAR':
            return {
                ...state,
                gear: state.gear.filter(gear => gear.char_gear_bridge_id !== action.payload.char_gear_bridge_id),
                soldMiscGear: [...state.soldMiscGear, action.payload]
            }
        case 'BUY_NETRUNNER_GEAR':
            return {
                ...state,
                boughtNetrunnerGear: [...state.boughtNetrunnerGear,
                {
                    attack: action.payload.item.attack,
                    defense: action.payload.item.defense,
                    description: action.payload.item.description,
                    name: action.payload.item.name,
                    netrunner_master_id: action.payload.item.netrunner_master_id,
                    price: action.payload.item.price,
                    rez: action.payload.item.rez,
                    slots: action.payload.item.slots,
                    type: action.payload.item.type,
                    netrunnerGearID: action.payload.netrunnerGearID
                }],
                netrunnerGearID: state.netrunnerGearID + 1
            }
        case 'SELL_ADVANCEMENT_NETRUNNER_GEAR':
            return {
                ...state,
                boughtNetrunnerGear: state.boughtNetrunnerGear.filter(gear => gear.netrunnerGearID !== action.payload.netrunnerGearID),
            }
        case 'SELL_OWNED_NETRUNNER_GEAR':
            return {
                ...state,
                netrunnerGear: state.netrunnerGear.filter(gear => gear.netrunner_bridge_id !== action.payload.netrunner_bridge_id),
                soldNetrunnerGear: [...state.soldNetrunnerGear, action.payload]
            }
        case 'BUY_CYBERWARE':
            return {
                ...state,
                boughtCyberware: [...state.boughtCyberware,
                {
                    cyberware_master_id: action.payload.item.cyberware_master_id,
                    description: action.payload.item.description,
                    humanity_loss_max: action.payload.item.humanity_loss_max,
                    humanity_loss_min: action.payload.item.humanity_loss_min,
                    install_level: action.payload.item.install_level,
                    name: action.payload.item.name,
                    price: action.payload.item.price,
                    type: action.payload.item.type,
                    cyberwareID: action.payload.cyberwareID,
                }],
                cyberwareID: state.cyberwareID + 1
            }
        case 'SELL_ADVANCEMENT_CYBERWARE':
            return {
                ...state,
                boughtCyberware: state.boughtCyberware.filter(cyberware => cyberware.cyberwareID !== action.payload.cyberwareID),
            }
        case 'SELL_OWNED_CYBERWARE':
            return {
                ...state,
                cyberware: state.cyberware.filter(cyberware => cyberware.owned_cyberware_id !== action.payload.owned_cyberware_id),
                soldCyberware: [...state.soldCyberware, action.payload]
            }
        case 'BUY_VEHICLE':
            return {
                ...state,
                boughtVehicles: [...state.boughtVehicles,
                {
                    description: action.payload.item.description,
                    health: action.payload.item.health,
                    move: action.payload.item.move,
                    mph: action.payload.item.mph,
                    name: action.payload.item.name,
                    price: action.payload.item.price,
                    seats: action.payload.item.seats,
                    type: action.payload.item.type,
                    vehicle_master_id: action.payload.item.vehicle_master_id,
                    is_nomad_vehicle: false,
                    vehicleID: action.payload.vehicleID
                }],
                vehicleID: state.vehicleID + 1
            }
        case 'BUY_NOMAD_VEHICLE':
            return {
                ...state,
                boughtVehicles: [...state.boughtVehicles,
                {
                    description: action.payload.item.description,
                    health: action.payload.item.health,
                    move: action.payload.item.move,
                    mph: action.payload.item.mph,
                    name: action.payload.item.name,
                    price: 0,
                    seats: action.payload.item.seats,
                    type: action.payload.item.type,
                    vehicle_master_id: action.payload.item.vehicle_master_id,
                    is_nomad_vehicle: true,
                    vehicleID: action.payload.vehicleID
                }],
                vehicleID: state.vehicleID + 1,
                useNomadFreebie: false,
            }
        case 'SELL_ADVANCEMENT_VEHICLE':
            return {
                ...state,
                boughtVehicles: state.boughtVehicles.filter(gear => gear.vehicleID !== action.payload.vehicleID),
            }
        case 'SELL_OWNED_VEHICLE':
            return {
                ...state,
                vehicles: state.vehicles.filter(gear => gear.vehicle_bridge_id !== action.payload.vehicle_bridge_id),
                soldVehicles: [...state.soldVehicles, action.payload]
            }
        case 'BUY_VEHICLE_MOD':
            return {
                ...state,
                boughtVehicleMods: [...state.boughtVehicleMods,
                {
                    char_id: action.payload.item.char_id,
                    char_owned_vehicle_mods_id: action.payload.item.char_owned_vehicle_mods_id,
                    description: action.payload.item.description,
                    equipped: action.payload.item.equipped,
                    name: action.payload.item.name,
                    price: action.payload.item.price,
                    type: action.payload.item.type,
                    vehicle_mod_master_id: action.payload.item.vehicle_mod_master_id,
                    vehicleModID: action.payload.vehicleModID
                }],
                vehicleModID: state.vehicleModID + 1
            }
        case 'SELL_ADVANCEMENT_VEHICLE_MOD':
            return {
                ...state,
                boughtVehicleMods: state.boughtVehicleMods.filter(mod => mod.vehicleModID !== action.payload.vehicleModID),
            }
        case 'SELL_OWNED_VEHICLE_MOD':
            return {
                ...state,
                vehicleMods: state.vehicleMods.filter(mod => mod.char_owned_vehicle_mods_id !== action.payload.char_owned_vehicle_mods_id),
                soldVehicleMods: [...state.soldVehicleMods, action.payload]
            }
        case 'EQUIP_VEHICLE_MOD':
            return {
                ...state,
                vehicleMods: state.vehicleMods.filter(mod => mod.vehicle_mod_master_id !== action.payload.modData.vehicle_mod_master_id)
            }
    }
    return state

}

export default advancementGear;