import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* saveCreationCharacter(action) {
    try {
        console.log(`Creation char:`, action.payload);
        yield axios.post(`/api/characters/saveCreationCharacter/`, action.payload)
    } catch (error) {
        console.log(`Error saving Creation Character`, error);
    }
}

function* creationSaga() {
    yield takeLatest('SAVE_CREATION_CHARACTER', saveCreationCharacter);
}


export default creationSaga;
