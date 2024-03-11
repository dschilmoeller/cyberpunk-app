const advancementDetail = (state = { campaign: 1, campaignWords: '', bank: 0 }, action) => {
    switch (action.type) {
        // retrieves details from db
        case 'SET_ADVANCEMENT_DETAIL':
            return action.payload;
        // clears details when required.
        case 'CLEAR_ADVANCEMENT_DETAIL':
            return [{ name: '', campaign: 1, campaignWords: '', bank: 0 }]
        case 'SET_CHARACTER_BANK':
            return {
                ...state,
                bank: action.payload.bank
            }
        case 'HUMANITY_LOSS_CYBERWARE':
            return {
                ...state,
                perm_humanity_loss: Number(state.perm_humanity_loss + action.payload.minLoss),
                temp_humanity_loss: Number(state.temp_humanity_loss + (action.payload.totalLoss - action.payload.minLoss))
            }
        case 'HUMANITY_RECOVERY_CYBERWARE':
            let newTotalTempHumanityLoss = (state.temp_humanity_loss - (action.payload.totalLoss - action.payload.minLoss))
            // if newTotalTempHumanityLoss is > 0, tempHumanityLost is newTotal
            let tempHumanityLoss = 0
            if (newTotalTempHumanityLoss > 0) {
                tempHumanityLoss = newTotalTempHumanityLoss
            }
            return {
                ...state,
                perm_humanity_loss: state.perm_humanity_loss - action.payload.minLoss,
                temp_humanity_loss: tempHumanityLoss
            }
        case 'ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED':
            // This type will be one of cyber_appearance, cyber_reflexes, etc and the quality is the modification. 
            // used mainly for cyber_appearance and cyber_cool as the physical stats and int are all modified by cyberware that uses
            // the below STATIC_CYBERWARE_ATTRIBUTE_SET
            return {
                ...state,
                [action.payload.type]: state[action.payload.type] + action.payload.quality
            }
        case 'STATIC_CYBERWARE_ATTRIBUTE_SET':
            // modifies cyber_attribute to a fixed number, mainly physical stats and intelligence as only one piece of cyberware that modifies
            // these can be equipped at a time.
            return {
                ...state,
                [action.payload.type]: action.payload.quality
            }
        // case 'REPAIR_ARMOR':
        //     return {
        //         ...state,
        //         bank: Number(state.bank - action.payload.this_armor_loss * (action.payload.price / 10))
        //     }
        case 'BUY_NETRUNNER_GEAR':
            return {
                ...state,
                bank: Number(state.bank - action.payload.item.price)
            }
        case 'SELL_OWNED_NETRUNNER_GEAR':
            return {
                ...state,
                bank: Number(state.bank + Math.floor(action.payload.price / 4))
            }
        case 'SELL_ADVANCEMENT_NETRUNNER_GEAR':
            return {
                ...state,
                bank: Number(state.bank + action.payload.price)
            }
        case 'BUY_NOMAD_VEHICLE':
            // As we can see, this changes something other than the bank.
            return {
                ...state,
                nomad_vehicle_slots: state.nomad_vehicle_slots - 1
            }
        case 'RESTORE_NOMAD_SLOT':
            return {
                ...state,
                nomad_vehicle_slots: state.nomad_vehicle_slots + 1
            }
        case 'BUY_CYBERWARE':
            return {
                ...state,
                bank: Number(state.bank - action.payload.item.price)
            }
        case 'SELL_OWNED_CYBERWARE':
            return {
                ...state,
                bank: Number(state.bank + Math.floor(action.payload.price / 4))
            }
        case 'SELL_ADVANCEMENT_CYBERWARE':
            return {
                ...state,
                bank: Number(state.bank + action.payload.price)
            }
        case 'REPAIR_CYBERWARE':
            return {
                ...state,
                bank: Number(state.bank - action.payload),
                current_cyberware_armor_loss: 0
            }
        case 'MAKE_PHARMACEUTICAL':
            // this is just spending money on reagents for making a pharmaceutical compound.
            return {
                ...state,
                bank: action.payload.newBank
            }
        case 'NETRUNNER_DECK_EQUIPPED':
            return {
                ...state,
                cyberdeck_slots: action.payload
            }
        case 'NETRUNNER_DECK_UNEQUIPPED':
            return {
                ...state,
                cyberdeck_slots: 0
            }
        case 'EQUIP_NETRUNNER_GEAR':
            return {
                ...state,
                cyberdeck_slots: state.cyberdeck_slots - action.payload.slots
            }
        case 'UNEQUIP_NETRUNNER_GEAR':
            return {
                ...state,
                cyberdeck_slots: state.cyberdeck_slots + action.payload.slots
            }

        // GM CHANGES
        case 'GM_CHANGE_CAMPAIGN':
            return {
                ...state,
                campaign: action.payload.campaign,
                campaign_name: action.payload.campaign_name,
                campaignWords: action.payload.campaignWords
            }
        case 'GM_CHANGE_TEMP_HUMANITY_LOSS':
            return {
                ...state,
                temp_humanity_loss: state.temp_humanity_loss + action.payload
            }
        case 'GM_CHANGE_PERM_HUMANITY_LOSS':
            return {
                ...state,
                perm_humanity_loss: state.perm_humanity_loss + action.payload
            }
        case 'GM_CHANGE_BANK':
            return {
                ...state,
                bank: state.bank + action.payload
            }
        case 'GM_CHANGE_XP':
            return {
                ...state,
                max_xp: state.max_xp + action.payload
            }
        case 'GM_INCREASE_STAT':
            return {
                ...state,
                [action.payload.statToChange]: Number(action.payload.newStatAmount),
                // max_xp: Number(action.payload.newTotalExp),
                // spent_xp: Number(action.payload.newSpentTotalExp)
            }
        case 'GM_DECREASE_STAT':
            return {
                ...state,
                [action.payload.statToChange]: Number(action.payload.newStatAmount)
            }
        case 'GM_SET_IS_PARAMEDICAL':
            return {
                ...state,
                is_paramedical: action.payload
            }
        case 'GM_REMOVE_CYBERWARE':
            return {
                ...state,
                perm_humanity_loss: state.perm_humanity_loss - action.payload.humanity_loss_min
            }
        case 'GM_REMOVE_NETRUNNER_GEAR':
            return {
                ...state,
                cyberdeck_slots: state.cyberdeck_slots - action.slots
            }
        case 'GM_REMOVE_NETRUNNER_DECK':
            return {
                ...state,
                cyberdeck_slots: 0
            }
        default:
            return state
    }
}

export default advancementDetail;