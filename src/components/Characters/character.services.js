import axios from 'axios';

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
const fetchCharacterShieldsRequest = async (charID) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gear/fetchCharacterShields', charID)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character shield:', error);
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
  fetchCharacterArmorRequest,
  fetchCharacterShieldsRequest,
  fetchCharacterWeaponsRequest,
  fetchCharacterGrenadesRequest,
  fetchCharacterMiscGearRequest,
  fetchCharacterCyberwareRequest,
  fetchCharacterNetrunnerGearRequest,
  fetchCharacterVehiclesRequest,
  fetchCharacterVehicleModsRequest,
};
