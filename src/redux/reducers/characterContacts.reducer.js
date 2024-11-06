const characterContacts = (state = [], action) => {
  switch (action.type) {
    case 'SET_CHARACTER_CONTACTS':
      return action.payload;
    case 'CLEAR_CHARACTER_CONTACTS':
      return [];
    // case 'GM_REDUCE_LOYALTY':
    //     return state.map(contact => {
    //         if (contact.char_contact_id === action.payload.contactID) {
    //             return {
    //                 ...contact,
    //                 loyalty: action.payload.newAmount,
    //                 modified: true
    //             }
    //         } else {
    //             return contact
    //         }
    //     })
    // case 'GM_INCREASE_LOYALTY':
    //     return state.map(contact => {
    //         if (contact.char_contact_id === action.payload.contactID) {
    //             return {
    //                 ...contact,
    //                 loyalty: action.payload.newAmount,
    //                 modified: true
    //             }
    //         } else {
    //             return contact
    //         }
    //     })
    // case 'CHARACTER_DELETE_CONTACT':
    //     return state.filter(contact => contact.char_contact_id !== action.payload)
    default:
      return state;
  }
};

export default characterContacts;
