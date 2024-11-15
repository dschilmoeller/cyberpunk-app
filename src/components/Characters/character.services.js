import axios from 'axios';

const fetchInPlayCharDetailRequest = async (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/inPlay/fetchInPlayCharDetail', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character sheet details:', error);
        reject(error);
      });
  });
};

const fetchInPlayCharStatusRequest = async (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/inPlay/fetchInPlayCharStatus', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character status details:', error);
        reject(error);
      });
  });
};

const fetchInPlayArmorRequest = (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/inPlay/fetchInPlayCharacterArmor', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching in play armor', error);
        reject(error);
      });
  });
};

const fetchInPlayCharCyberwareRequest = async (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/inPlay/fetchInPlayCharCyberware', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character cyberware list:', error);
        reject(error);
      });
  });
};

const fetchCharWeaponsRequest = async (weaponObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/inPlay/fetchInPlayCharWeapons', weaponObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character weapon list:', error);
        reject(error);
      });
  });
};

const fetchCharGrenadesRequest = async (weaponObj) => {
  return new Promise((resolve, reject) => [
    axios
      .post('/api/inPlay/fetchInPlayGrenades', weaponObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character grenade list:', error);
        reject(error);
      }),
  ]);
};

const fetchInPlayMiscGearRequest = async (gearObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/inPlay/fetchInPlayMiscGear', gearObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching character misc gear list:', error);
        reject(error);
      });
  });
};

const fetchInPlayPharmaGearRequest = async (pharmObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/inPlay/fetchInPlayPharmaGear', pharmObj)
      .then((result) => resolve(result.data))
      .catch((error) => {
        console.error('Error fetching character pharma gear:', error);
        reject(error);
      });
  });
};
const inPlayStatusChangeRequest = async (statusObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/inPlay/inPlayStatusChange', statusObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing in play damage:', error);
        reject(error);
      });
  });
};

const inPlayArmorChangeRequest = async (armorObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/inPlay/inPlayArmorChange', armorObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing in play armor', error);
        reject(error);
      });
  });
};

const inPlayWeaponChangeRequest = async (weaponObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/inPlay/inPlayWeaponChange', weaponObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing in play weapon:', error);
        reject(error);
      });
  });
};

const inPlayUseGrenade = async (grenadeObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/inPlay/inPlayUseGrenade', grenadeObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error using grenade in play:', error);
        reject(error);
      });
  });
};

const inPlayUseConsumable = async (miscObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/inPlay/inPlayUseConsumable', miscObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error using consumable:', error);
        reject(error);
      });
  });
};

const inPlayBankChange = async (bankObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/inPlay/inPlayBankChange', bankObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing character bank:', error);
        reject(error);
      });
  });
};

const inPlayUsePharma = async (pharmaObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/inPlay/inPlayUsePharma', pharmaObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error using pharmaceutical:', error);
        reject(error);
      });
  });
};

export {
  fetchInPlayCharDetailRequest,
  fetchInPlayCharStatusRequest,
  fetchInPlayArmorRequest,
  fetchInPlayCharCyberwareRequest,
  fetchCharWeaponsRequest,
  fetchCharGrenadesRequest,
  fetchInPlayMiscGearRequest,
  fetchInPlayPharmaGearRequest,
  inPlayStatusChangeRequest,
  inPlayArmorChangeRequest,
  inPlayWeaponChangeRequest,
  inPlayUseGrenade,
  inPlayUseConsumable,
  inPlayBankChange,
  inPlayUsePharma,
};
