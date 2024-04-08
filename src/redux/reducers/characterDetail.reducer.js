const characterDetail = (state = {}, action) => {
    switch (action.type) {
        case 'SET_CHARACTER_DETAIL':
            return action.payload;
        case 'CLEAR_CHARACTER_DETAIL':
            return {}
        case 'PLAYER_BURN_ONE_LUCK':
            return {
                ...state,
                max_luck: state.max_luck - 1
            }
        case 'MAKE_PHARMACEUTICAL':
            return {
                ...state,
                bank: action.payload.newBank
            }
        case 'SET_CHARACTER_BANK':
            return {
                ...state,
                bank: action.payload.bank
            }
        // moved from Advancement Detail

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
        case 'SET_ADVANCEMENT_HUMANITY':
            return {
                ...state,
                perm_humanity_loss: action.payload.perm_humanity_loss,
                temp_humanity_loss: action.payload.temp_humanity_loss
            }
        case 'SET_ADVANCEMENT_NOMAD_VEHICLE_SLOTS':
            return {
                ...state,
                nomad_vehicle_slots: action.payload.nomad_vehicle_slots
            }
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
        // case 'BUY_NOMAD_VEHICLE':
        //     // As we can see, this changes something other than the bank.
        //     return {
        //         ...state,
        //         nomad_vehicle_slots: state.nomad_vehicle_slots - 1
        //     }
        // case 'RESTORE_NOMAD_SLOT':
        //     return {
        //         ...state,
        //         nomad_vehicle_slots: state.nomad_vehicle_slots + 1
        //     }
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

export default characterDetail;