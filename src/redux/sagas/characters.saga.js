import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { useSelector } from 'react-redux';

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

// TODO:
// Character Changes (put)
// 

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

function* characterSaga() {
  yield takeLatest('FETCH_ALL_CHARACTERS', fetchCharacters);
  yield takeLatest('FETCH_CHARACTER_DETAIL', fetchCharacterDetail);
  yield takeLatest('SAVE_CHARACTER_SHEET', saveCharacterSheet);
}

export default characterSaga;
