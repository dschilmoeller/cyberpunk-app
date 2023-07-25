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
    totalCyberwareHealthBoxesCreated: 0
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


    return state
}

export default advancementGear;