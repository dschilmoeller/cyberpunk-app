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
export { gmCharFetchRequest, fetchCampaignListRequest, fetchCharacterDetailsRequest }