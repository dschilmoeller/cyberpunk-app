import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchGear() {
    try {
        const gearList = yield axios.get('/api/gear/miscgear')
        yield put({ type: "SET_MISC_GEAR_LIST", payload: gearList.data })
    } catch (error) {
        console.log(`Error fetching misc gear:`, error);
    }
}

function* fetchMasterLists() {
    const armorList = yield axios.get('/api/gear/armor')
    yield put({ type: "SET_ARMOR_LIST", payload: armorList.data });
    const shieldList = yield axios.get('/api/gear/shield')
        yield put({ type: "SET_SHIELD_LIST", payload: shieldList.data });
        const weaponList = yield axios.get('/api/gear/weapon')
        yield put({ type: "SET_WEAPON_LIST", payload: weaponList.data })
        const grenadeList = yield axios.get('/api/gear/grenades')
        yield put({ type: "SET_GRENADE_LIST", payload: grenadeList.data })
        const gearList = yield axios.get('/api/gear/miscgear')
        yield put({ type: "SET_MISC_GEAR_LIST", payload: gearList.data })
        const cyberList = yield axios.get('/api/gear/cyberware')
        yield put({ type: "SET_CYBERWARE_LIST", payload: cyberList.data })
        const netrunnerList = yield axios.get('/api/gear/netrunner')
        yield put({ type: "SET_NETRUNNER_LIST", payload: netrunnerList.data })
        const vehicleList = yield axios.get('/api/gear/vehicles')
        yield put({ type: "SET_VEHICLE_LIST", payload: vehicleList.data })
        const vehicleModList = yield axios.get('/api/gear/vehicleMods')
        yield put({ type: "SET_VEHICLE_MOD_LIST", payload: vehicleModList.data })
}

function* gearSaga() {
    yield takeLatest('FETCH_MASTER_LISTS', fetchMasterLists);
    yield takeLatest('FETCH_MISC_GEAR_LIST', fetchGear);
}

export default gearSaga;
