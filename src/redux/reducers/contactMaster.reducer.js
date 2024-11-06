const contactMaster = (state = [], action) => {
  switch (action.type) {
    case 'SET_CONTACT_LIST':
      return action.payload;
    default:
      return state;
  }
};

export default contactMaster;
