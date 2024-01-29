const characterContacts = (state = [], action) => {
    switch (action.type) {
        case 'SET_CHARACTER_CONTACTS':
            return action.payload
        case 'CLEAR_CHARACTER_CONTACTS':
            return []
        case 'CHARACTER_CONTACT_UPDATE':
            return state.map(contact => {
                if (contact.char_contact_id == action.payload.char_contact_id) {
                    return {
                        char_contact_id: action.payload.char_contact_id,
                        loyalty: action.payload.loyalty,
                        notes: action.payload.notes,
                        campaign_id: action.payload.existingContact.campaign_id,
                        char_id: action.payload.existingContact.char_id,
                        connection: action.payload.existingContact.connection,
                        contact_id: action.payload.existingContact.contact_id,
                        contact_master_id: action.payload.existingContact.contact_master_id,
                        description: action.payload.existingContact.description,
                        name: action.payload.existingContact.name,
                    }
                } else {
                    return contact
                }
            })
        // case 'CHARACTER_DELETE_CONTACT':
        //     return state.filter(contact => contact.char_contact_id !== action.payload)
        default:
            return state
    }
}

export default characterContacts;