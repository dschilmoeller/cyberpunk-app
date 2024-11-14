// Top Level Character Sheet
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Grid, Tabs, Tab } from '@mui/material';
import Item from './Item';

import CharacterAttributes from './CharacterAttributes';
import CharacterSkills from './CharacterSkills';
import CharacterMarkers from './Markers';
import CharacterRoleAbilities from './CharacterRoleAbilities';

import Weapons from './GearComponents/Weapons';
import Backpack from './GearComponents/Backpack';
// import CharacterVehicles from './CharacterVehicles';
// import CharacterNetrunner from './CharacterNetrunner';
// import CharacterSheetCyberware from './Cyberware';
// import Pharmaceuticals from './Pharmaceuticals';
// import CharacterSheetNotes from './Notes';
// import CharacterSheetContacts from './Contacts';

import {
  fetchInPlayCharDetailRequest,
  fetchInPlayCharStatusRequest,
  fetchInPlayCharCyberwareRequest,
  fetchCharMiscGearRequest,
} from '../character.services';

import SnackbarComponent from '../../GeneralAssets/Snackbar';

export default function CharacterSheet() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [pageAlert, setPageAlert] = useState({
    open: false,
    message: '',
    severity: '',
  });
  const [charDetail, setCharDetail] = useState({});
  const [charStatus, setCharStatus] = useState({});
  const [painEditor, setPainEditor] = useState(false);

  const [charCyberware, setCharCyberware] = useState([]);
  const [charMiscGear, setCharMiscGear] = useState([]);

  const charSheetSetup = async () => {
    setLoading(true);
    try {
      let characterDetails = await fetchInPlayCharDetailRequest({ charID: params.id });
      setCharDetail(characterDetails);
      let characterStatus = await fetchInPlayCharStatusRequest({ charID: params.id });
      setCharStatus(characterStatus);

      let characterCyberware = await fetchInPlayCharCyberwareRequest({ charID: params.id });
      setCharCyberware(characterCyberware);
      characterCyberware.map((cyberware) => {
        if (cyberware.name === 'Pain Editor') {
          setPainEditor(true);
        }
      });

      let characterMiscGear = await fetchCharMiscGearRequest({ charID: params.id });
      setCharMiscGear(characterMiscGear);
    } catch (error) {
      console.error('Error fetching in play character sheet:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // dispatch({ type: 'FETCH_CHARACTER_DETAIL', payload: params.id });
    // dispatch({ type: 'FETCH_CHARACTER_MOD_MASTER', payload: params.id });
    // dispatch({ type: 'FETCH_MASTER_LISTS' });
    charSheetSetup();
  }, []);

  const chuckError = () => {
    setPageAlert({
      open: true,
      message: 'Something is awry',
      severity: 'info',
    });
    setLoading(false);
  };

  const [selectedInventory, setSelectedInventory] = useState('weapons');
  const handleInventorySelect = (event, newValue) => {
    setSelectedInventory(newValue);
  };

  if (charDetail.id && charStatus.char_id) {
    return (
      <>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={1}>
            {charDetail ? (
              <>
                <Grid item xs={4}>
                  <Item sx={{ fontSize: '1.5em', padding: 0 }}>Handle: {charDetail.handle}</Item>
                </Grid>
                <Grid item xs={4}>
                  <Item sx={{ fontSize: '1.5em', padding: 0 }}>Player: {charDetail.player}</Item>
                </Grid>
                <Grid item xs={4}>
                  <Item sx={{ fontSize: '1.5em', padding: 0 }}>Campaign: {charDetail.campaign_name} </Item>
                </Grid>
                <CharacterAttributes charDetail={charDetail} />
                <CharacterSkills charDetail={charDetail} />
                <CharacterRoleAbilities charDetail={charDetail} />
                <CharacterMarkers
                  charDetail={charDetail}
                  charStatus={charStatus}
                  setCharStatus={setCharStatus}
                  charCyberware={charCyberware}
                  loading={loading}
                  setLoading={setLoading}
                  chuckError={chuckError}
                  setPageAlert={setPageAlert}
                />

                <Tabs value={selectedInventory} onChange={handleInventorySelect} indicatorColor="primary" textColor="secondary">
                  <Tab value="weapons" label="Weapons" />
                  {charDetail.netrunner > 0 && <Tab value="netrunner" label="Netrunner" />}
                  <Tab value="backpack" label="Backpack" />
                  <Tab value="pharma" label="Pharmaceuticals" />
                  <Tab value="cyberware" label="Cyberware" />
                  <Tab value="vehicles" label="Vehicles" />
                  <Tab value="notes" label="My Notes" />
                  <Tab value="contacts" label="Contacts" />
                </Tabs>

                {selectedInventory === 'weapons' ? (
                  <>
                    <Weapons
                      charDetail={charDetail}
                      charStatus={charStatus}
                      charCyberware={charCyberware}
                      loading={loading}
                      setLoading={setLoading}
                      chuckError={chuckError}
                      setPageAlert={setPageAlert}
                      painEditor={painEditor}
                    />
                  </>
                ) : (
                  <></>
                )}

                {selectedInventory === 'backpack' ? (
                  <>
                    <Backpack
                      charDetail={charDetail}
                      setCharDetail={setCharDetail}
                      charMiscGear={charMiscGear}
                      setCharMiscGear={setCharMiscGear}
                      loading={loading}
                      setLoading={setLoading}
                      chuckError={chuckError}
                      setPageAlert={setPageAlert}
                    />
                  </>
                ) : (
                  <></>
                )}

                {/* {selectedInventory === 'pharma' ? (
                  <>
                    <Pharmaceuticals />
                  </>
                ) : (
                  <></>
                )} */}

                {/* {selectedInventory === 'cyberware' ? (
                  <>
                    <CharacterSheetCyberware />
                  </>
                ) : (
                  <></>
                )} */}

                {/* {selectedInventory === 'vehicles' ? (
                  <>
                    <CharacterVehicles />
                  </>
                ) : (
                  <></>
                )} */}

                {/* {selectedInventory === 'netrunner' ? (
                  <>
                    <CharacterNetrunner />
                  </>
                ) : (
                  <></>
                )} */}

                {/* {selectedInventory === 'notes' ? (
                  <>
                    <CharacterSheetNotes />
                  </>
                ) : (
                  <></>
                )} */}

                {/* {selectedInventory === 'contacts' ? (
                  <>
                    <CharacterSheetContacts />
                  </>
                ) : (
                  <></>
                )} */}
              </>
            ) : (
              <></>
            )}
          </Grid>
        </Box>
        <SnackbarComponent
          open={pageAlert.open}
          message={pageAlert.message}
          severity={pageAlert.severity}
          onClose={() => setPageAlert({ open: false, message: '', severity: '' })}
        />
      </>
    );
  }
}
