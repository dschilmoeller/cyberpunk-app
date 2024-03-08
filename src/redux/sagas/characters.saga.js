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
    const characterContacts = yield axios.get(`/api/characters/fetchCharacterContacts/${action.payload}`)
    yield put({ type: 'SET_CHARACTER_CONTACTS', payload: characterContacts.data })
    const characterLifestyle = yield axios.get(`/api/characters/fetchCharacterLifestyle/${action.payload}`)
    yield put({ type: 'SET_CHARACTER_LIFESTYLE', payload: characterLifestyle.data })

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

function* fetchAdvancementBank(action) {
  try {
    const bank = yield axios.get(`/api/characters/fetchBank/${action.payload}`)
    yield put({ type: "SET_CHARACTER_BANK", payload: bank.data })
  } catch (error) {
    console.log(`Error fetching character bank:`, error);
  }
}

function* changeCharacterHealth(action) {
  try {
    yield axios.put('/api/characters/changeCharacterHealth/', action.payload)
    const characterStatus = yield axios.get(`api/characters/fetchcharacterstatusbystatusid/${action.payload.charStatusID}`)
    yield put({ type: 'SET_CHARACTER_STATUS', payload: characterStatus.data[0] })
    yield put({ type: "SET_CHARSHEET_LOAD_STATUS", payload: false })
  } catch (err) {
    console.log(`Error altering character health:`, err);
  }
}

function* changeCharacterLuck(action) {
  try {
    yield axios.put('/api/characters/changeCharacterLuck/', action.payload)
    const characterStatus = yield axios.get(`api/characters/fetchcharacterstatusbystatusid/${action.payload.charStatusID}`)
    yield put({ type: 'SET_CHARACTER_STATUS', payload: characterStatus.data[0] })
    yield put({ type: "SET_CHARSHEET_LOAD_STATUS", payload: false })

  } catch (err) {
    console.log(`Error altering character luck:`, err);
  }
}

// Using various consumables:
function* useConsumableFromPack(action) {
  yield axios.delete(`/api/characters/useConsumable/${action.payload.foodstuff.char_gear_bridge_id}`)
  const characterMiscGear = yield axios.get(`api/characters/fetchCharacterMiscGear/${action.payload.charID}`)
  yield put({ type: 'SET_CHARACTER_MISC_GEAR', payload: characterMiscGear.data })
  yield put({ type: 'SET_CHARSHEET_LOAD_STATUS', payload: false })
}

function* charUseGrenade(action) {
  yield axios.delete(`/api/characters/useGrenade/${action.payload.grenade.grenade_bridge_id}`)
  // fetch / set grenades
  const characterGrenades = yield axios.get(`api/characters/fetchcharactergrenades/${action.payload.charID}`)
  yield put({ type: 'SET_CHARACTER_GRENADES', payload: characterGrenades.data})
  yield put({ type: 'SET_CHARSHEET_LOAD_STATUS', payload: false })
}

function* arbitraryBankChange(action) {
  try {
    yield axios.put(`/api/characters/savecharacterbank/${action.payload.charID}`, action.payload)
    const bank = yield axios.get(`/api/characters/fetchBank/${action.payload.charID}`)
    yield put({ type: "SET_CHARACTER_BANK", payload: bank.data })
    yield put({ type: 'SET_CHARSHEET_LOAD_STATUS', payload: false })
  } catch (err) {
    console.log(`Error making arbitary bank change:`, err);
  }
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
    const characterNotes = yield axios.get(`/api/characters/fetchCharacterNotes/${action.payload.charID}`)
    yield put({ type: 'SET_CHARACTER_NOTES', payload: characterNotes.data })
    yield put({ type: "SET_CHARSHEET_LOAD_STATUS", payload: false })
  } catch (error) {
    console.log(`Error creating character note:`, error);
  }
}

// Update Character Note
function* updateCharacterNote(action) {
  try {
    // update
    yield axios.put('api/characters/updateCharacterNote/', action.payload)
    // fetch char notes
    const characterNotes = yield axios.get(`/api/characters/fetchCharacterNotes/${action.payload.charID}`)
    // set char notes
    yield put({ type: 'SET_CHARACTER_NOTES', payload: characterNotes.data })
    yield put({ type: "SET_CHARSHEET_LOAD_STATUS", payload: false })
  } catch (error) {
    console.log(`Error saving character note:`, error);
  }
}

function* deleteCharacterNote(action) {
  try {
    yield axios.delete(`api/characters/deleteCharacterNote/${action.payload.noteID}`)
    const characterNotes = yield axios.get(`/api/characters/fetchCharacterNotes/${action.payload.charID}`)
    // console.log(`characternotes`, characterNotes);
    yield put({ type: 'SET_CHARACTER_NOTES', payload: characterNotes.data })
    yield put({ type: "SET_CHARSHEET_LOAD_STATUS", payload: false })
  } catch (error) {
    console.log(`Error deleting character note:`, error);
  }
}

function* createCharacterContact(action) {
  try {
    yield axios.post('api/characters/createCharacterContact/', action.payload)
    const characterContacts = yield axios.get(`/api/characters/fetchCharacterContacts/${action.payload.char_id}`)
    yield put({ type: 'SET_CHARACTER_CONTACTS', payload: characterContacts.data })
  } catch (error) {
    console.log(`Error creating character contact:`, error);
  }
}

// Update Character Contacts
function* updateCharacterContact(action) {
  try {
    yield axios.put('api/characters/updateCharacterContact/', action.payload)
    const characterContacts = yield axios.get(`/api/characters/fetchCharacterContacts/${action.payload.charID}`)
    yield put({ type: 'SET_CHARACTER_CONTACTS', payload: characterContacts.data })
    yield put({ type: "SET_CHARSHEET_LOAD_STATUS", payload: false })

  } catch (error) {
    console.log(`Error updating character contact:`, error);
  }
}

// delete character contact
function* deleteCharacterContact(action) {
  try {
    yield axios.delete(`api/characters/deleteCharacterContact/${action.payload}`)
  } catch (error) {
    console.log(`Error deleting character contact:`, error);
  }
}

// save GM changes:
function* saveGameMasterCharacter(action) {
  try {
    yield axios.put(`api/characters/savegamemastercharacter/${action.payload.charDetail.id}`, action.payload)
  } catch (error) {
    console.log(`Error saving GM character changes:`, error);
  }
}

function* deleteGameMasterCharacter(action) {
  try {
    yield axios.delete(`api/characters/deletegamemastercharacter/${action.payload.charDetailID}`)
  } catch (error) {
    console.log(`Error delete character (GM):`, error);
  }
}

function* saveGameMasterContact(action) {
  try {
    yield axios.put(`api/characters/savegamemastercontact/${action.payload.campaign_id}`, action.payload)
    yield put({ type: "FETCH_GM_CONTACTS" })
  } catch (error) {
    console.log(`Error saving GM contact changes:`, error);
  }
}

function* createGameMasterContacts(action) {
  try {
    yield axios.post(`api/characters/creategamemastercontact/`, action.payload)
    yield put({ type: "FETCH_GM_CONTACTS" })
  } catch (error) {
    console.log(`Error creating GM contact:`, error);
  }
}

function* deleteGameMasterContact(action) {
  try {
    yield axios.delete(`/api/characters/deletegamemastercontact/${action.payload}`)
    yield put({ type: "FETCH_GM_CONTACTS" })
  } catch (error) {
    console.log(`Error delete Contact (GM):`, error);
  }
}

function* assignContactChar(action) {
  try {
    yield axios.post('api/characters/insertcharcontactbridge/', action.payload)
  } catch (error) {
    console.log(`Error assigning contact to characters in campaign`);
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
    const advancementClothes = yield axios.get(`/api/characters/fetchAdvancementClothes/${action.payload}`)

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
        clothes: advancementClothes.data
      }
    })

    const advancementActiveVehicleMods = yield axios.get(`/api/characters/fetchAdvancementActiveVehicleMods/${action.payload}`)
    yield put({ type: 'SET_ONE_CHARACTER_VEHICLE_MODS', payload: advancementActiveVehicleMods.data })

  } catch (error) {
    console.log(`Error fetching advancement details`, error);
  }
}

function* fetchAdvancementClothes(action) {
  const advancementClothes = yield axios.get(`/api/characters/fetchAdvancementClothes/${action.payload}`)
  yield put({ type: 'SET_ADVANCEMENT_CLOTHES', payload: advancementClothes.data })
}

function* fetchAdvancementArmor(action) {
  const advancementArmor = yield axios.get(`/api/characters/fetchAdvancementArmor/${action.payload}`)
  yield put({ type: 'SET_ADVANCEMENT_ARMOR', payload: advancementArmor.data })
}

function* fetchAdvancementShield(action) {
  const advancementShield = yield axios.get(`/api/characters/fetchAdvancementShield/${action.payload}`)
  yield put({ type: 'SET_ADVANCEMENT_SHIELD', payload: advancementShield.data })
}

function* fetchAdvancementWeapons(action) {
  const advancementWeapons = yield axios.get(`/api/characters/fetchAdvancementWeapons/${action.payload}`)
  yield put({ type: 'SET_ADVANCEMENT_WEAPONS', payload: advancementWeapons.data })
}

function* fetchAdvancementGrenades(action) {
  const advancementGrenades = yield axios.get(`/api/characters/fetchAdvancementGrenades/${action.payload}`)
  yield put({ type: 'SET_ADVANCEMENT_GRENADES', payload: advancementGrenades.data })
}

function* fetchAdvancementMiscGear(action) {
  const advancementGear = yield axios.get(`/api/characters/fetchAdvancementMiscGear/${action.payload}`)
  yield put({ type: 'SET_ADVANCEMENT_MISC_GEAR', payload: advancementGear.data })
}

function* fetchAdvancementCyberware(action) {
  const advancementCyber = yield axios.get(`/api/characters/fetchAdvancementCyber/${action.payload}`)
  yield put({ type: 'SET_ADVANCEMENT_CYBERWARE', payload: advancementCyber.data })
}

function* fetchAdvancementVehicles(action) {
  const advancementVehicles = yield axios.get(`/api/characters/fetchAdvancementVehicle/${action.payload}`)
  yield put({ type: 'SET_ADVANCEMENT_VEHICLES', payload: advancementVehicles.data })
}

function* fetchAdvancementVehicleMods(action) {
  const advancementVehicleMods = yield axios.get(`/api/characters/fetchAdvancementVehicleMods/${action.payload}`)
  yield put({ type: 'SET_ADVANCEMENT_VEHICLE_MODS', payload: advancementVehicleMods.data })
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

function* fetchGameMasterContacts() {
  try {
    const allContacts = yield axios.get('/api/characters/fetchgamemastercontacts')
    yield put({ type: 'SET_CONTACT_LIST', payload: allContacts.data });
    const contactBridgeData = yield axios.get('/api/characters/fetchgamemastercontactbridgedata')
    yield put({ type: "SET_CONTACT_BRIDGE_DATA", payload: contactBridgeData.data })
  } catch (error) {
    console.log(`Error fetching master contact list for gamemaster`, error);
  }
}

function* fetchGameMasterSingleCharContacts(action) {
  try {
    const characterContacts = yield axios.get(`/api/characters/fetchCharacterContacts/${action.payload}`)
    yield put({ type: 'SET_CHARACTER_CONTACTS', payload: characterContacts.data })
  } catch (error) {
    console.log(`Error fetching character contacts for GM page.`);
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
  // in play fetch/save actions
  yield takeLatest('FETCH_ALL_CHARACTERS', fetchCharacters);
  yield takeLatest('FETCH_CHARACTER_DETAIL', fetchCharacterDetail);

  yield takeLatest('CHANGE_CHARACTER_HEALTH', changeCharacterHealth)
  yield takeLatest('CHANGE_CHARACTER_LUCK', changeCharacterLuck)

  yield takeLatest('USE_CONSUMABLE_FROM_PACK', useConsumableFromPack);
  yield takeLatest('ARBITRARY_BANK_CHANGE', arbitraryBankChange)
  yield takeLatest('CHAR_USE_GRENADE', charUseGrenade);
  yield takeLatest('MAKE_PHARMACEUTICAL', characterCreatePharmaceutical);

  yield takeLatest('CHARACTER_NEW_NOTE', createCharacterNote);
  yield takeLatest('CHARACTER_NOTE_UPDATE', updateCharacterNote);
  yield takeLatest('CHARACTER_DELETE_NOTE', deleteCharacterNote);
  yield takeLatest('CHARACTER_NEW_CONTACT', createCharacterContact);
  yield takeLatest('CHARACTER_CONTACT_UPDATE', updateCharacterContact);
  yield takeLatest('CHARACTER_DELETE_CONTACT', deleteCharacterContact);
  
  // permanent luck reduction
  yield takeLatest('PLAYER_BURN_ONE_LUCK', characterBurnLuck);
  
  // advancement fetch/save
  yield takeLatest('FETCH_ADVANCEMENT_DETAIL', fetchAdvancementDetails);
  yield takeLatest('SAVE_ADVANCEMENT_DETAIL', saveAdvancementDetails);
  yield takeLatest('FETCH_ADVANCEMENT_BANK', fetchAdvancementBank)
  yield takeLatest('FETCH_ADVANCEMENT_ARMOR', fetchAdvancementArmor);
  yield takeLatest('FETCH_ADVANCEMENT_SHIELD', fetchAdvancementShield);
  yield takeLatest('FETCH_ADVANCEMENT_WEAPONS', fetchAdvancementWeapons);
  yield takeLatest('FETCH_ADVANCEMENT_GRENADES', fetchAdvancementGrenades);
  yield takeLatest('FETCH_ADVANCEMENT_MISC_GEAR', fetchAdvancementMiscGear);
  yield takeLatest('FETCH_ADVANCEMENT_CYBERWARE', fetchAdvancementCyberware);
  yield takeLatest('FETCH_ADVANCEMENT_VEHICLES', fetchAdvancementVehicles);
  yield takeLatest('FETCH_ADVANCEMENT_VEHICLE_MODS', fetchAdvancementVehicleMods);
  yield takeLatest('FETCH_ADVANCEMENT_CLOTHES', fetchAdvancementClothes);

  // GM fetch/save/delete
  // yield takeLatest('FETCH_GM_CHARACTERS', fetchGameMasterCharacters)
  // yield takeLatest('SAVE_GM_CHANGES', saveGameMasterCharacter)
  // yield takeLatest('DELETE_CHARACTER', deleteGameMasterCharacter)
  // yield takeLatest('FETCH_GM_CONTACTS', fetchGameMasterContacts)
  // yield takeLatest('FETCH_GM_SINGLE_CHAR_CONTACTS', fetchGameMasterSingleCharContacts)
  // yield takeLatest('GM_CREATE_CONTACT', createGameMasterContacts)
  // yield takeLatest('SAVE_GM_CONTACT', saveGameMasterContact)
  // yield takeLatest('GM_DELETE_CONTACT', deleteGameMasterContact)
  // yield takeLatest('ASSIGN_CONTACT_CAMPAIGN_CHARS', assignContactChar)
}

export default characterSaga;
