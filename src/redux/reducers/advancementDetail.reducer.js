const advancementDetail = (state = { campaign: 1, campaignWords: '' }, action) => {
    switch (action.type) {
        // retrieves details from db
        case 'SET_ADVANCEMENT_DETAIL':
            return action.payload;
        // clears details when required.
        case 'CLEAR_ADVANCEMENT_DETAIL':
            return [{ name: '', campaign: 1, campaignWords: '' }]
        // From AdvancementSheet pages - players spending XP
        case 'INCREASE_ATTRIBUTE':
            return {
                ...state,
                [action.payload.attributeName]: (action.payload.attributeScore + 1),
                spent_xp: Number(state.spent_xp + action.payload.increaseAttributeCost)
            }
        case 'INCREASE_SKILL':
            return {
                ...state,
                [action.payload.skillName]: (action.payload.skillScore + 1),
                spent_xp: Number(state.spent_xp + action.payload.increaseSkillCost)
            }
        case 'INCREASE_ROLE':
            return {
                ...state,
                [action.payload.roleName]: (action.payload.roleScore + 1),
                spent_xp: Number(state.spent_xp + action.payload.increaseRoleCost)
            }
        case 'INCREASE_ROLE_SKILL':
            return {
                ...state,
                [action.payload.skillName]: (action.payload.currentSkillRank + 1)
            }
        case 'INCREASE_NOMAD_VEHICLE_SLOTS':
            return {
                ...state,
                nomad_vehicle_slots: state.nomad_vehicle_slots + 1
            }
        case 'INCREASE_LUCK':
            return {
                ...state,
                max_luck: action.payload.newLuck,
                spent_xp: Number(state.spent_xp + action.payload.increaseLuckCost)
            }
        // the below is from spending experience.
        case 'REMOVE_TEMP_HUMANITY_LOSS':
            return {
                ...state,
                temp_humanity_loss: action.payload,
                spent_xp: Number(state.spent_xp + 1)
            }
        // this is from equipping / removing cyberware.
        case 'HUMANITY_LOSS_CYBERWARE':
            return {
                ...state,
                perm_humanity_loss: Number(state.perm_humanity_loss + action.payload.minLoss),
                // the -1 is a choice, I guess. Comes from Advancement Cyberware humanityLossCalculator() function which adds a 1 somewhere.
                temp_humanity_loss: Number(state.temp_humanity_loss + action.payload.totalLoss - 1)
            }
        case 'HUMANITY_RECOVERY_CYBERWARE':
            // determine total of current temp humanity loss + payload
            let newTotalTempHumanityLoss = (state.temp_humanity_loss - (action.payload.totalLoss - 1))
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
        case 'SET_PARAMEDICAL_TRUE':
            return {
                ...state,
                is_paramedical: true
            }
        case 'ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED':
            // This type will be one of cyber_appearance, cyber_reflexes, etc and the quality will be a flat number.
            return {
                ...state,
                [action.payload.type]: action.payload.quality
            }
        // tied to advancementShop functions, changes cash on hand status.
        case 'BUY_ARMOR':
            return {
                ...state,
                bank: Number(state.bank - action.payload.item.price)
            }
        case 'SELL_OWNED_ARMOR':
            return {
                ...state,
                // sells armor for standard 25% street value
                bank: Number(state.bank + Math.floor(action.payload.price / 4))
            }
        case 'SELL_ADVANCEMENT_ARMOR':
            return {
                ...state,
                // sells armor for full value, ie. 'returns' it.
                bank: Number(state.bank + action.payload.price)
            }
        case 'REPAIR_ARMOR':
            return {
                ...state,
                bank: Number(state.bank - action.payload.this_armor_loss * (action.payload.price / 10))
            }
        // Repeat as for armor for other kinds of gear.
        case 'BUY_SHIELD':
            return {
                ...state,
                bank: Number(state.bank - action.payload.item.price)
            }
        case 'SELL_OWNED_SHIELD':
            return {
                ...state,
                bank: Number(state.bank + Math.floor(action.payload.price / 4))
            }
        case 'SELL_ADVANCEMENT_SHIELD':
            return {
                ...state,
                bank: Number(state.bank + action.payload.price)
            }
        case 'REPAIR_SHIELD':
            return {
                ...state,
                bank: Number(state.bank - action.payload.this_shield_loss * (action.payload.price / 10))
            }
        //weapons
        case 'BUY_WEAPON':
            return {
                ...state,
                bank: Number(state.bank - action.payload.item.price)
            }
        case 'SELL_OWNED_WEAPON':
            return {
                ...state,
                bank: Number(state.bank + Math.floor(action.payload.price / 4))
            }
        case 'SELL_ADVANCEMENT_WEAPON':
            return {
                ...state,
                bank: Number(state.bank + action.payload.price)
            }
        //grenades
        case 'BUY_GRENADE':
            return {
                ...state,
                bank: Number(state.bank - action.payload.item.price)
            }
        case 'SELL_OWNED_GRENADE':
            return {
                ...state,
                bank: Number(state.bank + Math.floor(action.payload.price / 4))
            }
        case 'SELL_ADVANCEMENT_GRENADE':
            return {
                ...state,
                bank: Number(state.bank + action.payload.price)
            }
        //othergear
        case 'BUY_MISC_GEAR':
            return {
                ...state,
                bank: Number(state.bank - action.payload.item.price)
            }
        case 'SELL_OWNED_MISC_GEAR':
            return {
                ...state,
                bank: Number(state.bank + Math.floor(action.payload.price / 4))
            }
        case 'SELL_ADVANCEMENT_MISC_GEAR':
            return {
                ...state,
                bank: Number(state.bank + action.payload.price)
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
        case 'BUY_VEHICLE':
            return {
                ...state,
                bank: Number(state.bank - action.payload.item.price)
            }
        case 'BUY_NOMAD_VEHICLE':
            // As we can see, this changes something other than the bank.
            return {
                ...state,
                nomad_vehicle_slots: state.nomad_vehicle_slots - 1
            }
        case 'SELL_OWNED_VEHICLE':
            return {
                ...state,
                bank: Number(state.bank + Math.floor(action.payload.price / 4) + action.payload.total_mod_cost)
            }
        case 'SELL_ADVANCEMENT_VEHICLE':
            return {
                ...state,
                bank: Number(state.bank + action.payload.price)
            }
        case 'RESTORE_NOMAD_SLOT':
            return {
                ...state,
                nomad_vehicle_slots: state.nomad_vehicle_slots + 1
            }
        case 'BUY_VEHICLE_MOD':
            return {
                ...state,
                bank: Number(state.bank - action.payload.item.price)
            }
        case 'SELL_OWNED_VEHICLE_MOD':
            return {
                ...state,
                bank: Number(state.bank + Math.floor(action.payload.price / 4))
            }
        case 'SELL_ADVANCEMENT_VEHICLE_MOD':
            return {
                ...state,
                bank: Number(state.bank + action.payload.price)
            }
        //cyberware
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
                max_xp: Number(action.payload.newTotalExp),
                spent_xp: Number(action.payload.newSpentTotalExp)
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