const characterNotes = (state = [], action) => {
  switch (action.type) {
    case 'SET_CHARACTER_NOTES':
      return action.payload;
    case 'CLEAR_CHARACTER_NOTES':
      return [];
    default:
      return state;
  }
};

export default characterNotes;
