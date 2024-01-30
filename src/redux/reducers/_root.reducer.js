import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';

import characterList from './characterList.reducer';
import campaigns from './campaigns.reducer';

import characterDetail from './characterDetail.reducer';
import characterGear from './characterGear.reducer';
import characterStatus from './characterStatus.reducer';
import characterNotes from './characterNotes.reducer';
import characterContacts from './characterContacts.reducer';

import characterCreation from './characterCreation.reducer';

import gearMaster from './gearMaster.reducer';

import characterModMaster from './characterModMaster';

import advancementDetail from './advancementDetail.reducer';
import advancementGear from './advancementGear.reducer';

import contactMaster from './contactMaster.reducer';
import contactBridge from './contactBridge.reducer';
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// This is a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in

  campaigns, // list of available campaigns to play in
  contactMaster, // contact master list.
  contactBridge, // contact bridge data

  gearMaster, // master gear lists

  characterList, // contains list of character names & ids

  characterDetail, // active character sheet details
  characterGear, // active character sheet equipment details
  characterStatus, // contains active character's luck, armor, wounds, to be used to populate char sheet/db between play.
  characterModMaster, // contains details of active character's modifications to different pieces of gear.
  characterNotes, // player created notes.
  characterContacts, // player owned contacts

  characterCreation, // contains details set up during character creation

  advancementDetail, // editable char sheet details
  advancementGear, // editable char sheet equipment

  
});

export default rootReducer;