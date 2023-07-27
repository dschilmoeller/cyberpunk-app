const advancementDetail = (state = [{ name: '' }], action) => {
    if (action.type === "SET_ADVANCEMENT_DETAIL") {
        return action.payload;
    }
    if (action.type === 'CLEAR_ADVANCEMENT_DETAIL') {
        return [{ name: '' }]
    }
    if (action.type === 'INCREASE_ATTRIBUTE') {
        return state.map(char => {
            return {
                ...char,
                [action.payload.attributeName]: (action.payload.attributeScore + 1),
                spent_xp: Number(char.spent_xp + action.payload.increaseAttributeCost)
            }
        }
        )
    }
    if (action.type === 'INCREASE_SKILL') {
        return state.map(char => {
            return {
                ...char,
                [action.payload.skillName]: (action.payload.skillScore + 1),
                spent_xp: Number(char.spent_xp + action.payload.increaseSkillCost)
            }
        })
    }
    if (action.type === 'INCREASE_ROLE') {
        return state.map(char => {
            return {
                ...char,
                [action.payload.roleName]: (action.payload.roleScore + 1),
                spent_xp: Number(char.spent_xp + action.payload.increaseRoleCost)
            }
        })
    }
    if (action.type === 'INCREASE_ROLE_SKILL') {
        return state.map(char => {
            return {
                ...char,
                [action.payload.skillName]: (action.payload.currentSkillRank + 1)
            }
        })
    }
    if (action.type === 'INCREASE_LUCK') {
        return state.map(char => {
            return {
                ...char,
                max_luck: action.payload.newLuck,
                spent_xp: Number(char.spent_xp + action.payload.increaseLuckCost)
            }
        })
    }

    if (action.type === 'REMOVE_TEMP_HUMANITY_LOSS') {
        return state.map(char => {
            return {
                ...char,
                current_humanity_loss: action.payload,
                spent_xp: Number(char.spent_xp + 1)
            }
        })
    }

    if (action.type === 'HUMANITY_LOSS_CYBERWARE') {
        return state.map(char => {
            return {
                ...char,
                perm_humanity_loss: Number(char.perm_humanity_loss + action.payload.minLoss),
                current_humanity_loss: Number(char.current_humanity_loss + action.payload.totalLoss - 1)
            }
        })
    }
    if (action.type === 'HUMANITY_RECOVERY_CYBERWARE') {
        return state.map(char => {
            // determine total of current temp humanity loss + payload
            let newTotalTempHumanityLoss = (char.current_humanity_loss - (action.payload.totalLoss - 1))
            // if newTotal is > 0, tempHumanityLost is newTotal
            let tempHumanityLoss = 0
            if (newTotalTempHumanityLoss > 0) {
                tempHumanityLoss = newTotalTempHumanityLoss
            }
            return {
                ...char,
                perm_humanity_loss: char.perm_humanity_loss - action.payload.minLoss,
                current_humanity_loss: tempHumanityLoss
            }
        })
    }

    if (action.type === 'SET_PARAMEDICAL_TRUE') {
        return state.map(char => {
            return {
                ...char,
                is_paramedical: true
            }
        })
    }

    if (action.type === 'ATTRIBUTE_ENHANCING_CYBERWARE_EQUIPPED') {
        return state.map(char => {
            return {
                ...char,
                [action.payload.type]: action.payload.quality
            }
        })
    }

    // tied to advancementShop functions, changes cash on hand status.
    if (action.type === 'BUY_ARMOR') {
        return state.map(char => {
            return {
                ...char,
                bank: Number(char.bank - action.payload.item.price)
            }
        })
    }

    if (action.type === 'SELL_OWNED_ARMOR') {
        return state.map(char => {
            return {
                ...char,
                // sells armor for standard 25% street value
                bank: Number(char.bank + Math.floor(action.payload.price / 4))
            }
        })
    }

    if (action.type === 'SELL_ADVANCEMENT_ARMOR') {
        return state.map(char => {
            return {
                ...char,
                // sells armor for full value, ie. 'returns' it.
                bank: Number(char.bank + action.payload.price)
            }
        })
    }

    switch (action.type) {
        case 'BUY_SHIELD':
            return state.map(char => {
                return {
                    ...char,
                    bank: Number(char.bank - action.payload.item.price)
                }
            })

        case 'SELL_OWNED_SHIELD':
            return state.map(char => {
                return {
                    ...char,
                    bank: Number(char.bank + Math.floor(action.payload.price / 4))
                }
            })
        case 'SELL_ADVANCEMENT_SHIELD':
            return state.map(char => {
                return {
                    ...char,
                    bank: Number(char.bank + action.payload.price)
                }
            })
            //weapons
            case 'BUY_WEAPON':
            return state.map(char => {
                return {
                    ...char,
                    bank: Number(char.bank - action.payload.item.price)
                }
            })

        case 'SELL_OWNED_WEAPON':
            return state.map(char => {
                return {
                    ...char,
                    bank: Number(char.bank + Math.floor(action.payload.price / 4))
                }
            })
        case 'SELL_ADVANCEMENT_WEAPON':
            return state.map(char => {
                return {
                    ...char,
                    bank: Number(char.bank + action.payload.price)
                }
            })
            //othergear
            case 'BUY_MISC_GEAR':
            return state.map(char => {
                return {
                    ...char,
                    bank: Number(char.bank - action.payload.item.price)
                }
            })

        case 'SELL_OWNED_MISC_GEAR':
            return state.map(char => {
                return {
                    ...char,
                    bank: Number(char.bank + Math.floor(action.payload.price / 4))
                }
            })
        case 'SELL_ADVANCEMENT_MISC_GEAR':
            return state.map(char => {
                return {
                    ...char,
                    bank: Number(char.bank + action.payload.price)
                }
            })
            //cyberware
            case 'BUY_CYBERWARE':
            return state.map(char => {
                return {
                    ...char,
                    bank: Number(char.bank - action.payload.item.price)
                }
            })

        case 'SELL_OWNED_CYBERWARE':
            return state.map(char => {
                return {
                    ...char,
                    bank: Number(char.bank + Math.floor(action.payload.price / 4))
                }
            })
        case 'SELL_ADVANCEMENT_CYBERWARE':
            return state.map(char => {
                return {
                    ...char,
                    bank: Number(char.bank + action.payload.price)
                }
            })

    }
    return state
}

export default advancementDetail;