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

function* fetchShield() {
    try {
        const shieldList = yield axios.get('/api/gear/shield')
        yield put({ type: "SET_SHIELD_LIST", payload: shieldList.data });
    } catch (error) {
        console.log('Error fetching shield:', error);
    }
}

function* fetchWeapon() {
    try {
        const weaponList = yield axios.get('/api/gear/weapon')
        yield put({ type: "SET_WEAPON_LIST", payload: weaponList.data })
    } catch (error) {
        console.log('Error fetching weapon:', error);
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

function* fetchNetrunner() {
    try {
        const netrunnerList = yield axios.get('/api/gear/netrunner')
        yield put({ type: "SET_NETRUNNER_LIST", payload: netrunnerList.data })
    } catch (error) {
        console.log(`Error fetching netrunner list:`, error);
    }
}

function* fetchVehicles() {
    try {
        const vehicleList = yield axios.get('/api/gear/vehicles')
        yield put({ type: "SET_VEHICLE_LIST", payload: vehicleList.data })
    } catch (error) {
        console.log(`Error fetching vehicle list`, error);
    }
}

function* fetchVehicleMods() {
    try {
        const vehicleModList = yield axios.get('/api/gear/vehicleMods')
        yield put({ type: "SET_VEHICLE_MOD_LIST", payload: vehicleModList.data })
    } catch (error) {
        console.log(`Error fetching vehicle modification list:`, error);
    }
}

function* gearSaga() {
    yield takeLatest('FETCH_ARMOR_LIST', fetchArmor);
    yield takeLatest('FETCH_SHIELD_LIST', fetchShield)
    yield takeLatest('FETCH_WEAPON_LIST', fetchWeapon);
    yield takeLatest('FETCH_MISC_GEAR_LIST', fetchGear);
    yield takeLatest('FETCH_CYBERWARE_LIST', fetchCyberware);
    yield takeLatest('FETCH_NETRUNNER_LIST', fetchNetrunner);
    yield takeLatest('FETCH_VEHICLE_LIST', fetchVehicles);
    yield takeLatest('FETCH_VEHICLE_MOD_LIST', fetchVehicleMods)
}

export default gearSaga;
