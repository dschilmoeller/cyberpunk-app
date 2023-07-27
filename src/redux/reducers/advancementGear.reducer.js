const advancementGear = (state = {
    armor: [],
    shield: [],
    weapons: [],
    gear: [],
    cyberware: [],
    cyberwareSlots: {},
    totalArmorQuality: 0,
    totalShieldQuality: 0,
    totalCyberwareArmorQuality: 0,
    totalCyberwareHealthBoxesCreated: 0,
    boughtArmor: [],
    soldArmor: [],
    armorID: 0
}, action) => {
    if (action.type === 'SET_ADVANCEMENT_DETAIL') {
        return {
            ...state,
            totalArmorQuality: action.payload[0].current_armor_quality,
            totalShieldQuality: action.payload[0].current_shield_quality,
            totalCyberwareArmorQuality: action.payload[0].current_cyberware_armor_quality,
            totalCyberwareHealthBoxesCreated: action.payload[0].current_cyberware_health_boxes
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
        return {
            ...state,
            cyberwareSlots: action.payload
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
            totalCyberwareArmorQuality: action.payload.armor,
            totalCyberwareHealthBoxesCreated: action.payload.healthBoxes
        }
    }

    if (action.type === 'UNEQUIP_CYBERWARE') {
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
            totalCyberwareArmorQuality: action.payload.armor,
            totalCyberwareHealthBoxesCreated: action.payload.healthBoxes
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
    

    return state
}

export default advancementGear;