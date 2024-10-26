import axios from "axios";

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
        })
    })
}

const fetchCharacterDetailsRequest = async (characterID) => {
    return new Promise((resolve, reject) => {
        axios
        .post('/api/gamemaster/fetchGamemasterCharacterDetail/', {characterID})
        .then((result) => {
            resolve(result.data);
        })
        .catch((error) => {
            console.error('Error fetching GM Char Details:', error);
            reject(error);
        })
    })
}

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
}

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
        })
    })
}

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
}

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
        })
    })
}

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
        })
    })
}

export { 
    gmCharFetchRequest, 
    fetchCampaignListRequest, 
    fetchCharacterDetailsRequest, 
    changeCharacterHandle,
    changeCharacterPlayer,
    changeCharacterCampaign,
    changeTempCharacterHumanity,
    changePermCharacterHumanity,

}