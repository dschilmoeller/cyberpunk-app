import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';

import characterList from './characterList.reducer';
import campaigns from './campaigns.reducer';

import characterDetail from './characterDetail.reducer';
import characterGear from './characterGear.reducer';
import characterStatus from './characterStatus.reducer';

import characterCreation from './characterCreation.reducer';

import armorMaster from './armorMaster.reducer';
import shieldMaster from './shieldMaster.reducer';
import weaponMaster from './weaponMaster.reducer';
import grenadeMaster from './grenadeMaster.reducer';
import miscGearMaster from './miscGearMaster.reducer';
import cyberwareMaster from './cyberwareMaster.reducer';
import netrunnerGearMaster from './netrunnerMaster.reducer';
import vehicleMaster from './vehicleMaster.reducer';
import vehicleModMaster from './vehicleModMaster.reducer';

import characterModMaster from './characterModMaster';

import advancementDetail from './advancementDetail.reducer';
import advancementGear from './advancementGear.reducer';
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// This is a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  
  campaigns, // list of available campaigns to play in
  
  armorMaster, // master gear list - armor
  shieldMaster, // master gear list - shields
  weaponMaster, // master gear list - weapons
  grenadeMaster, // master gear list - grenades
  miscGearMaster, // master gear list - misc
  cyberwareMaster, // master gear list - cyberware
  netrunnerGearMaster, // master gear list - netrunner
  vehicleMaster, // master gear list - vehicles
  vehicleModMaster, // master gear list - vehicle mods
  
  characterList, // contains list of character names & ids
  characterDetail, // active character sheet details
  characterGear, // active character sheet equipment details
  characterStatus, // contains active character's luck, armor, wounds, to be used to populate char sheet/db between play.
  characterModMaster, // contains details of active character's modifications to different pieces of gear.
  
  characterCreation, // contains details set up during character creation
  
  advancementDetail, // editable char sheet details
  advancementGear, // editable char sheet equipment
});

export default rootReducer;
