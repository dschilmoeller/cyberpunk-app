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

function* changeGearEquipStatus(action) {
    try {
        yield axios.put(`api/characters/changeEquipStatus/${action.payload.tableID}`, action.payload)
        // Equipping Armor
        if (action.payload.item.armor_master_id != undefined && action.payload.equipStatus === true) {
            yield axios.put(`api/characters/changeCharacterArmorQuality/${action.payload.charID}`, action.payload.item)
            yield put({ type: 'FETCH_ADVANCEMENT_ARMOR', payload: action.payload.charID })
        }
        // Unequipping Armor
        if (action.payload.item.armor_master_id != undefined && action.payload.equipStatus === false) {
            yield axios.put(`api/characters/removeCharacterArmor/${action.payload.charID}`)
            yield put({ type: 'FETCH_ADVANCEMENT_ARMOR', payload: action.payload.charID })
        }
        // Equipping Shield
        if (action.payload.item.shield_master_id != undefined && action.payload.equipStatus === true) {
            yield axios.put(`api/characters/changeCharacterShieldQuality/${action.payload.charID}`, action.payload.item)
            yield put({ type: 'FETCH_ADVANCEMENT_SHIELD', payload: action.payload.charID })
        }
        // Unequipping Shield
        if (action.payload.item.shield_master_id != undefined && action.payload.equipStatus === false) {
            yield axios.put(`api/characters/removeCharacterShield/${action.payload.charID}`)
            yield put({ type: 'FETCH_ADVANCEMENT_SHIELD', payload: action.payload.charID })
        }
        // Equipping Weapon
        if (action.payload.item.weapon_master_id != undefined) {
            yield put({ type: 'FETCH_ADVANCEMENT_WEAPONS', payload: action.payload.charID })
        }

        // Equipping Clothes
        if (action.payload.item.clothing_master_id != undefined) {
            yield put({ type: 'FETCH_ADVANCEMENT_CLOTHES', payload: action.payload.charID })
        }
    } catch (error) {
        console.log(`Error changing item equip status`, error);
    }

}


function* equipCyberware(action) {
    // hits char-cyber-status - equipped (char_owned_cyberware currently)
    // possibly hits char-cyber bridge - slot changes (char_cyberware_bridge currently) - not applicable for chips,eg.
    // possibly hits char_status -> cyber armor
    // possibly hits char -> cyber-attributes
}

function* unequipCyberware(action) {

}

// this is probably going to be its own thing.
function* equipVehicleMod(action) {
    // hits char_owned_vehicle_mods (put)
    // hits char_vehicle_mod_bridge (post)
    // hits char_vehicle_bridge (put) -> mod effects (has_armor, extra_seats, total_mod_cost)
}

function* unequipVehicleMod(action) {

}

function* equipNetrunner(action) {
    // this will probably be only slight less complicated than the cyberware equipping/unequipping.
}

function* unequipNetrunner(action) {

}

// can probably collapse buy/sell routes as well, similar to equip as well. 
function* buyItem(action) {
    try {
        console.log(`action.payload - buy item:`, action.payload);
        yield axios.post('api/gear/buyitem/', action.payload)
        yield axios.put(`api/characters/savecharacterbank/${action.payload.charID}`, action.payload)
        if (action.payload.table === 'char_armor_bridge') {
            yield put({ type: 'FETCH_ADVANCEMENT_ARMOR', payload: action.payload.charID })
        }
        if (action.payload.table === 'char_shield_bridge') {
            yield put({ type: 'FETCH_ADVANCEMENT_SHIELD', payload: action.payload.charID })
        }
        if (action.payload.table === 'char_weapons_bridge') {
            yield put({ type: 'FETCH_ADVANCEMENT_WEAPONS', payload: action.payload.charID })
        }
        if (action.payload.table === 'char_grenade_bridge') {
            yield put({ type: 'FETCH_ADVANCEMENT_GRENADES', payload: action.payload.charID })
        }
        if (action.payload.table === 'char_gear_bridge') {
            yield put({ type: 'FETCH_ADVANCEMENT_MISC_GEAR', payload: action.payload.charID })
        }
        if (action.payload.table === 'char_owned_cyberware') {
            yield put({ type: 'FETCH_ADVANCEMENT_CYBERWARE', payload: action.payload.charID })
        }
        if (action.payload.table === 'char_vehicle_bridge') {
            yield put({ type: 'FETCH_ADVANCEMENT_VEHICLES', payload: action.payload.charID })
        }
        if (action.payload.table === 'char_owned_vehicle_mods') {
            yield put({ type: 'FETCH_ADVANCEMENT_VEHICLE_MODS', payload: action.payload.charID });
        }
        if (action.payload.table === 'char_clothing_bridge') {
            yield put({ type: 'FETCH_ADVANCEMENT_CLOTHES', payload: action.payload.charID })
        }
        yield put({ type: 'FETCH_CHARACTER_BANK', payload: action.payload.charID })
    } catch (error) {
        console.log(`Error purchasing item:`, error);
    }
}

function* sellItem(action) {
    try {
        console.log(`action.payload - sell item:`, action.payload);
        yield axios.delete('api/gear/sellItem/', { data: action.payload })
        if (action.payload.table === 'char_armor_bridge') {
            yield put({ type: 'FETCH_ADVANCEMENT_ARMOR', payload: action.payload.charID })
        }
        if (action.payload.table === 'char_shield_bridge') {
            yield put({ type: 'FETCH_ADVANCEMENT_SHIELD', payload: action.payload.charID })
        }
        if (action.payload.table === 'char_weapons_bridge') {
            yield put({ type: 'FETCH_ADVANCEMENT_WEAPONS', payload: action.payload.charID })
        }
        if (action.payload.table === 'char_grenade_bridge') {
            yield put({ type: 'FETCH_ADVANCEMENT_GRENADES', payload: action.payload.charID })
        }
        if (action.payload.table === 'char_gear_bridge') {
            yield put({ type: 'FETCH_ADVANCEMENT_MISC_GEAR', payload: action.payload.charID })
        }
        if (action.payload.table === 'char_owned_cyberware') {
            yield put({ type: 'FETCH_ADVANCEMENT_CYBERWARE', payload: action.payload.charID })
        }
        if (action.payload.table === 'char_vehicle_bridge') {
            yield put({ type: 'FETCH_ADVANCEMENT_VEHICLES', payload: action.payload.charID })
        }
        if (action.payload.table === 'char_owned_vehicle_mods') {
            yield put({ type: 'FETCH_ADVANCEMENT_VEHICLE_MODS', payload: action.payload.charID });
        }
        if (action.payload.table === 'char_clothing_bridge') {
            yield put({ type: 'FETCH_ADVANCEMENT_CLOTHES', payload: action.payload.charID })
        }
        yield axios.put(`api/characters/savecharacterbank/${action.payload.charID}`, action.payload)
        yield put({ type: 'FETCH_CHARACTER_BANK', payload: action.payload.charID })

    } catch (error) {
        console.log(`Error selling item:`, error);
    }
}

function* buyNetrunner(action) {
}

function* sellNetrunner(action) {
}

function* sellVehicle(action) {
}

function* sellVehicleMod(action) {
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

    yield takeLatest('CHANGE_GEAR_EQUIP_STATUS', changeGearEquipStatus);

    yield takeLatest('BUY_ITEM', buyItem);
    yield takeLatest('SELL_ITEM', sellItem);

    yield takeLatest('ALTER_CLOTHING', alterClothing);
}

export default gearSaga;
