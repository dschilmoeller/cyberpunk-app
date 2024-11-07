import axios from 'axios';

const fetchArmorMasterRequest = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/gear/fetchArmorMaster')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching armor master list:', error);
        reject(error);
      });
  });
};

const fetchWeaponMasterRequest = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/gear/fetchWeaponMaster')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching weapon master list:', error);
        reject(error);
      });
  });
};

const fetchGrenadeMasterRequest = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/gear/fetchGrenadeMaster')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching grenade master list:', error);
        reject(error);
      });
  });
};
const fetchMiscGearMasterRequest = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/gear/fetchMiscGearMaster')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching misc gear master list:', error);
        reject(error);
      });
  });
};

const fetchCyberwareMasterRequest = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/gear/fetchCyberwareMaster')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching cyberware master list:', error);
        reject(error);
      });
  });
};

const fetchNetrunnerMasterRequest = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/gear/fetchNetrunnerMaster')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching netrunner master list:', error);
        reject(error);
      });
  });
};

const fetchVehicleMasterRequest = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/gear/fetchVehicleMaster')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching vehicle master list:', error);
        reject(error);
      });
  });
};

const fetchVehicleModMasterRequest = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/gear/fetchVehicleModMaster')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching vehicle mod master list:', error);
        reject(error);
      });
  });
};

const fetchCharacterArmorRequest = async (charID) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gear/fetchCharacterArmor', charID)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character armor:', error);
        reject(error);
      });
  });
};

const fetchCharacterWeaponsRequest = async (charID) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gear/fetchCharacterWeapons', charID)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character Weapon:', error);
        reject(error);
      });
  });
};

const fetchCharacterGrenadesRequest = async (charID) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gear/fetchCharacterGrenades', charID)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character grenade:', error);
        reject(error);
      });
  });
};

const fetchCharacterMiscGearRequest = async (charID) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gear/fetchCharacterMiscGear', charID)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character Misc Gear:', error);
        reject(error);
      });
  });
};

const fetchCharacterCyberwareRequest = async (charID) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gear/fetchCharacterCyberware', charID)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character Cyberware:', error);
        reject(error);
      });
  });
};

const fetchCharacterNetrunnerGearRequest = async (charID) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gear/fetchCharacterNetrunnerGear', charID)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character Netrunner Gear:', error);
        reject(error);
      });
  });
};

const fetchCharacterVehiclesRequest = async (charID) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gear/fetchCharacterVehicles', charID)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character vehicles:', error);
        reject(error);
      });
  });
};

const fetchCharacterVehicleModsRequest = async (charID) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gear/fetchCharacterVehicleMods', charID)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character vehicle mods:', error);
        reject(error);
      });
  });
};

export {
  fetchArmorMasterRequest,
  fetchWeaponMasterRequest,
  fetchGrenadeMasterRequest,
  fetchMiscGearMasterRequest,
  fetchCyberwareMasterRequest,
  fetchNetrunnerMasterRequest,
  fetchVehicleMasterRequest,
  fetchVehicleModMasterRequest,
  fetchCharacterArmorRequest,
  fetchCharacterWeaponsRequest,
  fetchCharacterGrenadesRequest,
  fetchCharacterMiscGearRequest,
  fetchCharacterCyberwareRequest,
  fetchCharacterNetrunnerGearRequest,
  fetchCharacterVehiclesRequest,
  fetchCharacterVehicleModsRequest,
};
