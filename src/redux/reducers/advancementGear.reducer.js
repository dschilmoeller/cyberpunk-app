const advancementGear = (state = {
    ownedArmor: {},
    equippedArmor: {},
    ownedWeapons: {},
    equippedWeapons: {},
    ownedGear:{},
    ownedCyberware: {},
    equippedCyberware: {}
}, action) => {
    if (action.type === 'SET_ADVANCEMENT_OWNED_ARMOR') {
        return {...state, ownedArmor: action.payload}
    } else if (action.type === 'SET_ADVANCEMENT_EQUIPPED_ARMOR') {
        return {...state, equippedArmor: action.payload}
    } else if (action.type === 'SET_ADVANCEMENT_OWNED_WEAPONS') {
        return {...state, ownedWeapons: action.payload}
    } else if (action.type === 'SET_ADVANCEMENT_EQUIPPED_WEAPONS') {
        return {...state, equippedWeapons: action.payload}
    } else if (action.type === 'SET_ADVANCEMENT_OWNED_GEAR') {
        return {...state, ownedGear: action.payload}
    } else if (action.type === 'SET_ADVANCEMENT_OWNED_CYBERWARE') {
        return {...state, ownedCyberware: action.payload}
    } else if (action.type === 'SET_ADVANCEMENT_EQUPPED_CYBERWARE') {
        return {...state, equippedCyberware: action.payload}
    }
    return state 
}

export default advancementGear;