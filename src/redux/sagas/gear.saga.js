import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// fetch character names and IDs
function* fetchArmor() {
    try {
        const armorList = yield axios.get('/api/gear/armor')
        yield put({ type: "SET_ARMOR_LIST", payload: armorList.data });
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

function* fetchGear() {
    try {
        const gearList = yield axios.get('/api/gear/miscgear')
        yield put({ type: "SET_MISC_GEAR_LIST", payload: gearList.data })
    } catch (error) {
        console.log(`Error fetching misc gear:`, error);
    }
}

function* fetchCyberware() {
    try {
        const cyberList = yield axios.get('/api/gear/cyberware')
        yield put({ type: "SET_CYBERWARE_LIST", payload: cyberList.data })
    } catch (error) {
        console.log(`Error fetching cyberware list:`, error);
    }
}

function* gearSaga() {
        yield takeLatest('FETCH_ARMOR_LIST', fetchArmor);
        yield takeLatest('FETCH_WEAPON_LIST', fetchWeapon);
        yield takeLatest('FETCH_MISC_GEAR_LIST', fetchGear);
        yield takeLatest('FETCH_CYBERWARE_LIST', fetchCyberware);
    }

    export default gearSaga;
