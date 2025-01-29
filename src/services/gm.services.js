import axios from 'axios';

const gmCharFetchRequest = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/characters/fetchGameMasterCharacters')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching GM Characters:', error);
        reject(error);
      });
  });
};

const fetchCampaignListRequest = async () => {
  return new Promise((resolve, reject) => {
    axios
      .get('/api/gamemaster/fetchcampaigns')
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching Campaign List:', error);
        reject(error);
      });
  });
};

const fetchCharacterDetailsRequest = async (characterID) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gamemaster/fetchGamemasterCharacterDetail/', { characterID })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching GM Char Details:', error);
        reject(error);
      });
  });
};

const fetchCharacterContactsRequest = async (characterID) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gamemaster/fetchCharacterContacts', { characterID })
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error fetching GM Character Contacts:', error);
        reject(error);
      });
  });
};

const changeCharacterHandle = async (handleObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gamemaster/changeHandle', handleObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing character handle:', error);
        reject(error);
      });
  });
};

const changeCharacterPlayer = async (playerObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gamemaster/changePlayer', playerObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing character player:', error);
        reject(error);
      });
  });
};

const changeCharacterCampaign = async (campaignObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gamemaster/changeCampaign', campaignObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing character campaign:', error);
        reject(error);
      });
  });
};

const changeTempCharacterHumanity = async (humanityObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gamemaster/changeTempHumanity', humanityObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing Temp humanity:', error);
        reject(error);
      });
  });
};

const changePermCharacterHumanity = async (humanityObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gamemaster/changePermHumanity', humanityObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing permanent humanity:', error);
        reject(error);
      });
  });
};

const changeCharacterBank = async (bankObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gamemaster/changeBank', bankObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing bank:', error);
        reject(error);
      });
  });
};

const changeCharacterXP = async (XPObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gamemaster/changeXP', XPObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing XP:', error);
        reject(error);
      });
  });
};

const changeCharacterAttribute = async (attributeObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gamemaster/changeAttribute', attributeObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing attribute:', error);
        reject(error);
      });
  });
};

const changeCharacterSkill = async (skillObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gamemaster/changeSkill', skillObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing skill:', error);
        reject(error);
      });
  });
};

const changeCharacterRole = async (roleObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gamemaster/changeRole', roleObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing role:', error);
        reject(error);
      });
  });
};

const deleteCharacterGearRequest = async (gearObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gamemaster/deleteCharacterGear', gearObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error deleting gear:', error);
        reject(error);
      });
  });
};

const giveCharacterGearRequest = async (gearObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gamemaster/giveCharacterGear', gearObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error giving character gear:', error);
        reject(error);
      });
  });
};

const changeContactLoyaltyRequest = async (contactObj) => {
  return new Promise((resolve, reject) => {
    axios
      .post('/api/gamemaster/changeContactLoyalty', contactObj)
      .then((result) => {
        resolve(result.data);
      })
      .catch((error) => {
        console.error('Error changing contact loyalty:', error);
        reject(error);
      });
  });
};

export {
  gmCharFetchRequest,
  fetchCampaignListRequest,
  fetchCharacterDetailsRequest,
  fetchCharacterContactsRequest,
  changeCharacterHandle,
  changeCharacterPlayer,
  changeCharacterCampaign,
  changeTempCharacterHumanity,
  changePermCharacterHumanity,
  changeCharacterBank,
  changeCharacterXP,
  changeCharacterAttribute,
  changeCharacterSkill,
  changeCharacterRole,
  deleteCharacterGearRequest,
  giveCharacterGearRequest,
  changeContactLoyaltyRequest,
};
