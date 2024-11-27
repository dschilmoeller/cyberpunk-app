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

const updateCharacter = (statObj) => {
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

const updateCharacterStatus = (statObj) => {
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

export {
  fetchEquipCharDetailsRequest,
  fetchEquipCharStatusRequest,
  fetchCharArmorRequest,
  fetchCharWeaponsRequest,
  fetchCharGrenadesRequest,
  fetchCharMiscGearRequest,
  fetchCharPharmaRequest,
  fetchCharCyberwareRequest,
  fetchCharVehiclesRequest,
  fetchCharVehicleModsRequest,
  updateCharacter, // update name
  updateCharacterStatus, // update name
  updateArmorStatusRequest,
};
