// This is the "Top Level" for a single Character - all other parts should be modules called within.
// and utilize props more, along with passing of setters where it makes sense.

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Tabs, Tab } from '@mui/material';

import GameMasterMain from './GameMasterMain';
import GameMasterAttributes from './GameMasterAttributes';
import GameMasterSkills from './GameMasterSkills';
import GameMasterRoles from './GameMasterRoles';
import GameMasterOwnedGear from './GameMasterOwnedGear';
import GameMasterGiveGear from './GameMasterGiveGear';
import GameMasterCharContacts from './GameMasterCharContacts';

import SnackbarComponent from '../GeneralAssets/Snackbar';

import { fetchCharacterDetailsRequest, fetchCampaignListRequest, fetchCharacterContactsRequest } from './gm.services';

export default function GameMasterSheet() {
  const [selectedSheet, setSelectedSheet] = useState('GM');
  const handleTabChange = (event, newValue) => {
    setSelectedSheet(newValue);
  };
  const params = useParams();

  const [campaignList, setCampaignList] = useState([]);
  const [charDetail, setCharDetail] = useState({});
  const [charContacts, setCharContacts] = useState([]);

  const fetchCharacterDetails = async () => {
    try {
      const characterDetails = await fetchCharacterDetailsRequest(params.id);
      setCharDetail(characterDetails);
      const characterContacts = await fetchCharacterContactsRequest(params.id);
      setCharContacts(characterContacts);
    } catch (error) {
      console.error('Error Fetching Character Details:', error);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const inFuncCampaignList = await fetchCampaignListRequest();
      setCampaignList(inFuncCampaignList);
    } catch (error) {
      console.error('Error fetching campaign list:', error);
    }
  };

  const chuckError = () => {
    setPageAlert({
      open: true,
      message: 'Something is awry',
      severity: 'info',
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchCampaigns();
    fetchCharacterDetails();
  }, []);

  const [pageAlert, setPageAlert] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <h1>Character Details: {charDetail.handle}</h1>
        </Grid>
        <Grid item xs={6} paddingRight={3}>
          {/* <Button fullWidth variant='contained' onClick={() => saveCharacter()}>Save Changes</Button> */}
        </Grid>
      </Grid>

      <Tabs value={selectedSheet} onChange={handleTabChange} indicatorColor="primary" textColor="secondary">
        {/* Humanity, Money, and Experience */}
        <Tab value="GM" label="Main" />
        {/* Atts, also Street Cred & Luck */}
        <Tab value="attributes" label="Attributes" />
        {/* Skills */}
        <Tab value="skills" label="Skills" />
        {/* Role abilities and skills, include manual IsParamedical */}
        <Tab value="role" label="Role" />
        {/* all owned gear, cyberware, netrunner, vehicles, etc. */}
        <Tab value="gear" label="Owned Gear" />
        {/* arbitrary giving of equipment */}
        <Tab value="gmGear" label="Give Gear" />
        {/* see contacts and edit loyalty */}
        <Tab value="gmCharContacts" label="Manage Contacts" />
      </Tabs>

      {selectedSheet === 'GM' ? (
        <>
          <GameMasterMain
            charDetail={charDetail}
            campaignList={campaignList}
            setCharDetail={setCharDetail}
            setPageAlert={setPageAlert}
            loading={loading}
            setLoading={setLoading}
            chuckError={chuckError}
          />
        </>
      ) : (
        <> </>
      )}

      {selectedSheet === 'attributes' ? (
        <>
          <GameMasterAttributes
            charDetail={charDetail}
            setCharDetail={setCharDetail}
            setPageAlert={setPageAlert}
            loading={loading}
            setLoading={setLoading}
            chuckError={chuckError}
          />
        </>
      ) : (
        <> </>
      )}

      {selectedSheet === 'skills' ? (
        <>
          <GameMasterSkills
            charDetail={charDetail}
            setCharDetail={setCharDetail}
            setPageAlert={setPageAlert}
            loading={loading}
            setLoading={setLoading}
            chuckError={chuckError}
          />
        </>
      ) : (
        <> </>
      )}

      {selectedSheet === 'role' ? (
        <>
          <GameMasterRoles
            charDetail={charDetail}
            setCharDetail={setCharDetail}
            setPageAlert={setPageAlert}
            loading={loading}
            setLoading={setLoading}
            chuckError={chuckError}
          />
        </>
      ) : (
        <> </>
      )}

      {selectedSheet === 'gear' ? (
        <>
          <GameMasterOwnedGear
            charDetail={charDetail}
            setCharDetail={setCharDetail}
            setPageAlert={setPageAlert}
            loading={loading}
            setLoading={setLoading}
            chuckError={chuckError}
          />
        </>
      ) : (
        <> </>
      )}

      {selectedSheet === 'gmGear' ? (
        <>
          <GameMasterGiveGear charDetail={charDetail} setPageAlert={setPageAlert} loading={loading} setLoading={setLoading} chuckError={chuckError} />
        </>
      ) : (
        <> </>
      )}

      {selectedSheet === 'gmCharContacts' ? (
        <>
          <GameMasterCharContacts
            charDetail={charDetail}
            characterContacts={charContacts}
            setPageAlert={setPageAlert}
            loading={loading}
            setLoading={setLoading}
            chuckError={chuckError}
            setCharContacts={setCharContacts}
          />
        </>
      ) : (
        <> </>
      )}

      <SnackbarComponent
        open={pageAlert.open}
        message={pageAlert.message}
        severity={pageAlert.severity}
        onClose={() => setPageAlert({ open: false, message: '', severity: '' })}
      />
    </>
  );
}
