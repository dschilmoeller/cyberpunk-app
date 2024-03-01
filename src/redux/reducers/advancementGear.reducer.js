const advancementGear = (state = {
    armor: [],
    shield: [],
    weapons: [],
    grenades: [],
    gear: [],
    cyberware: [],
    netrunnerGear: [],
    vehicles: [],
    vehicleMods: [],
    clothes: [],
    cyberwareSlots: {},
    totalArmorQuality: 0,
    totalShieldQuality: 0,
    totalCyberwareArmorQuality: 0,
    totalCyberwareHealthBoxesCreated: 0,
    useNomadFreebie: false,
    boughtWeapons: [],
    soldWeapons: [],
    weaponID: 0,
    boughtGrenades: [],
    soldGrenades: [],
    grenadeID: 0,
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
    cyberwareID: 0,
}, action) => {
    switch (action.type) {
        // Set initial state from DB
        case 'SET_ADVANCEMENT_DETAIL':
            return {
                ...state,
                totalArmorQuality: action.payload.current_armor_quality,
                totalShieldQuality: action.payload.current_shield_quality,
                totalCyberwareArmorQuality: action.payload.current_cyberware_armor_quality,
                totalCyberwareHealthBoxesCreated: action.payload.current_cyberware_health_boxes
            }
        // reset reducer to defaults upon eg. going to character list page.
        case 'CLEAR_ADVANCEMENT_DETAIL':
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
                clothes: [],
                cyberwareSlots: {},
                totalArmorQuality: 0,
                totalShieldQuality: 0,
                totalCyberwareArmorQuality: 0,
                totalCyberwareHealthBoxesCreated: 0,
                useNomadFreebie: false,
                boughtWeapons: [],
                soldWeapons: [],
                weaponID: 0,
                boughtGrenades: [],
                soldGrenades: [],
                grenadeID: 0,
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
                cyberwareID: 0,
            }

        case 'SET_ADVANCEMENT_GEAR':
            return {
                ...state,
                armor: action.payload.armor,
                shield: action.payload.shields,
                weapons: action.payload.weapons,
                grenades: action.payload.grenades,
                gear: action.payload.gear,
                cyberware: action.payload.cyberware,
                cyberwareSlots: action.payload.cyberwareSlots,
                netrunnerGear: action.payload.netrunnerGear,
                vehicles: action.payload.vehicles,
                vehicleMods: action.payload.vehicleMods,
                clothes: action.payload.clothes
            }
        case 'SET_ADVANCEMENT_CLOTHES':
            return {
                ...state,
                clothes: action.payload
            }
        case 'SET_ADVANCEMENT_ARMOR':
            return {
                ...state,
                armor: action.payload
            }
        case 'SET_ADVANCEMENT_SHIELD':
            return {
                ...state,
                shield: action.payload
            }
        case 'SET_ADVANCEMENT_MISC_GEAR':
            return {
                ...state,
                gear: action.payload
            }
        case 'SET_NOMAD_FREEBIE':
            return {
                ...state,
                useNomadFreebie: action.payload
            }

        // EQUIPPING / REMOVING GEAR
        // equip armor - change armor sent in with action to be equipped. Unequip all other armor (rule: only one armor equipped at a time).
        // Armor Quality - number of armor boxes. Determined by armor type.
        // case 'EQUIP_ARMOR':
        //     let equippedArmorQuality = 0
        //     return {
        //         ...state,
        //         armor: state.armor.map(item => {
        //             if (item.armor_bridge_id === action.payload.armor_bridge_id) {
        //                 item.equipped = true
        //                 equippedArmorQuality = action.payload.quality
        //                 return item
        //             } else {
        //                 item.equipped = false
        //                 return item
        //             }
        //         }),
        //         totalArmorQuality: equippedArmorQuality
        //     }
        // Reverse process, but should end with all armor unequipped and armor quality set to 0.
        // case 'UNEQUIP_ARMOR':
        //     return {
        //         ...state,
        //         armor: state.armor.map(item => {
        //             if (item.armor_bridge_id === action.payload.armor_bridge_id) {
        //                 item.equipped = false
        //                 return item
        //             } else if (item.name == 'No Armor') {
        //                 item.equipped = true
        //                 return item
        //             } else {
        //                 return item
        //             }
        //         }),
        //         equippedArmorQuality: 0
        //     }
        // Identical processs as armor for shields.
        // case 'EQUIP_SHIELD':
        //     let equippedShieldQuality = 0
        //     return {
        //         ...state,
        //         shield: state.shield.map(item => {
        //             if (item.shield_bridge_id === action.payload.shield_bridge_id) {
        //                 item.equipped = true
        //                 equippedShieldQuality = action.payload.quality
        //                 return item
        //             } else {
        //                 item.equipped = false
        //                 return item
        //             }
        //         }),
        //         totalShieldQuality: equippedShieldQuality
        //     }
        // case 'UNEQUIP_SHIELD':
        //     return {
        //         ...state,
        //         shield: state.shield.map(item => {
        //             if (item.shield_bridge_id === action.payload.shield_bridge_id) {
        //                 item.equipped = false
        //                 return item
        //             } else if (item.name == 'No Shield') {
        //                 item.equipped = true
        //                 return item
        //             } else {
        //                 return item
        //             }
        //         }),
        //         equippedShieldQuality: 0
        //     }
        // Repair of Armor/Shields
        case 'REPAIR_ARMOR':
            return {
                ...state,
                armor: state.armor.map(item => {
                    if (item.armor_bridge_id === action.payload.armor_bridge_id) {
                        item.this_armor_loss = 0;
                        return item
                    } else {
                        return item
                    }
                })
            }
        case 'REPAIR_SHIELD':
            return {
                ...state,
                shield: state.shield.map(item => {
                    if (item.shield_bridge_id === action.payload.shield_bridge_id) {
                        item.this_shield_loss = 0;
                        return item
                    } else {
                        return item
                    }
                })
            }
        // Weapons - similar to armor, except any number of weapons can be equipped.
        case 'EQUIP_WEAPON':
            return {
                ...state,
                weapons: state.weapons.map(item => {
                    if (item.weapon_bridge_id === action.payload.weapon_bridge_id) {
                        item.equipped = true
                        return item
                    } else {
                        return item
                    }
                })
            }
        case 'UNEQUIP_WEAPON':
            return {
                ...state,
                weapons: state.weapons.map(item => {
                    if (item.weapon_bridge_id === action.payload.weapon_bridge_id) {
                        item.equipped = false
                        return item
                    } else {
                        return item
                    }
                })
            }
        // Deck similar to armor/shield - only one can be equipped at a time.
        case 'EQUIP_NETRUNNER_DECK':
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
        // Since all netrunner gear is stored in one reducer, removing a deck unequips ALL netrunner gear.
        case 'UNEQUIP_NETRUNNER_DECK':
            return {
                ...state,
                netrunnerGear: state.netrunnerGear.map(item => {
                    item.equipped = false
                    return item
                }),
            }
        // Equipping non-deck item simply equips the item. Limits are determined on the front end.
        case 'EQUIP_NETRUNNER_GEAR':
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
        case 'UNEQUIP_NETRUNNER_GEAR':
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
        // Cyberware slots, being numerous and of different limits, are handled on front end to determine which slot is being changed.
        // Cyberware item itself is equipped similar to other gear. Unlike most other equip commands, cyberware equipping and removing
        // has an impact in the advancementDetail reducer as it touches humanity.
        case 'EQUIP_CYBERWARE':
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
                    } else {
                        return item
                    }
                })
            }
        // Cyberware armor is a special case of armor that is added together for total armor. It can also generate additional health boxes. Most of this addition is done on the front end Armor page.
        case 'CYBERWARE_ARMOR_EQUIPPED':
            return {
                ...state,
                totalCyberwareArmorQuality: state.totalCyberwareArmorQuality + action.payload.armor,
                totalCyberwareHealthBoxesCreated: state.totalCyberwareHealthBoxesCreated + action.payload.healthBoxes
            }
        // Unequip should be a direct inverse of the equip process.
        case 'UNEQUIP_CYBERWARE':
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
                    } else {
                        return item
                    }
                })
            }
        // Removing armor should be a direct inverse of the equip process. The payload quantities are negative numbers.
        case 'CYBERWARE_ARMOR_REMOVED':
            return {
                ...state,
                totalCyberwareArmorQuality: state.totalCyberwareArmorQuality + action.payload.armor,
                totalCyberwareHealthBoxesCreated: state.totalCyberwareHealthBoxesCreated + action.payload.healthBoxes
            }
        // Cyberlimbs impact health boxes but not armor and are handled slightly differently. Could be folded into CYBERWARE_ARMOR actions but would require more info from the front end to prevent NaN due to payload having undefined fields.
        case 'CYBERLIMB_EQUIPPED':
            return {
                ...state,
                totalCyberwareHealthBoxesCreated: state.totalCyberwareHealthBoxesCreated + 1
            }
        case 'CYBERLIMB_REMOVED':
            return {
                ...state,
                totalCyberwareHealthBoxesCreated: state.totalCyberwareHealthBoxesCreated - 1
            }
        // SHOPPING
        // when buying armor, put into a new area of the reducer for use with a PUT command
        // case 'BUY_ARMOR':
        //     return {
        //         ...state,
        //         boughtArmor: [...state.boughtArmor,
        //         {
        //             // to give each piece a unique ID for use in selling, armorID is specified as part of the payload.item from AdvancementShopArmor
        //             armor_master_id: action.payload.item.armor_master_id,
        //             description: action.payload.item.description,
        //             name: action.payload.item.name,
        //             price: action.payload.item.price,
        //             quality: action.payload.item.quality,
        //             armorID: action.payload.armorID
        //         }],
        //         // increment Armor ID to give each piece of armor a unique identifier. Now when using SELL_ADVANCEMENT_ARMOR below,
        //         // individual armors can be sold even if they otherwise have the same ID.
        //         armorID: state.armorID + 1
        //     }
        // parse through bought armor to remove armor purchased and sold in the same session.
        // armor from this sell command is NOT added to the soldArmor array as it will not need to be deleted from the database.
        // case 'SELL_ADVANCEMENT_ARMOR':
        //     return {
        //         ...state,
        //         boughtArmor: state.boughtArmor.filter(armor => armor.armorID !== action.payload.armorID),
        //     }
        // // unlike above, this version uses the bridge ID from the database, which is inherently unique.
        // // armors sold via this method are added to the soldArmor array so they can be deleted from the database when changes are saved.
        // case 'SELL_OWNED_ARMOR':
        //     return {
        //         ...state,
        //         armor: state.armor.filter(armor => armor.armor_bridge_id !== action.payload.armor_bridge_id),
        //         soldArmor: [...state.soldArmor, action.payload]
        //     }
        // other buy/sell cases are handled identically to the above for the different gear types.
        // case 'BUY_SHIELD':
        //     return {
        //         ...state,
        //         boughtShield: [...state.boughtShield,
        //         {
        //             shield_master_id: action.payload.item.shield_master_id,
        //             description: action.payload.item.description,
        //             name: action.payload.item.name,
        //             price: action.payload.item.price,
        //             quality: action.payload.item.quality,
        //             shieldID: action.payload.shieldID
        //         }],
        //         shieldID: state.shieldID + 1
        //     }
        // case 'SELL_ADVANCEMENT_SHIELD':
        //     return {
        //         ...state,
        //         boughtShield: state.boughtShield.filter(shield => shield.shieldID !== action.payload.shieldID),
        //     }
        // case 'SELL_OWNED_SHIELD':
        //     return {
        //         ...state,
        //         shield: state.shield.filter(shield => shield.shield_bridge_id !== action.payload.shield_bridge_id),
        //         soldShield: [...state.soldShield, action.payload]
        //     }
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
        case 'BUY_GRENADE':
            return {
                ...state,
                boughtGrenades: [...state.boughtGrenades,
                {
                    description: action.payload.item.description,
                    grenade_master_id: action.payload.item.grenade_master_id,
                    name: action.payload.item.name,
                    price: action.payload.item.price,
                    grenadeID: action.payload.grenadeID
                }],
                grenadeID: state.grenadeID + 1
            }
        case 'SELL_ADVANCEMENT_GRENADE':
            return {
                ...state,
                boughtGrenades: state.boughtGrenades.filter(grenade => grenade.grenadeID !== action.payload.grenadeID)
            }
        case 'SELL_OWNED_GRENADE':
            return {
                ...state,
                grenades: state.grenades.filter(grenade => grenade.grenade_bridge_id !== action.payload.grenade_bridge_id),
                soldGrenades: [...state.soldGrenades, action.payload]
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
        // In the case of using Nomad Points to acquire a vehicle instead of cash, handler is slightly different.
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
                vehicleMods: state.vehicleMods.map(mod => {
                    if (action.payload.modData.char_owned_vehicle_mods_id === mod.char_owned_vehicle_mods_id) {
                        mod.equipped = true
                        return mod
                    } else {
                        return mod
                    }
                }),

                // This simply checks if the mod is armoring the vehicle and changing the vehicle's status appropriately
                vehicles: state.vehicles.map(vehicle => {
                    if (vehicle.vehicle_bridge_id === action.payload.vehicle_bridge_id && action.payload.modData.name === "Armored") {
                        return {
                            ...vehicle,
                            has_armor: true
                        }
                    } else {
                        return vehicle
                    }
                })
            }
        case 'REMOVE_VEHICLE_MOD':
        case 'REMOVE_NEW_VEHICLE_MOD':
            return {
                ...state,
                vehicleMods: state.vehicleMods.map(mod => {
                    if (action.payload.modData.char_owned_vehicle_mods_id === mod.char_owned_vehicle_mods_id) {
                        mod.equipped = false
                        return mod
                    } else {
                        return mod
                    }

                }),
                vehicles: state.vehicles.map(vehicle => {
                    if (vehicle.vehicle_bridge_id === action.payload.modData.vehicle_bridge_id && action.payload.modData.name === "Armored") {
                        return {
                            ...vehicle,
                            has_armor: false
                        }
                    } else {
                        return vehicle
                    }
                })
            }
        // This handles the extra seats modification.
        case 'VEHICLE_CHANGE_SEAT':
            return {
                ...state,
                vehicles: state.vehicles.map(vehicle => {
                    if (vehicle.vehicle_bridge_id === action.payload.vehicle_bridge_id) {
                        return {
                            ...vehicle,
                            extra_seats: vehicle.extra_seats + action.payload.amount
                        }
                    } else {
                        return vehicle
                    }

                })
            }

        // GM change Handlers
        // functionally identical to buying/selling armor, but with no corresponding bank change in the advancementDetail reducer - simply arbitrarily adds and removes armor.
        case 'GM_GIVE_ARMOR':
            return {
                ...state,
                boughtArmor: [...state.boughtArmor,
                {
                    armor_master_id: action.payload.item.armor_master_id,
                    description: action.payload.item.description,
                    name: action.payload.item.name,
                    price: action.payload.item.price,
                    quality: action.payload.item.quality,
                    armorID: action.payload.armorID
                }],
                armorID: state.armorID + 1
            }
        case 'GM_REMOVE_GM_ARMOR':
            return {
                ...state,
                boughtArmor: state.boughtArmor.filter(armor => armor.armorID !== action.payload.armorID),
            }
        case 'GM_REMOVE_ARMOR':
            return {
                ...state,
                armor: state.armor.filter(armor => armor.armor_bridge_id !== action.payload.armor_bridge_id),
                soldArmor: [...state.soldArmor, action.payload],
                totalArmorQuality: action.payload.equipped ? state.totalArmorQuality - action.payload.quality : state.totalArmorQuality
            }
        case 'GM_GIVE_SHIELD':
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
        case 'GM_REMOVE_GM_SHIELD':
            return {
                ...state,
                boughtShield: state.boughtShield.filter(shield => shield.shieldID !== action.payload.shieldID),
            }
        case 'GM_REMOVE_SHIELD':
            return {
                ...state,
                shield: state.shield.filter(shield => shield.shield_bridge_id !== action.payload.shield_bridge_id),
                soldShield: [...state.soldShield, action.payload],
                totalShieldQuality: action.payload.equipped ? state.totalShieldQuality - action.payload.quality : state.totalShieldQuality
            }
        case 'GM_GIVE_WEAPON':
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
        case 'GM_REMOVE_GM_WEAPON':
            return {
                ...state,
                boughtWeapons: state.boughtWeapons.filter(weapon => weapon.weaponID !== action.payload.weaponID),
            }
        case 'GM_REMOVE_WEAPON':
            return {
                ...state,
                weapons: state.weapons.filter(weapon => weapon.weapon_bridge_id !== action.payload.weapon_bridge_id),
                soldWeapons: [...state.soldWeapons, action.payload]
            }
        case 'GM_GIVE_GRENADE':
            return {
                ...state,
                boughtGrenades: [...state.boughtGrenades,
                {
                    description: action.payload.item.description,
                    grenade_master_id: action.payload.item.grenade_master_id,
                    name: action.payload.item.name,
                    price: action.payload.item.price,
                    grenadeID: action.payload.grenadeID
                }],
                grenadeID: state.grenadeID + 1
            }
        case 'GM_REMOVE_GM_GRENADE':
            return {
                ...state,
                boughtGrenades: state.boughtGrenades.filter(grenade => grenade.grenadeID !== action.payload.grenadeID)
            }
        case 'GM_REMOVE_GRENADE':
            return {
                ...state,
                grenades: state.grenades.filter(grenade => grenade.grenade_bridge_id !== action.payload.grenade_bridge_id),
                soldGrenades: [...state.soldGrenades, action.payload]
            }
        case 'GM_GIVE_MISC_GEAR':
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
        case 'GM_REMOVE_GM_MISC_GEAR':
            return {
                ...state,
                boughtMiscGear: state.boughtMiscGear.filter(gear => gear.miscGearID !== action.payload.miscGearID),
            }
        case 'GM_REMOVE_MISC_GEAR':
            return {
                ...state,
                gear: state.gear.filter(gear => gear.char_gear_bridge_id !== action.payload.char_gear_bridge_id),
                soldMiscGear: [...state.soldMiscGear, action.payload]
            }
        case 'GM_GIVE_NETRUNNER_GEAR':
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
        case 'GM_REMOVE_GM_NETRUNNER_GEAR':
            return {
                ...state,
                boughtNetrunnerGear: state.boughtNetrunnerGear.filter(gear => gear.netrunnerGearID !== action.payload.netrunnerGearID),
            }
        case 'GM_REMOVE_NETRUNNER_DECK':
            return {
                ...state,
                soldNetrunnerGear: [...state.soldNetrunnerGear, action.payload],
                netrunnerGear: state.netrunnerGear.map(item => {
                    item.equipped = false
                    return item
                }),
                netrunnerGear: state.netrunnerGear.filter(gear => gear.netrunner_bridge_id !== action.payload.netrunner_bridge_id),
            }
        case 'GM_REMOVE_NETRUNNER_GEAR':
            return {
                ...state,
                netrunnerGear: state.netrunnerGear.filter(gear => gear.netrunner_bridge_id !== action.payload.netrunner_bridge_id),
                soldNetrunnerGear: [...state.soldNetrunnerGear, action.payload]
            }
        case 'GM_GIVE_CYBERWARE':
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
        case 'GM_REMOVE_GM_CYBERWARE':
            return {
                ...state,
                boughtCyberware: state.boughtCyberware.filter(cyberware => cyberware.cyberwareID !== action.payload.cyberwareID),
            }
        case 'GM_REMOVE_CYBERWARE':
            return {
                ...state,
                cyberware: state.cyberware.filter(cyberware => cyberware.owned_cyberware_id !== action.payload.owned_cyberware_id),
                soldCyberware: [...state.soldCyberware, action.payload],
                cyberwareSlots: {
                    ...state.cyberwareSlots,
                    [action.payload.slot_type]: action.payload.slot_count
                },
            }
        case 'GM_UNEQUIP_CYBERWARE':
            return {
                ...state,
                cyberware: state.cyberware.map(item => {
                    if (item.owned_cyberware_id === action.payload.incomingCyber.owned_cyberware_id) {
                        item.equipped = false
                        return item
                    }
                    return item
                })
            }
        case 'GM_GIVE_VEHICLE':
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
        case 'GM_REMOVE_GM_VEHICLE':
            return {
                ...state,
                boughtVehicles: state.boughtVehicles.filter(gear => gear.vehicleID !== action.payload.vehicleID),
            }
        case 'GM_REMOVE_VEHICLE':
            return {
                ...state,
                vehicles: state.vehicles.filter(gear => gear.vehicle_bridge_id !== action.payload.vehicle_bridge_id),
                soldVehicles: [...state.soldVehicles, action.payload]
            }
        case 'GM_GIVE_VEHICLE_MOD':
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
        case 'GM_REMOVE_GM_VEHICLE_MOD':
            return {
                ...state,
                boughtVehicleMods: state.boughtVehicleMods.filter(mod => mod.vehicleModID !== action.payload.vehicleModID),
            }
        case 'GM_REMOVE_VEHICLE_MOD':
            return {
                ...state,
                vehicleMods: state.vehicleMods.filter(mod => mod.char_owned_vehicle_mods_id !== action.payload.char_owned_vehicle_mods_id),
                soldVehicleMods: [...state.soldVehicleMods, action.payload]
            }
        default:
            return state
    }
}

export default advancementGear;