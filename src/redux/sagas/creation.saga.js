import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* saveCreationCharacter(action) {
    try {
        console.log(`Creation char:`, action.payload);
        yield axios.post(`/api/characters/saveCreationCharacter/`, action.payload)

        for (let i = 0; i < action.payload.armor.length; i++) {
        yield axios.post(`/api/characters/saveCreationArmor/`, action.payload.armor[i])
        console.log(`Sending 1 armor`, action.payload.armor[i]);
        }

        for (let i = 0; i < action.payload.weapons.length; i++) {
        yield axios.post(`/api/characters/saveCreationWeapons/`, action.payload.weapons[i])
        console.log(`Sending 1 weapon`, action.payload.weapons[i]);
        }

        for (let i = 0; i < action.payload.gear.length; i++) {
        yield axios.post(`/api/characters/saveCreationGear/`, action.payload.gear[i])
        console.log(`Sending 1 gear`, action.payload.gear[i]);
        }
        for (let i = 0; i < action.payload.cyberware.length; i++) {
        yield axios.post(`/api/characters/saveCreationCyberware/`, action.payload.cyberware[i])
        console.log(`Sending 1 cyberware`, action.payload.cyberware[i]);
        }
    } catch (error) {
        console.log(`Error saving Creation Character`, error);
    }
}

function* creationSaga() {
    yield takeLatest('SAVE_CREATION_CHARACTER', saveCreationCharacter);
}


export default creationSaga;
