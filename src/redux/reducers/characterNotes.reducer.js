const characterNotes = (state = [], action) => {
    switch (action.type) {
        case 'SET_CHARACTER_NOTES':
            return action.payload
        case 'CLEAR_CHARACTER_NOTES':
            return []
        case 'CHARACTER_NOTE_UPDATE':
            return state.map(note => {
                if (note.char_note_id == action.payload.id){
                    return {
                        char_note_id: action.payload.id,
                        char_id: action.payload.char_id,
                        title: action.payload.title,
                        body: action.payload.body,
                        favorite: action.payload.favorite
                    }
                } else {
                    return note
                }
            })
        case 'CHARACTER_DELETE_NOTE':
            return state.filter(note => note.char_note_id !== action.payload)
        default:
            return state
    }
}

export default characterNotes;