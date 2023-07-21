const advancementGear = (state = {
    armor: [],
    shield: [],
    weapons: [],
    gear: [],
    cyberware: [],
    cyberwareSlots: {}
}, action) => {
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
        return {...state,
        cyberwareSlots: action.payload
        }
    }

    if (action.type === 'EQUIP_ARMOR') {
        return {
            ...state,
            armor: state.armor.map(item => {
                if (item.armor_bridge_id === action.payload.armor_bridge_id) {
                    item.equipped = true
                    return item
                } else {
                    item.equipped = false
                    return item
                }
            })
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
            })
        }
    }

    if (action.type === 'EQUIP_SHIELD') {
        return {
            ...state,
            shield: state.shield.map(item => {
                if (item.shield_bridge_id === action.payload.shield_bridge_id) {
                    item.equipped = true
                    return item
                } else {
                    item.equipped = false
                    return item
                }
            })
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
            })
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
            cyberwareSlots: {...state.cyberwareSlots,
                [action.payload.slot_type]: action.payload.slot_count},
            cyberware: state.cyberware.map(item => {
                if (item.owned_cyberware_id === action.payload.incomingCyber.owned_cyberware_id) {
                    item.equipped = true
                    return item
                }
                return item
            })
        }
    }

    if (action.type === 'UNEQUIP_CYBERWARE') {
        return {
            ...state,
            cyberwareSlots: {...state.cyberwareSlots,
                [action.payload.slot_type]: action.payload.slot_count},
            cyberware: state.cyberware.map(item => {
                if (item.owned_cyberware_id === action.payload.incomingCyber.owned_cyberware_id) {
                    item.equipped = false
                    return item
                }
                return item
            })
        }
    }



    return state
}

export default advancementGear;