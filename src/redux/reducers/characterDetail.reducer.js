const characterDetail = (state=[{name: ''}], action) => {
    if (action.type === "SET_CHARACTER_DETAIL") {
        return action.payload;
    }
    if (action.type === 'CLEAR_CHARACTER_DETAIL') {
        return [{name: ''}]
    }
    return state
}

export default characterDetail;