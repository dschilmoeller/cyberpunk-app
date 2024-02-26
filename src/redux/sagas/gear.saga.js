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
    const shieldList = yield axios.get('/api/gear/shield')
    const weaponList = yield axios.get('/api/gear/weapon')
    const grenadeList = yield axios.get('/api/gear/grenades')
    const gearList = yield axios.get('/api/gear/miscgear')
    const cyberList = yield axios.get('/api/gear/cyberware')
    const netrunnerList = yield axios.get('/api/gear/netrunner')
    const vehicleList = yield axios.get('/api/gear/vehicles')
    const vehicleModList = yield axios.get('/api/gear/vehicleMods')
    const clothingList = yield axios.get('/api/gear/clothing')
    const lifestyleList = yield axios.get('/api/gear/lifestyle')

    yield put({ type: 'SET_MASTER_EQUIPMENT_LISTS', payload: {
        armor: armorList.data,
        shields: shieldList.data,
        weapons: weaponList.data,
        grenades: grenadeList.data,
        miscGear: gearList.data,
        cyberware: cyberList.data,
        netrunnerGear: netrunnerList.data,
        vehicles: vehicleList.data,
        vehicleMods: vehicleModList.data,
        clothing: clothingList.data,
        lifestyle: lifestyleList.data
    }})
}

function* gearSaga() {
    yield takeLatest('FETCH_MASTER_LISTS', fetchMasterLists);
    yield takeLatest('FETCH_MISC_GEAR_LIST', fetchGear);
}

export default gearSaga;
