import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetch all characters - fetches character names and IDs to list on user page.
function* fetchCharacters() {
  try {
    const allCharacters = yield axios.get('/api/characters/fetchallcharacters')
    yield put({ type: "SET_CHARACTER_LIST", payload: allCharacters.data });
  } catch (error) {
    console.log('Error fetching all characters:', error);
  }
}

// Fetch Character Details
function* fetchCharacterDetail(action) {
  try {
    const characterDetail = yield axios.get(`/api/characters/fetchcharacterdetails/${action.payload}`)
    yield put({ type: 'SET_CHARACTER_DETAIL', payload: characterDetail.data });
    const characterCyberBridgeDetail = yield axios.get(`/api/characters/fetchcharactercyberdetails/${action.payload}`)
    yield put({ type: 'SET_CHARACTER_CYBER_DETAIL', payload: characterCyberBridgeDetail.data })
    const characterStatus = yield axios.get(`api/characters/fetchcharacterstatus/${action.payload}`)
    yield put({ type: 'SET_CHARACTER_STATUS', payload: characterStatus.data})
  } catch (error) {
    console.log(`Error fetching character details`, error);
  }
};

// TODO:
// Character Changes (put)
// 

function* characterSaga() {
  yield takeLatest('FETCH_ALL_CHARACTERS', fetchCharacters);
  yield takeLatest('FETCH_CHARACTER_DETAIL', fetchCharacterDetail)
}

export default characterSaga;
