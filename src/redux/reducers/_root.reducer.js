import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';

import characterList from './characterList.reducer';

import characterDetail from './characterDetail.reducer';
import characterCyberDetail from './characterCyberDetail.reducer';
import characterHealthTracker from './characterHealthTracker.reducer';
import characterStatus from './characterStatus.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// This is a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  characterList, // contains list of character names & ids
  characterDetail, // contains details of active character
  characterCyberDetail, // contains data of relevant bridge table row for character
  characterStatus, // contains active character's luck, armor, wounds, to be used to populate char sheet/db between play.
  characterHealthTracker, // contains active character's current health status during play
});

export default rootReducer;
