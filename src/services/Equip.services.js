import axios from 'axios';

const fetchEquipCharDetailsRequest = (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/fetchCharDetails', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching equipage character details:', error);
        reject(error);
      });
  });
};

const fetchEquipCharStatusRequest = (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/fetchStatus', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character status:', error);
        reject(error);
      });
  });
};

const fetchCharArmorRequest = (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/fetchCharArmor', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character armor:', error);
        reject(error);
      });
  });
};

const fetchCharWeaponsRequest = (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/fetchCharWeapons', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character weapons:', error);
        reject(error);
      });
  });
};

const fetchCharGrenadesRequest = (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/fetchCharGrenades', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character grenades:', error);
        reject(error);
      });
  });
};

const fetchCharMiscGearRequest = (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/fetchCharMiscGear', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character misc gear:', error);
        reject(error);
      });
  });
};

const fetchCharPharmaRequest = (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/fetchCharPharmaGear', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character pharmaceutical gear:', error);
        reject(error);
      });
  });
};

const fetchCharCyberwareRequest = (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/fetchCharCyberware', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character cyberware:', error);
        reject(error);
      });
  });
};

const fetchCharVehiclesRequest = (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/fetchCharVehicles', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character vehicles:', error);
        reject(error);
      });
  });
};

const fetchCharCyberwareStatusRequest = (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/fetchCharCyberwareStatus', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character cyber status:', error);
        reject(error);
      });
  });
};

const fetchCharVehicleModsRequest = (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/fetchCharVehicleMods', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character vehicle mods:', error);
        reject(error);
      });
  });
};

const fetchCharVehicleModBridgeRequest = (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/fetchEquippedVehicleMods', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character vehicle mod bridge:', error);
        reject(error);
      });
  });
};

const updateCharacterRequest = (statObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/updateCharacter', statObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error updating character details:', error);
        reject(error);
      });
  });
};

const updateCharacterStatusRequest = (statObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/updateCharacterStatus', statObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error updating character status:', error);
        reject(error);
      });
  });
};

const updateArmorStatusRequest = (armorObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/updateEquipageArmor', armorObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error updating armor equip status:', error);
        reject(error);
      });
  });
};

const updateWeaponStatusRequest = (weaponObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/updateEquipageWeapon', weaponObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error updating weapon equip status:', error);
        reject(error);
      });
  });
};

const fetchMasterPharmaListRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/equipage/fetchMasterPharmaList')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching master Pharma list:', error);
        reject(error);
      });
  });
};

const createPharmaceuticalRequest = (pharmaObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/createPharmaceutical', pharmaObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error creating pharmaceutical:', error);
        reject(error);
      });
  });
};

const updatePharmaQtyRequest = (pharmaObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/updatePharmaQtyRequest', pharmaObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error updating pharmaceutical qty:', error);
        reject(error);
      });
  });
};

const updateCyberwareEquipRequest = (cyberObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/updateCyberwareEquip', cyberObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing cyberware equip status:', error);
        reject(error);
      });
  });
};

const updateCyberwareSlotRequest = (slotObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/updateCyberwareSlot', slotObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing cyberware slot counts:', error);
        reject(error);
      });
  });
};

const updateVehicleRequest = (vehicleObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/updateVehicleBridge', vehicleObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error updating Vehicle Bridge:', error);
        reject(error);
      });
  });
};

const equipVehicleMod = (vehicleModObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/equipVehicleMod', vehicleModObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error equipping vehicle mod:', error);
        reject(error);
      });
  });
};

const updateVehicleModEquipStatusRequest = (vehicleModObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/updateVehicleModEquipStatus', vehicleModObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error UNequipping vehicle mod:', error);
        reject(error);
      });
  });
};

const insertModVehicleBridgeRequest = (vehicleModObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/insertModVehicleBridgeEntry', vehicleModObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error inserting Mod-Vehicle Bridge Entry:', error);
        reject(error);
      });
  });
};

const deleteModVehicleBridgeRequest = (vehicleModObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/equipage/deleteModVehicleBridgeEntry', vehicleModObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error deleting Mod-Vehicle Bridge Entry:', error);
        reject(error);
      });
  });
};

export {
  fetchEquipCharDetailsRequest,
  fetchEquipCharStatusRequest,
  fetchCharArmorRequest,
  fetchCharWeaponsRequest,
  fetchCharGrenadesRequest,
  fetchCharMiscGearRequest,
  fetchCharPharmaRequest,
  fetchCharCyberwareRequest,
  fetchCharCyberwareStatusRequest,
  fetchCharVehiclesRequest,
  fetchCharVehicleModsRequest,
  fetchCharVehicleModBridgeRequest,
  updateCharacterRequest,
  updateCharacterStatusRequest,
  updateArmorStatusRequest,
  updateWeaponStatusRequest,
  fetchMasterPharmaListRequest,
  createPharmaceuticalRequest,
  updatePharmaQtyRequest,
  updateCyberwareEquipRequest,
  updateCyberwareSlotRequest,
  updateVehicleRequest,
  equipVehicleMod,
  updateVehicleModEquipStatusRequest,
  insertModVehicleBridgeRequest,
  deleteModVehicleBridgeRequest,
};
