const characterLifestyle = (state = [], action) => {
    switch (action.type) {
        case 'SET_CHARACTER_LIFESTYLE':
            return action.payload
        case 'CLEAR_CHARACTER_LIFESTYLE':
            return []
        default:
            return state;
    }
}

export default characterLifestyle;