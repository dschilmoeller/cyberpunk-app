import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';

import characterList from './characterList.reducer';

import characterDetail from './characterDetail.reducer';
import characterCyberDetail from './characterCyberDetail.reducer';
import characterStatus from './characterStatus.reducer';
import characterWeapons from './characterWeapons.reducer';
import characterMiscGear from './characterMiscGear.reducer';
import characterVehicles from './characterVehicles.reducer';
import characterNetrunnerGear from './characterNetrunnerGear.reducer';

import characterCreation from './characterCreation.reducer';

import armorMaster from './armorMaster.reducer';
import shieldMaster from './shieldMaster.reducer';
import weaponMaster from './weaponMaster.reducer';
import miscGearMaster from './miscGearMaster.reducer';
import cyberwareMaster from './cyberwareMaster.reducer';
import netrunnerGearMaster from './netrunnerMaster.reducer';
import vehicleMaster from './vehicleMaster.reducer';
import vehicleModMaster from './vehicleModMaster.reducer';

import characterModMaster from './characterModMaster';
import treasureMaster from './treasureMaster.reducer';

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
  characterList, // contains list of character names & ids
  characterDetail, // contains details of active character
  characterCyberDetail, // contains data of relevant bridge table row for character
  characterStatus, // contains active character's luck, armor, wounds, to be used to populate char sheet/db between play.
  characterWeapons, // contains active character's weapons
  characterMiscGear, // contains active character's miscellaneous gear
  characterNetrunnerGear, // contains active characters netrunning gear (if any)
  characterModMaster, // contains details of active character's modifications to different pieces of gear.
  characterCreation, // contains details set up during character creation
  armorMaster, // master gear list - armor
  shieldMaster, // master gear list - shields
  weaponMaster, // master gear list - weapons
  miscGearMaster, // master gear list - misc
  cyberwareMaster, // master gear list - cyberware
  characterVehicles, // master gear list - vehicles
  netrunnerGearMaster, // master gear list - netrunner
  vehicleMaster, // master gear list - vehicles
  vehicleModMaster, // master gear list - vehicle mods
  treasureMaster, // master gear list - special treasures
  advancementDetail, // editable char sheet details
  advancementGear, // editable char sheet equipment
});

export default rootReducer;
