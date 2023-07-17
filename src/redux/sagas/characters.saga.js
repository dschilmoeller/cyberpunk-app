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
    yield put({ type: 'SET_CHARACTER_DETAIL', payload: characterDetail.data });
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

function* fetchAdvancementDetails(action) {
  try {
    const advancementDetails = yield axios.get(`/api/characters/fetchAdvancementDetails/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_DETAIL', payload: advancementDetails.data})
    
    const advancementOwnedArmor = yield axios.get(`/api/characters/fetchAdvancementOwnedArmor/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_OWNED_ARMOR', payload: advancementOwnedArmor.data})
    const advancementEquippedArmor = yield axios.get(`/api/characters/fetchAdvancementEquippedArmor/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_EQUIPPED_ARMOR', payload: advancementEquippedArmor.data})

    const advancementOwnedWeapons = yield axios.get(`/api/characters/fetchAdvancementOwnedWeapons/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_OWNED_WEAPONS', payload: advancementOwnedWeapons.data})
    const advancementEquippedWeapons = yield axios.get(`/api/characters/fetchAdvancementEquippedWeapons/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_EQUIPPED_WEAPONS', payload: advancementEquippedWeapons.data})

    const advancementOwnedGear = yield axios.get(`/api/characters/fetchAdvancementOwnedGear/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_OWNED_GEAR', payload: advancementOwnedGear.data})
    // no distinction currently between owned/equipped gear.
    // const advancementEquippedGear = yield axios.get(`/api/characters/fetchAdvancementEquippedGear/${action.payload}`)
    // yield put({ type: 'SET_ADVANCEMENT_EQUIPPED_GEAR', payload: advancementEquippedGear.data})    

    const advancementOwnedCyber = yield axios.get(`/api/characters/fetchAdvancementOwnedcyber/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_OWNED_CYBERWARE', payload: advancementOwnedCyber.data})
    const advancementEquippedCyber = yield axios.get(`/api/characters/fetchAdvancementEquippedcyber/${action.payload}`)
    yield put({ type: 'SET_ADVANCEMENT_EQUIPPED_CYBERWARE', payload: advancementEquippedCyber.data})
  } catch (error) {
    console.log(`Error fetching advancement details`, error);
  }
}

function* characterSaga() {
  // in play fetch/save
  yield takeLatest('FETCH_ALL_CHARACTERS', fetchCharacters);
  yield takeLatest('FETCH_CHARACTER_DETAIL', fetchCharacterDetail);
  yield takeLatest('SAVE_CHARACTER_SHEET', saveCharacterSheet);

  // advancement fetch/save
  yield takeLatest('FETCH_ADVANCEMENT_DETAIL', fetchAdvancementDetails);
}

export default characterSaga;
