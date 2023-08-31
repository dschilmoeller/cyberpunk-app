const advancementDetail = (state = {}, action) => {
    if (action.type === "SET_ADVANCEMENT_DETAIL") {
        return action.payload;
    }
    if (action.type === 'CLEAR_ADVANCEMENT_DETAIL') {
        return [{ name: '' }]
    }
    if (action.type === 'INCREASE_ATTRIBUTE') {
        return {
            ...state,
            [action.payload.attributeName]: (action.payload.attributeScore + 1),
            spent_xp: Number(state.spent_xp + action.payload.increaseAttributeCost)
        }
    }
    if (action.type === 'INCREASE_SKILL') {
        return {
            ...state,
            [action.payload.skillName]: (action.payload.skillScore + 1),
            spent_xp: Number(state.spent_xp + action.payload.increaseSkillCost)
        }
    }
    if (action.type === 'INCREASE_ROLE') {
        return {
            ...state,
            [action.payload.roleName]: (action.payload.roleScore + 1),
            spent_xp: Number(state.spent_xp + action.payload.increaseRoleCost)
        }
    }
    if (action.type === 'INCREASE_ROLE_SKILL') {
        return {
            ...state,
            [action.payload.skillName]: (action.payload.currentSkillRank + 1)
        }
    }
    if (action.type === 'INCREASE_NOMAD_VEHICLE_SLOTS') {
        return {
            ...state,
            nomad_vehicle_slots: state.nomad_vehicle_slots + 1
        }
    }
    if (action.type === 'INCREASE_LUCK') {
        return {
            ...state,
            max_luck: action.payload.newLuck,
            spent_xp: Number(state.spent_xp + action.payload.increaseLuckCost)
        }
    }

    if (action.type === 'REMOVE_TEMP_HUMANITY_LOSS') {
        return {
            ...state,
            temp_humanity_loss: action.payload,
            spent_xp: Number(state.spent_xp + 1)
        }
    }

    if (action.type === 'HUMANITY_LOSS_CYBERWARE') {
        return {
            ...state,
            perm_humanity_loss: Number(state.perm_humanity_loss + action.payload.minLoss),
            temp_humanity_loss: Number(state.temp_humanity_loss + action.payload.totalLoss - 1)
        }
    }
    if (action.type === 'HUMANITY_RECOVERY_CYBERWARE') {
        // determine total of current temp humanity loss + payload
        let newTotalTempHumanityLoss = (state.temp_humanity_loss - (action.payload.totalLoss - 1))
        // if newTotal is > 0, tempHumanityLost is newTotal
        let tempHumanityLoss = 0
        if (newTotalTempHumanityLoss > 0) {
            tempHumanityLoss = newTotalTempHumanityLoss
        }
        return {
            ...state,
            perm_humanity_loss: state.perm_humanity_loss - action.payload.minLoss,
            temp_humanity_loss: tempHumanityLoss
        }
    }

    if (action.type === 'SET_PARAMEDICAL_TRUE') {
        return {
            ...state,
            is_paramedical: true
        }
    }

    if (action.type === 'ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED') {
        return {
            ...state,
            [action.payload.type]: action.payload.quality
        }
    }

    // tied to advancementShop functions, changes cash on hand status.
    if (action.type === 'BUY_ARMOR') {
        return {
            ...state,
            bank: Number(state.bank - action.payload.item.price)
        }
    }

    if (action.type === 'SELL_OWNED_ARMOR') {
        return {
            ...state,
            // sells armor for standard 25% street value
            bank: Number(state.bank + Math.floor(action.payload.price / 4))
        }
    }

    if (action.type === 'SELL_ADVANCEMENT_ARMOR') {
        return {
            ...state,
            // sells armor for full value, ie. 'returns' it.
            bank: Number(state.bank + action.payload.price)
        }
    }

    switch (action.type) {
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
    }

    if (action.type === 'MAKE_PHARMACEUTICAL') {
        return {
            ...state,
            bank: action.payload.newBank
        }
    }

    if (action.type === 'NETRUNNER_DECK_EQUIPPED') {
        return {
            ...state,
            cyberdeck_slots: action.payload
        }
    }
    if (action.type === 'NETRUNNER_DECK_UNEQUIPPED') {
        return {
            ...state,
            cyberdeck_slots: 0
        }
    }
    if (action.type === 'EQUIP_NETRUNNER_GEAR') {
        return {
            ...state,
            cyberdeck_slots: state.cyberdeck_slots - action.payload.slots
        }
    }
    if (action.type === 'UNEQUIP_NETRUNNER_GEAR') {
        return {
            ...state,
            cyberdeck_slots: state.cyberdeck_slots + action.payload.slots
        }
    }


    // GM changes
    if (action.type === 'GM_CHANGE_TEMP_HUMANITY_LOSS') {
        return {
            ...state,
            temp_humanity_loss: state.temp_humanity_loss + action.payload
        }
    }

    if (action.type === 'GM_CHANGE_PERM_HUMANITY_LOSS') {
        return {
            ...state,
            perm_humanity_loss: state.perm_humanity_loss + action.payload
        }
    }
    if (action.type === 'GM_CHANGE_BANK') {
        return {
            ...state,
            bank: state.bank + action.payload
        }
    }
    if (action.type === 'GM_CHANGE_XP') {
        return {
            ...state,
            max_xp: state.max_xp + action.payload
        }
    }
    if (action.type === 'GM_CHANGE_STAT') {
        return {
            ...state,
            [action.payload.statToChange]: Number(action.payload.newStatAmount)
        }
    }
    if (action.type === 'GM_SET_IS_PARAMEDICAL') {
        return {
            ...state,
            is_paramedical: action.payload
        }
    }

    return state
}

export default advancementDetail;