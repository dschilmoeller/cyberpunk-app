import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';



function* fetchMasterLists() {
    const armorList = yield axios.get('/api/gear/fetcharmor')
    const shieldList = yield axios.get('/api/gear/fetchshield')
    const weaponList = yield axios.get('/api/gear/fetchweapon')
    const grenadeList = yield axios.get('/api/gear/fetchgrenades')
    const gearList = yield axios.get('/api/gear/fetchmiscgear')
    const cyberList = yield axios.get('/api/gear/fetchcyberware')
    const netrunnerList = yield axios.get('/api/gear/fetchnetrunner')
    const vehicleList = yield axios.get('/api/gear/fetchvehicles')
    const vehicleModList = yield axios.get('/api/gear/fetchvehicleMods')
    const clothingList = yield axios.get('/api/gear/fetchclothing')
    // const lifestyleList = yield axios.get('/api/gear/lifestyle')

    yield put({
        type: 'SET_MASTER_EQUIPMENT_LISTS', payload: {
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
            // lifestyle: lifestyleList.data
        }
    })
}

function* fetchArmorMasterList() {
    const armorList = yield axios.get('/api/gear/fetcharmor')
    const shieldList = yield axios.get('/api/gear/fetchshield')
    yield put({ type: 'SET_ARMOR_MASTER_LISTS', payload: { armor: armorList.data, shields: shieldList.data } })
}

function* fetchWeaponMasterList() {
    const weaponList = yield axios.get('/api/gear/fetchweapon')
    yield put({ type: 'SET_WEAPON_MASTER_LIST', payload: { weapons: weaponList.data } })
}

function* fetchGrenadeMasterList() {
    const grenadeList = yield axios.get('/api/gear/fetchgrenades')
    yield put({ type: 'SET_GRENADE_MASTER_LIST', payload: { grenades: grenadeList.data } })
}

function* fetchMiscGearMasterList() {
    const gearList = yield axios.get('/api/gear/fetchmiscgear')
    yield put({ type: 'SET_MISC_GEAR_MASTER_LIST', payload: { miscGear: gearList.data } })
}

function* fetchGear() {
    try {
        const gearList = yield axios.get('/api/gear/fetchmiscgear')
        yield put({ type: "SET_MISC_GEAR_LIST", payload: gearList.data })
    } catch (error) {
        console.log(`Error fetching misc gear:`, error);
    }
}

function* fetchCyberwareMasterList() {
    const cyberList = yield axios.get('/api/gear/fetchcyberware')
    yield put({ type: 'SET_CYBERWARE_MASTER_LIST', payload: { cyberware: cyberList.data } })
}

function* fetchNetrunnerMasterList() {
    const netrunnerList = yield axios.get('/api/gear/fetchnetrunner')
    yield put({ type: 'SET_NETRUNNER_MASTER_LIST', payload: { netrunnerGear: netrunnerList.data } })
}

function* fetchVehicleMasterList() {
    const vehicleList = yield axios.get('/api/gear/fetchvehicles')
    const vehicleModList = yield axios.get('/api/gear/fetchvehicleMods')
    yield put({ type: 'SET_VEHICLE_MASTER_LISTS', payload: { vehicles: vehicleList.data, vehicleMods: vehicleModList.data, } })
}

function* fetchClothingMasterList() {
    const clothingList = yield axios.get('/api/gear/fetchclothing')
    yield put({ type: 'SET_CLOTHING_MASTER_LIST', payload: { clothing: clothingList.data } })
}

function* gearAttributeChange(action) {
    if (action.payload.type === 'cyber_strength') {
        yield axios.put(`/api/characters/attributegearchangestrength/${action.payload.charID}`, action.payload)
    } else if (action.payload.type === 'cyber_body') {
        yield axios.put(`/api/characters/attributegearchangebody/${action.payload.charID}`, action.payload)
    } else if (action.payload.type === 'cyber_reflexes') {
        yield axios.put(`/api/characters/attributegearchangereflexes/${action.payload.charID}`, action.payload)
    } else if (action.payload.type === 'cyber_appearance') {
        yield axios.put(`/api/characters/attributegearchangeappearance/${action.payload.charID}`, action.payload)
    } else if (action.payload.type === 'cyber_cool') {
        yield axios.put(`/api/characters/attributegearchangecool/${action.payload.charID}`, action.payload)
    }
}

function* buyArmor(action) {
    yield axios.post('/api/gear/buyarmor/', action.payload)
    yield axios.put(`api/characters/savecharacterbank/${action.payload.charID}`, action.payload)
    yield put({ type: 'FETCH_ADVANCEMENT_ARMOR', payload: action.payload.charID })
    yield put({ type: 'FETCH_CHARACTER_BANK', payload: action.payload.charID })
}

function* sellArmor(action) {
    yield axios.delete(`/api/gear/sellarmor/${action.payload.item.armor_bridge_id}`)
    yield axios.put(`api/characters/savecharacterbank/${action.payload.charID}`, action.payload)
    yield put({ type: 'FETCH_ADVANCEMENT_ARMOR', payload: action.payload.charID })
    yield put({ type: 'FETCH_CHARACTER_BANK', payload: action.payload.charID })
}

function* equipArmor(action) {
    yield axios.put(`api/characters/characterequiparmor/${action.payload.armor.armor_bridge_id}`)
    yield axios.put(`api/characters/changeCharacterArmorQuality/${action.payload.charID}`, action.payload.armor)
    yield put({ type: 'FETCH_ADVANCEMENT_ARMOR', payload: action.payload.charID })
}

function* unequipArmor(action) {
    yield axios.put(`api/characters/characterunequiparmor/${action.payload.armor.armor_bridge_id}`)
    yield axios.put(`api/characters/removeCharacterArmor/${action.payload.charID}`)
    yield put({ type: 'FETCH_ADVANCEMENT_ARMOR', payload: action.payload.charID })
}

function* buyShield(action) {
    yield axios.post('/api/gear/buyShield/', action.payload)
    yield axios.put(`api/characters/savecharacterbank/${action.payload.charID}`, action.payload)
    yield put({ type: 'FETCH_ADVANCEMENT_SHIELD', payload: action.payload.charID })
    yield put({ type: 'FETCH_CHARACTER_BANK', payload: action.payload.charID })
}

function* sellShield(action) {
    yield axios.delete(`/api/gear/sellShield/${action.payload.item.shield_bridge_id}`)
    yield axios.put(`api/characters/savecharacterbank/${action.payload.charID}`, action.payload)
    yield put({ type: 'FETCH_ADVANCEMENT_SHIELD', payload: action.payload.charID })
    yield put({ type: 'FETCH_CHARACTER_BANK', payload: action.payload.charID })
}

function* equipShield(action) {
    yield axios.put(`api/characters/equipshield/${action.payload.shield.shield_bridge_id}`)
    yield axios.put(`api/characters/changeCharacterShieldQuality/${action.payload.charID}`, action.payload.shield)
    yield put({ type: 'FETCH_ADVANCEMENT_SHIELD', payload: action.payload.charID })
}

function* unequipShield(action) {
    yield axios.put(`api/characters/unequipshield/${action.payload.shield.shield_bridge_id}`)
    yield axios.put(`api/characters/removeCharacterShield/${action.payload.charID}`)
    yield put({ type: 'FETCH_ADVANCEMENT_SHIELD', payload: action.payload.charID })
}

function* buyWeapon(action) {

}

function* sellWeapon(action) {

}

function* equipWeapon(action) {
    yield axios.put(`api/characters/equipweapon/${action.payload.weapon.weapon_bridge_id}`)
    yield put({ type: 'FETCH_ADVANCEMENT_WEAPONS', payload: action.payload.charID})
}

function* unequipWeapon(action) {
    yield axios.put(`api/characters/unequipweapon/${action.payload.weapon.weapon_bridge_id}`)
    yield put({ type: 'FETCH_ADVANCEMENT_WEAPONS', payload: action.payload.charID})
}

function* buyGrenade(action) {

}

function* sellGrenade(action) {

}

function* buyMiscGear(action) {

}

function* sellMiscGear(action) {

}

function* buyCyberware(action) {

}

function* sellCyberware(action) {

}

// need separate function for each of these changes. Or logic handlers to determine if they get dinged or not.
function* equipCyberware(action) {
    // hits char-cyber-status - equipped (char_owned_cyberware currently)
    // possibly hits char-cyber bridge - slot changes (char_cyberware_bridge currently) - not applicable for chips,eg.
    // possibly hits char_status -> cyber armor
    // possibly hits char -> cyber-attributes
}

function* unequipCyberware(action){

}

function* buyNetrunner(action) {

}

function* sellNetrunner(action) {

}

function* equipNetrunner(action){
    // this will probably be only slight less complicated than the cyberware equipping/unequipping.
}

function* unequipNetrunner(action){

}

function* buyVehicle(action){

}

function* sellVehicle(action) {

}

function* buyVehicleMod(action){

}

function* sellVehicleMod(action){

}

function* equipVehicleMod(action) {
    // hits char_owned_vehicle_mods (put)
    // hits char_vehicle_mod_bridge (post)
    // hits char_vehicle_bridge (put) -> mod effects (has_armor, extra_seats, total_mod_cost)
}

function* unequipVehicleMod(action){

}

function* buyClothing(action) {
    yield axios.post('/api/gear/buyclothing/', action.payload)
    yield axios.put(`api/characters/savecharacterbank/${action.payload.charID}`, action.payload)
    yield put({ type: 'FETCH_ADVANCEMENT_CLOTHES', payload: action.payload.charID })
    yield put({ type: 'FETCH_CHARACTER_BANK', payload: action.payload.charID })
}

function* sellClothing(action) {
    yield axios.delete(`/api/gear/sellclothing/${action.payload.item.clothing_bridge_id}`)
    yield axios.put(`api/characters/savecharacterbank/${action.payload.charID}`, action.payload)
    yield put({ type: 'FETCH_ADVANCEMENT_CLOTHES', payload: action.payload.charID })
    yield put({ type: 'FETCH_CHARACTER_BANK', payload: action.payload.charID })
}

function* equipClothes(action) {
    // payload is solely clothing_bridge_id
    yield axios.put(`api/characters/characterequipclothing/${action.payload.clothingID}`)
    yield put({ type: 'FETCH_ADVANCEMENT_CLOTHES', payload: action.payload.charID })
}

function* unequipClothes(action) {
    yield axios.put(`api/characters/characterunequipclothing/${action.payload.clothingID}`)
    yield put({ type: 'FETCH_ADVANCEMENT_CLOTHES', payload: action.payload.charID })
}

function* alterClothing(action) {
    // covers improving/degrading equipped clothing.
    yield axios.put(`api/characters/characteralterclothing/${action.payload.item.clothing_bridge_id}`, action.payload)
    yield axios.put(`api/characters/savecharacterbank/${action.payload.charID}`, action.payload)
    yield put({ type: 'FETCH_ADVANCEMENT_CLOTHES', payload: action.payload.charID })
    yield put({ type: 'FETCH_CHARACTER_BANK', payload: action.payload.charID })
}


function* gearSaga() {
    yield takeLatest('FETCH_MASTER_LISTS', fetchMasterLists);

    yield takeLatest('FETCH_ARMOR_MASTER_LIST', fetchArmorMasterList);
    yield takeLatest('FETCH_MISC_GEAR_LIST', fetchGear);
    yield takeLatest('FETCH_WEAPON_MASTER_LIST', fetchWeaponMasterList);
    yield takeLatest('FETCH_GRENADE_MASTER_LIST', fetchGrenadeMasterList);
    yield takeLatest('FETCH_MISC_GEAR_MASTER_LIST', fetchMiscGearMasterList);
    yield takeLatest('FETCH_CYBERWARE_MASTER_LIST', fetchCyberwareMasterList);
    yield takeLatest('FETCH_NETRUNNER_MASTER_LIST', fetchNetrunnerMasterList);
    yield takeLatest('FETCH_VEHICLE_MASTER_LIST', fetchVehicleMasterList);
    yield takeLatest('FETCH_CLOTHING_MASTER_LIST', fetchClothingMasterList);
    
    yield takeLatest('ATTRIBUTE_ENHANCING_GEAR_EQUIPPED', gearAttributeChange);

    yield takeLatest('BUY_ARMOR', buyArmor);
    yield takeLatest('SELL_ARMOR', sellArmor);
    yield takeLatest('EQUIP_ARMOR', equipArmor);
    yield takeLatest('UNEQUIP_ARMOR', unequipArmor);

    yield takeLatest('EQUIP_WEAPON', equipWeapon);
    yield takeLatest('UNEQUIP_WEAPON', unequipWeapon);

    yield takeLatest('BUY_SHIELD', buyShield);
    yield takeLatest('SELL_SHIELD', sellShield);
    yield takeLatest('EQUIP_SHIELD', equipShield);
    yield takeLatest('UNEQUIP_SHIELD', unequipShield);


    yield takeLatest('BUY_CLOTHING', buyClothing);
    yield takeLatest('SELL_CLOTHING', sellClothing);
    yield takeLatest('EQUIP_CLOTHES', equipClothes);
    yield takeLatest('UNEQUIP_CLOTHES', unequipClothes);
    yield takeLatest('ALTER_CLOTHING', alterClothing);
}

export default gearSaga;
