const characterList = (state = [], action) => {
    switch (action.type) {
        case 'SET_CHARACTER_LIST':
            return action.payload;
        case 'SET_GM_CHARACTER_LIST':
            return action.payload
        default:
            return state
    }
}

export default characterList;