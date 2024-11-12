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
export {
  fetchInPlayCharDetailRequest,
  fetchInPlayCharStatusRequest,
  fetchInPlayArmorRequest,
  fetchInPlayCharCyberwareRequest,
  inPlayStatusChangeRequest,
  inPlayArmorChangeRequest,
};
