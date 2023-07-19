const advancementGear = (state = {
    ownedArmor: [],
    equippedArmor: [],
    ownedShield: [],
    equippedShield: [],
    ownedWeapons: [],
    equippedWeapons: [],
    ownedGear: [],
    ownedCyberware: [],
    equippedCyberware: []
}, action) => {
    if (action.type === 'SET_ADVANCEMENT_OWNED_ARMOR') {
        return { ...state, ownedArmor: action.payload }
    } else if (action.type === 'SET_ADVANCEMENT_EQUIPPED_ARMOR') {
        return { ...state, equippedArmor: action.payload }
    } else if (action.type === 'SET_ADVANCEMENT_EQUIPPED_SHIELD') {
        return { ...state, equippedShield: action.payload}
    } else if (action.type === 'SET_ADVANCEMENT_OWNED_SHIELD') {
        return { ...state, ownedShield: action.payload}
    } else if (action.type === 'SET_ADVANCEMENT_OWNED_WEAPONS') {
        return { ...state, ownedWeapons: action.payload }
    } else if (action.type === 'SET_ADVANCEMENT_EQUIPPED_WEAPONS') {
        return { ...state, equippedWeapons: action.payload }
    } else if (action.type === 'SET_ADVANCEMENT_OWNED_GEAR') {
        return { ...state, ownedGear: action.payload }
    } else if (action.type === 'SET_ADVANCEMENT_OWNED_CYBERWARE') {
        return { ...state, ownedCyberware: action.payload }
    } else if (action.type === 'SET_ADVANCEMENT_EQUIPPED_CYBERWARE') {
        return { ...state, equippedCyberware: action.payload }    
    }

    if (action.type === 'CHANGE_EQUIPPED_ARMOR') {
        return {
            ...state,
            equippedArmor: [action.payload],
            ownedArmor: state.ownedArmor.map(item => {
                if (item.equipped === true ) {
                    item.equipped = false;
                    return item
                } 
                if (action.payload.armor_master_id === item.armor_master_id) {
                item.equipped = true;
                    return item
                }
                return item
            })
        }
    }

    if (action.type === 'CHANGE_EQUIPPED_SHIELD') {
        return {
            ...state,
            equippedShield: [action.payload],
            ownedShield: state.ownedShield.map(item => {
                if (item.equipped === true ) {
                    item.equipped = false;
                    return item
                } 
                if (action.payload.shield_master_id === item.shield_master_id) {
                    item.equipped = true;
                    return item
                }
                return item
            })
        }
    }

    return state
}

export default advancementGear;