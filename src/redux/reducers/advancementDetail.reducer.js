const advancementDetail = (state = [{ name: '' }], action) => {
    if (action.type === "SET_ADVANCEMENT_DETAIL") {
        return action.payload;
    }
    if (action.type === 'CLEAR_ADVANCEMENT_DETAIL') {
        return [{ name: '' }]
    }
    return state
}

export default advancementDetail;