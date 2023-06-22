const characterCyberDetail = (state = [{
    armor_level: 0,
    cyber_limb_count: 0
}], action) => {
    if (action.type === "SET_CHARACTER_CYBER_DETAIL") {
        return action.payload;
    }
    if (action.type === 'CLEAR_CHARACTER_CYBER_DETAIL') {
        return []
    }
    return state
}

export default characterCyberDetail;