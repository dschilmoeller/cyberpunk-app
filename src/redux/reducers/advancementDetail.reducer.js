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
                spent_xp: Number(action.payload)
            }
        })
    }
    return state
}

export default advancementDetail;