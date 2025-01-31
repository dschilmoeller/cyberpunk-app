import axios from 'axios';

const fetchShopCharDetailsRequest = (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/shopping/fetchCharDetails', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching shopping character details:', error);
        reject(error);
      });
  });
};

const fetchMasterArmorListRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/shopping/fetchMasterArmorList')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching master armor list (shopping):', error);
        reject(error);
      });
  });
};

const fetchMasterWeaponsListRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/shopping/fetchMasterWeaponsList')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching master weapons list (shopping):', error);
        reject(error);
      });
  });
};

const fetchMasterGrenadesListRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/shopping/fetchMasterGrenadesList')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching master grenades list (shopping):', error);
        reject(error);
      });
  });
};

const fetchMasterMiscGearListRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/shopping/fetchMasterMiscGearList')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching master misc gear list (shopping):', error);
        reject(error);
      });
  });
};

const fetchMasterPharmaListRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/shopping/fetchMasterPharmaList')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching master pharma list (shopping):', error);
        reject(error);
      });
  });
};

const fetchMasterCyberwareListRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/shopping/fetchMasterCyberwareList')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching master cyberware list (shopping):', error);
        reject(error);
      });
  });
};

const fetchMasterVehiclesListRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/shopping/fetchMasterVehiclesList')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching master vehicles list (shopping):', error);
        reject(error);
      });
  });
};

const fetchMasterVehicleModsListRequest = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/shopping/fetchMasterVehicleModsList')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching master vehicle mods list (shopping):', error);
        reject(error);
      });
  });
};

const charChangeBankRequest = (bankObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/shopping/charChangeBank', bankObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error spending money while shopping:', error);
        reject(error);
      });
  });
};

const charPurchaseGearRequest = (gearObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/shopping/charPurchaseGear', gearObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error while character purchasing gear:', error);
        reject(error);
      });
  });
};

const charSellGearRequest = (gearObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/shopping/charSellGear', gearObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error while character selling gear:', error);
        reject(error);
      });
  });
};

export {
  fetchShopCharDetailsRequest,
  fetchMasterArmorListRequest,
  fetchMasterWeaponsListRequest,
  fetchMasterGrenadesListRequest,
  fetchMasterMiscGearListRequest,
  fetchMasterPharmaListRequest,
  fetchMasterCyberwareListRequest,
  fetchMasterVehiclesListRequest,
  fetchMasterVehicleModsListRequest,
  charChangeBankRequest,
  charPurchaseGearRequest,
  charSellGearRequest,
};
