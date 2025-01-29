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
import Pharmaceuticals from './GearComponents/Pharmaceuticals';
import Cyberware from './GearComponents/Cyberware';
import Vehicles from './GearComponents/Vehicles';
import CharacterSheetNotes from './Notes';
import CharacterSheetContacts from './Contacts';
// import CharacterNetrunner from './CharacterNetrunner';

import {
  fetchInPlayCharDetailRequest,
  fetchInPlayCharStatusRequest,
  fetchInPlayCharCyberwareRequest,
  fetchInPlayMiscGearRequest,
  fetchInPlayPharmaGearRequest,
  fetchInPlayVehicleRequest,
  fetchInPlayVehicleModsRequest,
  fetchInPlayCharacterNotesRequest,
  fetchInPlayContactsRequest,
} from '../../../services/CharInPlay.services';

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
  const [charPharma, setCharPharma] = useState([]);
  const [charVehicles, setCharVehicles] = useState([]);
  const [charVehicleMods, setCharVehicleMods] = useState([]);
  const [charNotes, setCharNotes] = useState([]);
  const [charContacts, setCharContacts] = useState([]);

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

      let characterMiscGear = await fetchInPlayMiscGearRequest({ charID: params.id });
      setCharMiscGear(characterMiscGear);

      let characterPharma = await fetchInPlayPharmaGearRequest({ charID: params.id });
      setCharPharma(characterPharma);

      let characterVehicles = await fetchInPlayVehicleRequest({ charID: params.id });
      setCharVehicles(characterVehicles);

      let characterVehicleMods = await fetchInPlayVehicleModsRequest({ charID: params.id });
      setCharVehicleMods(characterVehicleMods);

      let characterNotes = await fetchInPlayCharacterNotesRequest({ charID: params.id });
      setCharNotes(characterNotes);

      let characterContacts = await fetchInPlayContactsRequest({ charID: params.id });
      setCharContacts(characterContacts);
    } catch (error) {
      console.error('Error fetching in play character sheet:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // holdovers - first for modpocalypse
    // second I think is for weapon modals?
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

                {selectedInventory === 'pharma' ? (
                  <>
                    <Pharmaceuticals
                      charPharma={charPharma}
                      setCharPharma={setCharPharma}
                      loading={loading}
                      setLoading={setLoading}
                      chuckError={chuckError}
                      setPageAlert={setPageAlert}
                    />
                  </>
                ) : (
                  <></>
                )}

                {selectedInventory === 'cyberware' ? (
                  <>
                    <Cyberware charCyberware={charCyberware} />
                  </>
                ) : (
                  <></>
                )}

                {selectedInventory === 'vehicles' ? (
                  <>
                    <Vehicles
                      charVehicles={charVehicles}
                      charVehicleMods={charVehicleMods}
                      loading={loading}
                      setLoading={setLoading}
                      chuckError={chuckError}
                    />
                  </>
                ) : (
                  <></>
                )}

                {/* {selectedInventory === 'netrunner' ? (
                  <>
                    <CharacterNetrunner />
                  </>
                ) : (
                  <></>
                )} */}

                {selectedInventory === 'notes' ? (
                  <>
                    <CharacterSheetNotes
                      charDetail={charDetail}
                      charNotes={charNotes}
                      setCharNotes={setCharNotes}
                      loading={loading}
                      setLoading={setLoading}
                      chuckError={chuckError}
                      setPageAlert={setPageAlert}
                    />
                  </>
                ) : (
                  <></>
                )}

                {selectedInventory === 'contacts' ? (
                  <>
                    <CharacterSheetContacts
                      charDetail={charDetail}
                      charContacts={charContacts}
                      setCharContacts={setCharContacts}
                      loading={loading}
                      setLoading={setLoading}
                      chuckError={chuckError}
                      setPageAlert={setPageAlert}
                    />
                  </>
                ) : (
                  <></>
                )}
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
