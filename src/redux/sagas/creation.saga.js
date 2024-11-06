import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* saveCreationCharacter(action) {
  try {
    yield axios.post(`/api/characters/saveCreationCharacter/`, action.payload);
  } catch (error) {
    console.log(`Error saving Creation Character`, error);
  }
}

function* getCampaigns() {
  try {
    const campaigns = yield axios.get('/api/characters/fetchcampaigns');
    yield put({ type: 'SET_CAMPAIGN_LIST', payload: campaigns.data });
  } catch (error) {
    console.log(`Error fetching campaign list`, error);
  }
}

function* creationSaga() {
  yield takeLatest('SAVE_CREATION_CHARACTER', saveCreationCharacter);
  yield takeLatest('FETCH_CAMPAIGNS', getCampaigns);
}

export default creationSaga;
