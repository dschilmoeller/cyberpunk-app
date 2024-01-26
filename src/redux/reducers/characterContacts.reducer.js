const characterContacts = (state = [], action) => {
    switch (action.type) {
        case 'SET_CHARACTER_CONTACTS':
            return action.payload
        case 'CLEAR_CHARACTER_CONTACTS':
            return []
        case 'CHARACTER_CONTACT_UPDATE':
            return state.map(contact => {
                if (contact.char_contact_id == action.payload.id) {
                    return {
                        char_contact_id: action.payload.id,
                        char_id: action.payload.char_id,
                        name: action.payload.name,
                        connection: action.payload.connection,
                        loyalty: action.payload.loyalty,
                        description: action.payload.description
                    }
                } else {
                    return contact
                }
            })
        case 'CHARACTER_DELETE_CONTACT':
            return state.filter(contact => contact.char_contact_id !== action.payload)
        default:
            return state
    }
}

export default characterContacts;