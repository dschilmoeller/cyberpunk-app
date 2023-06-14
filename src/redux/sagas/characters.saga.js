import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetch all characters - fetches character names and IDs to list on user page.
function* fetchCharacters() {
  try {
    const allCharacters = yield axios.get("/api/characters/fetchallcharacters")
    yield put({ type: "SET_CHARACTER_LIST", payload: allCharacters.data });
  } catch (error) {
    console.log('Error fetching all characters:', error);
  }
}

// TODO:
// Fetch Character Details
// Character Change Puts
// 

function* characterSaga() {
  yield takeLatest('FETCH_CHARACTERS', fetchCharacters);
}

export default characterSaga;
