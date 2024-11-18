import axios from 'axios';

const fetchAdvancementDetailsRequest = (charObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/advancement/fetchAdvancementDetails', charObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching advancement character details:', error);
        reject(error);
      });
  });
};

const updateCharacterStat = (statObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/advancement/updateCharacterStat', statObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error updating character details:', error);
        reject(error);
      });
  });
};

export { fetchAdvancementDetailsRequest, updateCharacterStat };
