import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetch character names and IDs
function* fetchArmor() {
    try {
        const armorList = yield axios.get('/api/gear/armor')
        yield put({ type: "SET_ARMOR_LIST", payload: armorList.data });

        // const cyberList = yield axios.get('/api/gear/cyber')
        // yield put({ type: "SET_CYBER_LIST", payload: cyberList.data})
    } catch (error) {
        console.log('Error fetching armor:', error);
    }
}

function* fetchWeapon() {
    try {
        const weaponList = yield axios.get('/api/gear/weapon')
        yield put({ type: "SET_WEAPON_LIST", payload: weaponList.data })
    } catch (error) {
        console.log('Error fetching armor:', error);
    }
}

function* gearSaga() {
    yield takeLatest('FETCH_ARMOR_LIST', fetchArmor);
    yield takeLatest('FETCH_WEAPON_LIST', fetchWeapon);
}

export default gearSaga;
