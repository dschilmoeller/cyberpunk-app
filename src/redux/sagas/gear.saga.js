import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchMasterLists() {
  const armorList = yield axios.get('/api/gear/fetcharmor');
  const shieldList = yield axios.get('/api/gear/fetchshield');
  const weaponList = yield axios.get('/api/gear/fetchweapon');
  const grenadeList = yield axios.get('/api/gear/fetchgrenades');
  const gearList = yield axios.get('/api/gear/fetchmiscgear');
  const pharmaList = yield axios.get('/api/gear/fetchPharma');
  const cyberList = yield axios.get('/api/gear/fetchcyberware');
  const netrunnerList = yield axios.get('/api/gear/fetchnetrunner');
  const vehicleList = yield axios.get('/api/gear/fetchvehicles');
  const vehicleModList = yield axios.get('/api/gear/fetchvehicleMods');
  const clothingList = yield axios.get('/api/gear/fetchclothing');
  // const lifestyleList = yield axios.get('/api/gear/lifestyle')

  yield put({
    type: 'SET_MASTER_EQUIPMENT_LISTS',
    payload: {
      armor: armorList.data,
      shields: shieldList.data,
      weapons: weaponList.data,
      grenades: grenadeList.data,
      miscGear: gearList.data,
      pharma: pharmaList.data,
      cyberware: cyberList.data,
      netrunnerGear: netrunnerList.data,
      vehicles: vehicleList.data,
      vehicleMods: vehicleModList.data,
      clothing: clothingList.data,
      // lifestyle: lifestyleList.data
    },
  });
}

function* fetchArmorMasterList() {
  const armorList = yield axios.get('/api/gear/fetcharmor');
  const shieldList = yield axios.get('/api/gear/fetchshield');
  yield put({
    type: 'SET_ARMOR_MASTER_LISTS',
    payload: { armor: armorList.data, shields: shieldList.data },
  });
}

function* fetchWeaponMasterList() {
  const weaponList = yield axios.get('/api/gear/fetchweapon');
  yield put({
    type: 'SET_WEAPON_MASTER_LIST',
    payload: { weapons: weaponList.data },
  });
}

function* fetchGrenadeMasterList() {
  const grenadeList = yield axios.get('/api/gear/fetchgrenades');
  yield put({
    type: 'SET_GRENADE_MASTER_LIST',
    payload: { grenades: grenadeList.data },
  });
}

function* fetchMiscGearMasterList() {
  const gearList = yield axios.get('/api/gear/fetchmiscgear');
  yield put({
    type: 'SET_MISC_GEAR_MASTER_LIST',
    payload: { miscGear: gearList.data },
  });
}

function* fetchGear() {
  try {
    const gearList = yield axios.get('/api/gear/fetchmiscgear');
    yield put({ type: 'SET_MISC_GEAR_LIST', payload: gearList.data });
  } catch (error) {
    console.log(`Error fetching misc gear:`, error);
  }
}

function* fetchCyberwareMasterList() {
  const cyberList = yield axios.get('/api/gear/fetchcyberware');
  yield put({
    type: 'SET_CYBERWARE_MASTER_LIST',
    payload: { cyberware: cyberList.data },
  });
}

function* fetchNetrunnerMasterList() {
  const netrunnerList = yield axios.get('/api/gear/fetchnetrunner');
  yield put({
    type: 'SET_NETRUNNER_MASTER_LIST',
    payload: { netrunnerGear: netrunnerList.data },
  });
}

function* fetchVehicleMasterList() {
  const vehicleList = yield axios.get('/api/gear/fetchvehicles');
  const vehicleModList = yield axios.get('/api/gear/fetchvehicleMods');
  yield put({
    type: 'SET_VEHICLE_MASTER_LISTS',
    payload: { vehicles: vehicleList.data, vehicleMods: vehicleModList.data },
  });
}

function* fetchClothingMasterList() {
  const clothingList = yield axios.get('/api/gear/fetchclothing');
  yield put({
    type: 'SET_CLOTHING_MASTER_LIST',
    payload: { clothing: clothingList.data },
  });
}

function* gearAttributeChange(action) {
  if (action.payload.type === 'cyber_strength') {
    yield axios.put(`/api/characters/attributegearchangestrength/${action.payload.charID}`, action.payload);
  } else if (action.payload.type === 'cyber_body') {
    yield axios.put(`/api/characters/attributegearchangebody/${action.payload.charID}`, action.payload);
  } else if (action.payload.type === 'cyber_reflexes') {
    yield axios.put(`/api/characters/attributegearchangereflexes/${action.payload.charID}`, action.payload);
  } else if (action.payload.type === 'cyber_appearance') {
    yield axios.put(`/api/characters/attributegearchangeappearance/${action.payload.charID}`, action.payload);
  } else if (action.payload.type === 'cyber_cool') {
    yield axios.put(`/api/characters/attributegearchangecool/${action.payload.charID}`, action.payload);
  } else if (action.payload.type === 'cyber_intelligence') {
    yield axios.put(`/api/characters/attributegearchangeintelligence/${action.payload.charID}`, action.payload);
  }
}

function* changeGearEquipStatus(action) {
  try {
    // Equipping Clothes
    if (action.payload.item.clothing_master_id != undefined) {
      yield put({
        type: 'FETCH_ADVANCEMENT_CLOTHES',
        payload: action.payload.charID,
      });
    }
  } catch (error) {
    console.log(`Error changing item equip status`, error);
  }
}

function* changeModEquipStatus(action) {
  try {
    if (action.payload.mod.vehicle_mod_master_id != undefined && action.payload.equipStatus === true) {
      // equipping vehicle mod
      yield axios.post('/api/gear/createModBridgeEntry', action.payload);
      // change vehicle total_mod_cost
      // can be changed to whitelist/generic if e.g. weapons updated to include modded pricing.
      yield axios.put(`/api/gear/changeVehicleTotalModCost/`, {
        price: action.payload.mod.price,
        id: action.payload.baseItemID,
      });

      // change vehicle status per specific mod items
      switch (action.payload.mod.name) {
        case 'Armored':
          yield axios.put(`/api/gear/changeVehicleArmoredStatus`, {
            id: action.payload.baseItemID,
            status: true,
          });
          break;
        case 'Seating Upgrade':
          yield axios.put(`/api/gear/changeVehicleSeats`, {
            id: action.payload.baseItemID,
            status: true,
          });
          const advancementVehicles = yield axios.get(`/api/characters/fetchAdvancementVehicle/${action.payload.charID}`);
          yield put({
            type: 'SET_ADVANCEMENT_VEHICLES',
            payload: advancementVehicles.data,
          });
          break;
        default:
          break;
      }
    } else if (action.payload.mod.vehicle_mod_master_id != undefined && action.payload.equipStatus === false) {
      // unequipping vehicle mod
      yield axios.delete('/api/gear/removeModBridgeEntry', {
        data: action.payload,
      });
      // Note PRICE is negative
      yield axios.put(`/api/gear/changeVehicleTotalModCost/`, {
        price: -action.payload.mod.price,
        id: action.payload.baseItemID,
      });
      switch (action.payload.mod.name) {
        case 'Armored':
          yield axios.put(`/api/gear/changeVehicleArmoredStatus`, {
            id: action.payload.baseItemID,
            status: false,
          });
          break;
        case 'Seating Upgrade':
          yield axios.put(`/api/gear/changeVehicleSeats`, {
            id: action.payload.baseItemID,
            status: false,
          });
          const advancementVehicles = yield axios.get(`/api/characters/fetchAdvancementVehicle/${action.payload.charID}`);
          yield put({
            type: 'SET_ADVANCEMENT_VEHICLES',
            payload: advancementVehicles.data,
          });
          break;
        default:
          break;
      }
    } else {
      console.log(`General error - no equip status set.`);
    }

    yield axios.put('/api/gear/changeModEquipStatus', action.payload);
    const advancementVehicleMods = yield axios.get(`/api/characters/fetchAdvancementVehicleMods/${action.payload.charID}`);
    yield put({
      type: 'SET_ADVANCEMENT_VEHICLE_MODS',
      payload: advancementVehicleMods.data,
    });
    const advancementActiveVehicleMods = yield axios.get(`/api/characters/fetchAdvancementActiveVehicleMods/${action.payload.charID}`);
    yield put({
      type: 'SET_ADVANCEMENT_ACTIVE_VEHICLE_MODS',
      payload: advancementActiveVehicleMods.data,
    });
    yield put({ type: 'SET_ADVANCEMENT_LOAD_STATUS', payload: false });
  } catch (err) {
    console.log(`Error equipping mod:`, err);
  }
}

function* createPharma(action) {
  try {
    for (let i = 0; i < action.payload.doses; i++) {
      yield axios.post(`/api/gear/createPharma`, action.payload);
    }
    yield axios.put(`api/characters/savecharacterbank/${action.payload.charID}`, action.payload);
    yield put({
      type: 'FETCH_ADVANCEMENT_PHARMA',
      payload: action.payload.charID,
    });
    yield put({
      type: 'FETCH_ADVANCEMENT_BANK',
      payload: action.payload.charID,
    });
  } catch (err) {
    console.log(`Error crafting Pharmaceutical:`, err);
  }
}

function* equipNetrunner(action) {
  // this will probably be only slight less complicated than the cyberware equipping/unequipping.
}

function* unequipNetrunner(action) {}

// can probably collapse buy/sell routes as well, similar to equip as well.
function* buyItem(action) {
  try {
    yield axios.post('api/gear/buyitem/', action.payload);
    yield axios.put(`api/characters/savecharacterbank/${action.payload.charID}`, action.payload);
    if (action.payload.table === 'char_armor_bridge') {
      yield put({
        type: 'FETCH_ADVANCEMENT_ARMOR',
        payload: action.payload.charID,
      });
    }
    if (action.payload.table === 'char_shield_bridge') {
      yield put({
        type: 'FETCH_ADVANCEMENT_SHIELD',
        payload: action.payload.charID,
      });
    }
    if (action.payload.table === 'char_weapons_bridge') {
      yield put({
        type: 'FETCH_ADVANCEMENT_WEAPONS',
        payload: action.payload.charID,
      });
    }
    if (action.payload.table === 'char_grenade_bridge') {
      yield put({
        type: 'FETCH_ADVANCEMENT_GRENADES',
        payload: action.payload.charID,
      });
    }
    if (action.payload.table === 'char_gear_bridge') {
      yield put({
        type: 'FETCH_ADVANCEMENT_MISC_GEAR',
        payload: action.payload.charID,
      });
    }
    if (action.payload.table === 'char_pharma_bridge') {
      yield put({
        type: 'FETCH_ADVANCEMENT_PHARMA',
        payload: action.payload.charID,
      });
    }
    if (action.payload.table === 'char_owned_cyberware') {
      yield put({
        type: 'FETCH_ADVANCEMENT_CYBERWARE',
        payload: action.payload.charID,
      });
    }
    if (action.payload.table === 'char_vehicle_bridge') {
      if (action.payload.useNomadFreebie === true) {
        console.log(`Using nomad freebie`);
        yield put({
          type: 'ADVANCEMENT_USE_NOMAD_FREEBIE',
          payload: action.payload.charID,
        });
        console.log(`nomad freebie used, updating reducer`);
        const nomadVehicleSlots = yield axios.get(`/api/advancement/fetchNomadVehicleSlots/${action.payload.charID}`);
        console.log(`nomadVehicleSlots:`, nomadVehicleSlots);
        yield put({
          type: 'SET_ADVANCEMENT_NOMAD_VEHICLE_SLOTS',
          payload: nomadVehicleSlots.data[0],
        });
      }
      yield put({
        type: 'FETCH_ADVANCEMENT_VEHICLES',
        payload: action.payload.charID,
      });
    }
    if (action.payload.table === 'char_owned_vehicle_mods') {
      yield put({
        type: 'FETCH_ADVANCEMENT_VEHICLE_MODS',
        payload: action.payload.charID,
      });
    }
    if (action.payload.table === 'char_clothing_bridge') {
      yield put({
        type: 'FETCH_ADVANCEMENT_CLOTHES',
        payload: action.payload.charID,
      });
    }
    yield put({
      type: 'FETCH_ADVANCEMENT_BANK',
      payload: action.payload.charID,
    });
  } catch (error) {
    console.log(`Error purchasing item:`, error);
  }
}

function* sellItem(action) {
  try {
    yield axios.delete('api/gear/sellItem/', { data: action.payload });
    if (action.payload.table === 'char_armor_bridge' && action.payload.equippedStatus === true) {
      yield axios.put(`api/characters/removeCharacterArmor/${action.payload.charID}`);
      yield put({
        type: 'FETCH_ADVANCEMENT_ARMOR',
        payload: action.payload.charID,
      });
    } else if (action.payload.table === 'char_armor_bridge' && action.payload.equippedStatus === false) {
      yield put({
        type: 'FETCH_ADVANCEMENT_ARMOR',
        payload: action.payload.charID,
      });
    } else if (action.payload.table === 'char_shield_bridge' && action.payload.equippedStatus === true) {
      yield axios.put(`api/characters/removeCharacterShield/${action.payload.charID}`, action.payload.item);
      yield put({
        type: 'FETCH_ADVANCEMENT_SHIELD',
        payload: action.payload.charID,
      });
    } else if (action.payload.table === 'char_shield_bridge' && action.payload.equippedStatus === false) {
      yield put({
        type: 'FETCH_ADVANCEMENT_SHIELD',
        payload: action.payload.charID,
      });
    } else if (action.payload.table === 'char_weapons_bridge') {
      yield put({
        type: 'FETCH_ADVANCEMENT_WEAPONS',
        payload: action.payload.charID,
      });
    } else if (action.payload.table === 'char_grenade_bridge') {
      yield put({
        type: 'FETCH_ADVANCEMENT_GRENADES',
        payload: action.payload.charID,
      });
    } else if (action.payload.table === 'char_gear_bridge') {
      yield put({
        type: 'FETCH_ADVANCEMENT_MISC_GEAR',
        payload: action.payload.charID,
      });
    } else if (action.payload.table === 'char_pharma_bridge') {
      yield put({
        type: 'FETCH_ADVANCEMENT_PHARMA',
        payload: action.payload.charID,
      });
    } else if (action.payload.table === 'char_owned_cyberware') {
      yield put({
        type: 'FETCH_ADVANCEMENT_CYBERWARE',
        payload: action.payload.charID,
      });
    } else if (action.payload.table === 'char_vehicle_bridge') {
      yield put({
        type: 'FETCH_ADVANCEMENT_VEHICLES',
        payload: action.payload.charID,
      });
    } else if (action.payload.table === 'char_owned_vehicle_mods') {
      yield put({
        type: 'FETCH_ADVANCEMENT_VEHICLE_MODS',
        payload: action.payload.charID,
      });
    } else if (action.payload.table === 'char_clothing_bridge') {
      yield put({
        type: 'FETCH_ADVANCEMENT_CLOTHES',
        payload: action.payload.charID,
      });
    }
    yield axios.put(`api/characters/savecharacterbank/${action.payload.charID}`, action.payload);
    yield put({
      type: 'FETCH_ADVANCEMENT_BANK',
      payload: action.payload.charID,
    });
  } catch (error) {
    console.log(`Error selling item:`, error);
  }
}

// function* buyNetrunner(action) {}

// function* sellNetrunner(action) {}

// function* sellVehicle(action) {}

// function* sellVehicleMod(action) {}

function* alterClothing(action) {
  // covers improving/degrading equipped clothing.
  yield axios.put(`api/characters/characteralterclothing/${action.payload.item.clothing_bridge_id}`, action.payload);
  yield axios.put(`api/characters/savecharacterbank/${action.payload.charID}`, action.payload);
  yield put({
    type: 'FETCH_ADVANCEMENT_CLOTHES',
    payload: action.payload.charID,
  });
  yield put({ type: 'FETCH_ADVANCEMENT_BANK', payload: action.payload.charID });
}

function* changeCharArmorStatus(action) {
  try {
    switch (action.payload.armorType) {
      case 'shield':
        yield axios.put(`api/gear/changeCharacterShield/`, action.payload);
        const characterShield = yield axios.get(`api/characters/fetchcharactershield/${action.payload.charID}`);
        yield put({
          type: 'SET_CHARACTER_SHIELD',
          payload: characterShield.data[0],
        });
        yield put({ type: 'SET_CHARSHEET_LOAD_STATUS', payload: false });
        return;
      case 'armor':
        yield axios.put(`api/gear/changeCharacterArmor/`, action.payload);
        const characterArmor = yield axios.get(`api/characters/fetchcharacterarmor/${action.payload.charID}`);
        yield put({
          type: 'SET_CHARACTER_ARMOR',
          payload: characterArmor.data[0],
        });
        yield put({ type: 'SET_CHARSHEET_LOAD_STATUS', payload: false });
        return;
      case 'cyberArmor':
        yield axios.put(`api/gear/changeCharacterCyberArmor/`, action.payload);
        const characterStatus = yield axios.get(`api/characters/fetchcharacterstatus/${action.payload.charID}`);
        yield put({
          type: 'SET_CHARACTER_STATUS',
          payload: characterStatus.data[0],
        });
        yield put({ type: 'SET_CHARSHEET_LOAD_STATUS', payload: false });
        return;
      default:
        console.log(`Unable to change in play armor value due to bad armorType`);
        return;
    }
  } catch (error) {
    console.log(`Error changing in play armor value:`, error);
  }
}

function* changeWeaponClip(action) {
  try {
    yield axios.put('/api/gear/changeWeaponClip', action.payload);
    const weaponDetail = yield axios.get(`/api/characters/fetchcharacterweapons/${action.payload.charID}`);
    yield put({ type: 'SET_CHARACTER_WEAPONS', payload: weaponDetail.data });
    yield put({ type: 'SET_CHARSHEET_LOAD_STATUS', payload: false });
  } catch (err) {
    console.log(`Error firing weapon:`, err);
  }
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
  yield takeLatest('CHANGE_MOD_EQUIP_STATUS', changeModEquipStatus);

  yield takeLatest('CREATE_PHARMA', createPharma);

  yield takeLatest('BUY_ITEM', buyItem);
  yield takeLatest('SELL_ITEM', sellItem);

  yield takeLatest('CHANGE_CHARACTER_ARMOR_STATUS', changeCharArmorStatus);
  yield takeLatest('ALTER_CLOTHING', alterClothing);

  yield takeLatest('CHANGE_WEAPON_CLIP', changeWeaponClip);
}

export default gearSaga;
