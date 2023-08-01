import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetch character names and IDs
function* fetchCharacters() {
  try {
    const allCharacters = yield axios.get('/api/characters/fetchallcharacters')
    yield put({ type: "SET_CHARACTER_LIST", payload: allCharacters.data });
  } catch (error) {
    console.log('Error fetching all characters:', error);
  }
}

// Fetch Character Details for in-play sheet
function* fetchCharacterDetail(action) {
  try {
    const characterDetail = yield axios.get(`/api/characters/fetchcharacterdetails/${action.payload}`)
    yield put({ type: 'SET_CHARACTER_DETAIL', payload: characterDetail.data[0] });
    const characterCyberBridgeDetail = yield axios.get(`/api/characters/fetchcharactercyberdetails/${action.payload}`)
    yield put({ type: 'SET_CHARACTER_CYBER_DETAIL', payload: characterCyberBridgeDetail.data })
    const characterStatus = yield axios.get(`api/characters/fetchcharacterstatus/${action.payload}`)
    yield put({ type: 'SET_CHARACTER_STATUS', payload: characterStatus.data[0] })
    const characterWeapons = yield axios.get(`api/characters/fetchcharacterweapons/${action.payload}`)
    yield put({ type: 'SET_CHARACTER_WEAPONS', payload: characterWeapons.data })
  } catch (error) {
    console.log(`Error fetching character details`, error);
  }
};

// Character Changes (put) 

function* saveCharacterSheet(action) {
  try {
    yield axios.put(`api/characters/savecharacter/${action.payload.charID}`, action.payload.charParams.charStatus)
    for (let i = 0; i < action.payload.charParams.charWeapons.length; i++) {
      yield axios.put(`api/characters/savecharacterweapons/${action.payload.charID}`, action.payload.charParams.charWeapons[i])
    }
  } catch (error) {
    console.log(`Error saving Character Details`, error);
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


function* fetchAdvancementDetails(action) {
  try {
    const advancementDetails = yield axios.get(`/api/characters/fetchAdvancementDetails/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_DETAIL', payload: advancementDetails.data[0] })

    const advancementArmor = yield axios.get(`/api/characters/fetchAdvancementArmor/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_ARMOR', payload: advancementArmor.data })

    const advancementShield = yield axios.get(`/api/characters/fetchAdvancementShield/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_SHIELD', payload: advancementShield.data })

    const advancementWeapons = yield axios.get(`/api/characters/fetchAdvancementWeapons/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_WEAPONS', payload: advancementWeapons.data })

    const advancementGear = yield axios.get(`/api/characters/fetchAdvancementGear/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_GEAR', payload: advancementGear.data })

    const advancementCyber = yield axios.get(`/api/characters/fetchAdvancementCyber/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_CYBERWARE', payload: advancementCyber.data })

    const advancementCyberSlots = yield axios.get(`/api/characters/fetchAdvancementCyberSlots/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_CYBERWARE_SLOTS', payload: advancementCyberSlots.data[0] })
  } catch (error) {
    console.log(`Error fetching advancement details`, error);
  }
}

function* saveAdvancementDetails(action) {
  try {
    yield axios.put(`api/characters/saveAdvancementCharacter/${action.payload.char.id}`, action.payload)
  } catch (error) {
    console.log(`Error saving advancement Character Details:`, error);
  }
}

function* fetchGameMasterCharacters() {
  try {
    const allCharacters = yield axios.get('/api/characters/fetchGameMasterCharacters')
    console.log(`payload`, allCharacters.data);
    yield put({ type: "SET_GM_CHARACTER_LIST", payload: allCharacters.data });
  } catch (error) {
    console.log('Error fetching characters for Game Master:', error);
  }
}

function* characterSaga() {
  // in play fetch/save
  yield takeLatest('FETCH_ALL_CHARACTERS', fetchCharacters);
  yield takeLatest('FETCH_CHARACTER_DETAIL', fetchCharacterDetail);
  yield takeLatest('SAVE_CHARACTER_SHEET', saveCharacterSheet);

  // advancement fetch/save
  yield takeLatest('FETCH_ADVANCEMENT_DETAIL', fetchAdvancementDetails);
  yield takeLatest('SAVE_ADVANCEMENT_DETAIL', saveAdvancementDetails);

  // GM fetch/save
  yield takeLatest('FETCH_GM_CHARACTERS', fetchGameMasterCharacters)
  yield takeLatest('SAVE_GM_CHANGES', saveGameMasterCharacter)
}

export default characterSaga;
