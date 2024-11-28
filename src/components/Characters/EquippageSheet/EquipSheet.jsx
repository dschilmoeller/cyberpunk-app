// Top level equipment changing sheet.
import React, { useState, useEffect } from 'react';
import { Button, Grid, Tab, Tabs } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';

import Item from '../CharacterSheet/Item';

import AdvancementGearArmor from './AdvancementGearArmor';
import AdvancementGearWeapons from './AdvancementGearWeapons';
import AdvancementGearOther from './AdvancementGearOther';
import AdvancementPharma from './AdvancementGearPharma';
import AdvancementNetrunnerGear from './AdvancementNetrunnerGear';
import AdvancementCyberware from './AdvancementCyberware';
import AdvancementGarage from './AdvancementGarage';
import AdvancementClothes from './AdvancementClothes';

import SnackbarComponent from '../../GeneralAssets/Snackbar';
import {
  fetchEquipCharDetailsRequest,
  fetchEquipCharStatusRequest,
  fetchCharArmorRequest,
  fetchCharWeaponsRequest,
  fetchCharGrenadesRequest,
  fetchCharMiscGearRequest,
  fetchCharPharmaRequest,
  fetchCharCyberwareRequest,
  fetchCharVehiclesRequest,
  fetchCharVehicleModsRequest,
  updateCharacter,
  updateCharacterStatus,
} from './Equip.services';

//TODO Reinstate #armor, #weapons to URL and open appropriate tab to allow refreshing page.

export default function EquipSheet() {
  const history = useHistory();
  const params = useParams();

  const euroBuck = `\u20AC$`;

  // opener for primary tabs.
  const [value, setValue] = useState('armor');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [equipCharDetails, setEquipCharDetails] = useState({});
  const [equipCharStatus, setEquipCharStatus] = useState({});
  const [charGear, setCharGear] = useState({
    armor: [],
    weapons: [],
    grenades: [],
    misc: [],
    pharma: [],
    cyberware: [],
    vehicles: [],
    vehicleMods: [],
  });

  const [loading, setLoading] = useState(false);
  const [pageAlert, setPageAlert] = useState({
    open: false,
    message: '',
    severity: '',
  });

  const equipCharSetup = async () => {
    setLoading(true);
    const charObj = {
      charID: params.id,
    };
    try {
      let charDetails = await fetchEquipCharDetailsRequest(charObj);
      setEquipCharDetails(charDetails);

      let charStatus = await fetchEquipCharStatusRequest(charObj);
      setEquipCharStatus(charStatus);

      let charArmor = await fetchCharArmorRequest(charObj);
      let charWeapons = await fetchCharWeaponsRequest(charObj);
      let charGrenades = await fetchCharGrenadesRequest(charObj);
      let charMiscGear = await fetchCharMiscGearRequest(charObj);
      let charPharma = await fetchCharPharmaRequest(charObj);
      let charCyberware = await fetchCharCyberwareRequest(charObj);
      let charVehicles = await fetchCharVehiclesRequest(charObj);
      let charVehicleMods = await fetchCharVehicleModsRequest(charObj);
      setCharGear({
        armor: charArmor,
        weapons: charWeapons,
        grenades: charGrenades,
        misc: charMiscGear,
        pharma: charPharma,
        cyberware: charCyberware,
        vehicles: charVehicles,
        vehicleMods: charVehicleMods,
      });
    } catch (error) {
      chuckError();
    }
    setLoading(false);
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
    equipCharSetup();
    // dispatch({ type: 'FETCH_ADVANCEMENT_DETAIL', payload: params.id });
    // dispatch({ type: 'FETCH_MASTER_LISTS' });
  }, []);

  if (loading) {
    return <></>;
  } else {
    return (
      <>
        <div>
          <Grid container>
            <Grid item display={'flex'} justifyContent={'center'} xs={3}>
              <Button variant="contained" onClick={() => history.push('/characterlist')}>
                Back to Character List
              </Button>
            </Grid>

            <Grid item display={'flex'} justifyContent={'center'} xs={3}>
              <Button variant="contained" color="secondary" onClick={() => history.push(`/charactersheet/${equipCharDetails.id}`)}>
                Move to In Play Sheet
              </Button>
            </Grid>

            <Grid item display={'flex'} justifyContent={'center'} xs={3}>
              <Button variant="contained" color="warning" onClick={() => history.push(`/advancementsheet/${equipCharDetails.id}`)}>
                Move to Spend XP Sheet
              </Button>
            </Grid>

            <Grid item display={'flex'} justifyContent={'center'} xs={3}>
              <Button variant="contained" color="success" onClick={() => history.push(`/shopSheet/${equipCharDetails.id}`)}>
                Move to Shopping Sheet
              </Button>
            </Grid>
          </Grid>
          {equipCharDetails ? (
            <>
              <Grid container>
                <Grid item xs={4}>
                  <Item>
                    <h2>Name: {equipCharDetails.handle}</h2>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <h2>Player: {equipCharDetails.player}</h2>
                  </Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <h2>Campaign: {equipCharDetails.campaign_name}</h2>
                  </Item>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item xs={12}>
                  <Item>
                    <h3>
                      Cash on Hand: {euroBuck}
                      {equipCharDetails.bank}
                    </h3>
                  </Item>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={12}>
                  <Item>
                    <h2>Equip Gear</h2>
                  </Item>
                </Grid>
              </Grid>
            </>
          ) : (
            <></>
          )}

          <Tabs value={value} onChange={handleChange} centered indicatorColor="primary" textColor="secondary">
            <Tab value="armor" label="Armor" />
            <Tab value="weapons" label="Weapons" />
            <Tab value="other" label="Other Gear" />
            {equipCharDetails.med_pharma > 0 ? <Tab value="pharma" label="Pharmaceuticals" /> : <Tab disabled label="Pharmaceuticals" />}
            <Tab value="netrunner" disabled label="Netrunner Gear" />
            <Tab value="cyberware" label="Cyberware" />
            <Tab value="vehicles" label="Vehicles" />
            <Tab value="clothes" label="Clothes" />
          </Tabs>

          {value === 'armor' && !loading ? (
            <>
              <AdvancementGearArmor
                equipCharDetails={equipCharDetails}
                setEquipCharDetails={setEquipCharDetails}
                equipCharStatus={equipCharStatus}
                setEquipCharStatus={setEquipCharStatus}
                charGear={charGear}
                setCharGear={setCharGear}
                loading={loading}
                setLoading={setLoading}
                setPageAlert={setPageAlert}
                chuckError={chuckError}
              />
            </>
          ) : (
            <></>
          )}

          {value === 'weapons' ? (
            <>
              <AdvancementGearWeapons
                equipCharDetails={equipCharDetails}
                charGear={charGear}
                setCharGear={setCharGear}
                loading={loading}
                setLoading={setLoading}
                setPageAlert={setPageAlert}
                chuckError={chuckError}
              />
            </>
          ) : (
            <></>
          )}

          {value === 'pharma' && equipCharDetails.med_pharma > 0 ? (
            <>
              <AdvancementPharma />
            </>
          ) : (
            <></>
          )}

          {value === 'other' ? (
            <>
              <AdvancementGearOther />
            </>
          ) : (
            <></>
          )}

          {value === 'netrunner' ? (
            <>
              <AdvancementNetrunnerGear />
            </>
          ) : (
            <></>
          )}

          {value === 'cyberware' ? (
            <>
              <AdvancementCyberware updateCharacter={updateCharacter} updateCharacterStatus={updateCharacterStatus} />
            </>
          ) : (
            <></>
          )}

          {value === 'vehicles' ? (
            <>
              <AdvancementGarage />
            </>
          ) : (
            <></>
          )}

          {value === 'clothes' ? (
            <>
              <AdvancementClothes />
            </>
          ) : (
            <></>
          )}
        </div>
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
