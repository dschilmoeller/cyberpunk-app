import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetch character names and IDs
function* fetchCharacters() {
  try {
    const allCharacters = yield axios.get('/api/characters/fetchallcharacters')
    yield put({ type: 'SET_CHARACTER_LIST', payload: allCharacters.data });
  } catch (error) {
    console.log('Error fetching all characters:', error);
  }
}

// Fetch Character Details for in-play sheet
function* fetchCharacterDetail(action) {
  try {
    const characterDetail = yield axios.get(`/api/characters/fetchcharacterdetails/${action.payload}`)
    yield put({ type: 'SET_CHARACTER_DETAIL', payload: characterDetail.data[0] });
    const characterStatus = yield axios.get(`api/characters/fetchcharacterstatus/${action.payload}`)
    yield put({ type: 'SET_CHARACTER_STATUS', payload: characterStatus.data[0] })
    const characterNotes = yield axios.get(`/api/characters/fetchCharacterNotes/${action.payload}`)
    yield put({ type: 'SET_CHARACTER_NOTES', payload: characterNotes.data })

    const characterArmor = yield axios.get(`api/characters/fetchcharacterarmor/${action.payload}`)
    const characterShield = yield axios.get(`api/characters/fetchcharactershield/${action.payload}`)
    const characterWeapons = yield axios.get(`api/characters/fetchcharacterweapons/${action.payload}`)
    const characterGrenades = yield axios.get(`api/characters/fetchcharactergrenades/${action.payload}`)
    const characterMiscGear = yield axios.get(`api/characters/fetchCharacterMiscGear/${action.payload}`)
    const characterCyberBridgeDetail = yield axios.get(`/api/characters/fetchcharactercyberdetails/${action.payload}`)
    const characterNetrunningGear = yield axios.get(`api/characters/fetchcharacterNetrunningGear/${action.payload}`)
    const characterVehicles = yield axios.get(`api/characters/fetchcharacterVehicles/${action.payload}`)
    const characterActiveVehicleMods = yield axios.get(`api/characters/characterActiveVehicleMods/${action.payload}`)
    yield put({
      type: 'SET_CHARACTER_EQUIPMENT',
      payload: {
        armor: characterArmor.data[0],
        shield: characterShield.data[0],
        weapons: characterWeapons.data,
        grenades: characterGrenades.data,
        miscGear: characterMiscGear.data,
        cyberware: characterCyberBridgeDetail.data,
        netrunnerGear: characterNetrunningGear.data,
        vehicles: characterVehicles.data,
        vehicleMods: characterActiveVehicleMods.data
      }
    })
  } catch (error) {
    console.log(`Error fetching character details`, error);
  }
};

// Character Changes (put) from in play sheet.

function* saveCharacterSheet(action) {
  try {
    yield axios.put(`api/characters/savecharacter/${action.payload.charID}`, action.payload.charParams.charStatus)
    yield axios.put(`api/characters/savecharacterarmor/${action.payload.charID}`, action.payload.charParams.charArmor)
    yield axios.put(`api/characters/savecharactershield/${action.payload.charID}`, action.payload.charParams.charShield)
    yield axios.put(`api/characters/savecharacterweapons/${action.payload.charID}`, action.payload.charParams.charWeapons)
    yield axios.put(`api/characters/savecharactervehicles/${action.payload.charID}`, action.payload.charParams.charVehicles)
    yield put({ type: "CHARACTER_SHEET_SAVE_SUCCESSFUL"})
    
  } catch (error) {
    console.log(`Error saving Character Details`, error);
  }
}

function* saveCharacterBank(action) {
  try {
    yield axios.put(`api/characters/savecharacterbank/${action.payload.charID}`, action.payload)
  } catch (error) {
    console.log(`Error making a bank change`, error);
  }
}

// Using various consumables:
function* useConsumableFromPack(action) {
  yield axios.delete(`/api/characters/useConsumable/${action.payload.char_gear_bridge_id}`)
  yield put({ type: 'CONSUMABLE_USED', payload: action.payload })
}

function* useGrenade(action) {
  yield axios.delete(`/api/characters/useGrenade/${action.payload.grenade_bridge_id}`)
  yield put({ type: 'GRENADE_USED', payload: action.payload })
}

// making pharmaceutical compounds
function* characterCreatePharmaceutical(action) {
  try {
    yield axios.put('api/characters/charactercreatepharmaceutical/', action.payload)
    const advancementGear = yield axios.get(`/api/characters/fetchAdvancementGear/${action.payload.characterID}`)
    yield put({ type: 'SET_ADVANCEMENT_MISC_GEAR', payload: advancementGear.data })
    const characterMiscGear = yield axios.get(`api/characters/fetchCharacterMiscGear/${action.payload.characterID}`)
    yield put({ type: 'SET_CHARACTER_MISC_GEAR', payload: characterMiscGear.data })
  } catch (error) {
    console.log(`Error creating pharmaceutical compound.`);
  }
}
// Save new character note
function* createCharacterNote(action) {
  try {
    yield axios.post('api/characters/createCharacterNote/', action.payload)
    const characterNotes = yield axios.get(`/api/characters/fetchCharacterNotes/${action.payload.char_id}`)
    yield put({ type: 'SET_CHARACTER_NOTES', payload: characterNotes.data })
  } catch (error) {
    console.log(`Error creating character note:`, error);
  }
}

// Update Character Note
function* updateCharacterNote(action) {
  try {
    yield axios.put('api/characters/updateCharacterNote/', action.payload)
  } catch (error) {
    console.log(`Error saving character note:`, error);
  }
}

function* deleteCharacterNote(action) {
  try {
    yield axios.delete(`api/characters/deleteCharacterNote/${action.payload}`)
  } catch (error) {
    console.log(`Error deleting character note:`, error);
  }
}

// save GM changes:
function* saveGameMasterCharacter(action) {
  try {
    yield axios.put(`api/characters/savegamemastercharacter/${action.payload.charDetail.id}`, action.payload)
  } catch (error) {
    console.log(`Error saving GM changes:`, error);
  }
}

function* deleteGameMasterCharacter(action) {
  try {
    yield axios.delete(`api/characters/deletegamemastercharacter/${action.payload.charDetailID}`)
  } catch (error) {
    console.log(`Error delete character (GM):`, error);
  }
}

// advancement sheet - spending xp, shopping, equipping gear.
function* fetchAdvancementDetails(action) {
  try {
    const advancementDetails = yield axios.get(`/api/characters/fetchAdvancementDetails/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_DETAIL', payload: advancementDetails.data[0] })

    const characterStatus = yield axios.get(`api/characters/fetchAdvancementStatus/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_STATUS', payload: characterStatus.data[0] })

    const advancementArmor = yield axios.get(`/api/characters/fetchAdvancementArmor/${action.payload}`)
    const advancementShield = yield axios.get(`/api/characters/fetchAdvancementShield/${action.payload}`)
    const advancementWeapons = yield axios.get(`/api/characters/fetchAdvancementWeapons/${action.payload}`)
    const advancementGrenades = yield axios.get(`/api/characters/fetchAdvancementGrenades/${action.payload}`)
    const advancementGear = yield axios.get(`/api/characters/fetchAdvancementGear/${action.payload}`)
    const advancementCyber = yield axios.get(`/api/characters/fetchAdvancementCyber/${action.payload}`)
    const advancementCyberSlots = yield axios.get(`/api/characters/fetchAdvancementCyberSlots/${action.payload}`)
    const advancementNetrunnerGear = yield axios.get(`/api/characters/fetchNetrunnerGear/${action.payload}`)
    const advancementVehicles = yield axios.get(`/api/characters/fetchAdvancementVehicle/${action.payload}`)
    const advancementVehicleMods = yield axios.get(`/api/characters/fetchAdvancementVehicleMods/${action.payload}`)

    yield put({
      type: 'SET_ADVANCEMENT_GEAR', payload: {
        armor: advancementArmor.data,
        shields: advancementShield.data,
        weapons: advancementWeapons.data,
        grenades: advancementGrenades.data,
        gear: advancementGear.data,
        cyberware: advancementCyber.data,
        cyberwareSlots: advancementCyberSlots.data[0],
        netrunnerGear: advancementNetrunnerGear.data,
        vehicles: advancementVehicles.data,
        vehicleMods: advancementVehicleMods.data,
      }
    })

    const advancementActiveVehicleMods = yield axios.get(`/api/characters/fetchAdvancementActiveVehicleMods/${action.payload}`)
    yield put({ type: 'SET_ONE_CHARACTER_VEHICLE_MODS', payload: advancementActiveVehicleMods.data })

  } catch (error) {
    console.log(`Error fetching advancement details`, error);
  }
}

function* saveAdvancementDetails(action) {
  try {
    yield axios.put(`api/characters/saveAdvancementCharacter/${action.payload.char.id}`, action.payload);
    yield put({ type: 'CLEAR_ADVANCEMENT_DETAIL' });
    yield put({ type: 'CLEAR_CHARACTER_STATUS' });
    yield put({ type: 'CLEAR_VEHICLE_MODS' });
    yield put({ type: 'CLEAR_CREATION_DETAILS' });
    yield put({ type: 'CLEAR_CHARACTER_DETAIL' });
    yield put({ type: 'CLEAR_CHARACTER_CYBER_DETAIL' });
    yield put({ type: 'CLEAR_CHARACTER_NETRUNNER_GEAR' });
    yield put({ type: 'CLEAR_CHARACTER_VEHICLES' });
    yield put({ type: 'CLEAR_CHARACTER_WEAPONS' });
  } catch (error) {
    console.log(`Error saving advancement Character Details:`, error);
  }
}

function* fetchGameMasterCharacters() {
  try {
    const allCharacters = yield axios.get('/api/characters/fetchGameMasterCharacters')
    yield put({ type: 'SET_GM_CHARACTER_LIST', payload: allCharacters.data });
  } catch (error) {
    console.log('Error fetching characters for Game Master:', error);
  }
}

function* characterBurnLuck(action) {
  try {
    axios.put(`/api/characters/characterBurnOneLuck/${action.payload.charID}`, action.payload)
  } catch (error) {
    console.log(`Error burning one luck:`, error);
  }
}

function* characterSaga() {
  // in play fetch/save
  yield takeLatest('FETCH_ALL_CHARACTERS', fetchCharacters);
  yield takeLatest('FETCH_CHARACTER_DETAIL', fetchCharacterDetail);
  yield takeLatest('USE_CONSUMABLE_FROM_PACK', useConsumableFromPack);
  yield takeLatest('USE_GRENADE', useGrenade);
  yield takeLatest('MAKE_PHARMACEUTICAL', characterCreatePharmaceutical);
  yield takeLatest('SAVE_CHARACTER_BANK', saveCharacterBank)
  yield takeLatest('SAVE_CHARACTER_SHEET', saveCharacterSheet);
  yield takeLatest('CHARACTER_NEW_NOTE', createCharacterNote)
  yield takeLatest('CHARACTER_NOTE_UPDATE', updateCharacterNote)
  yield takeLatest('CHARACTER_DELETE_NOTE', deleteCharacterNote)
  // permanent luck reduction
  yield takeLatest('PLAYER_BURN_ONE_LUCK', characterBurnLuck);

  // advancement fetch/save
  yield takeLatest('FETCH_ADVANCEMENT_DETAIL', fetchAdvancementDetails);
  yield takeLatest('SAVE_ADVANCEMENT_DETAIL', saveAdvancementDetails);

  // GM fetch/save/delete
  yield takeLatest('FETCH_GM_CHARACTERS', fetchGameMasterCharacters)
  yield takeLatest('SAVE_GM_CHANGES', saveGameMasterCharacter)
  yield takeLatest('DELETE_CHARACTER', deleteGameMasterCharacter)
}

export default characterSaga;
