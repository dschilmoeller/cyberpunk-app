// Top level equipment changing sheet.
import React, { useState, useEffect } from 'react';
import { Button, Grid, Tab, Tabs } from '@mui/material';
import { useHistory, useParams, useLocation } from 'react-router-dom';

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
  fetchCharCyberwareStatusRequest,
  fetchCharVehiclesRequest,
  fetchCharVehicleModsRequest,
  fetchCharVehicleModBridgeRequest,
  fetchMasterPharmaListRequest,
} from '../../../services/equip.services';

//TODO Reinstate #armor, #weapons to URL and open appropriate tab to allow refreshing page.

export default function EquipSheet() {
  const history = useHistory();
  const params = useParams();
  const location = useLocation();

  const euroBuck = `\u20AC$`;

  // opener for primary tabs.
  const [value, setValue] = useState(location.hash ? location.hash : '#armor');
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
    cyberwareStatus: {
      fashionware_slots: 0,
      neuralware_slots: 0,
      cyberoptic_slots: 0,
      cyberaudio_slots: 0,
      internalware_slots: 0,
      externalware_slots: 0,
      cyberarm_slots: 0,
      cyberleg_slots: 0,
    },
    vehicles: [],
    vehicleMods: [],
  });
  const [masterGear, setMasterGear] = useState({
    pharma: [],
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
      const charDetails = await fetchEquipCharDetailsRequest(charObj);
      setEquipCharDetails(charDetails);

      const charStatus = await fetchEquipCharStatusRequest(charObj);
      setEquipCharStatus(charStatus);

      const charArmor = await fetchCharArmorRequest(charObj);
      const charWeapons = await fetchCharWeaponsRequest(charObj);
      const charGrenades = await fetchCharGrenadesRequest(charObj);
      const charMiscGear = await fetchCharMiscGearRequest(charObj);
      const charPharma = await fetchCharPharmaRequest(charObj);
      const charCyberware = await fetchCharCyberwareRequest(charObj);
      const charCyberwareStatus = await fetchCharCyberwareStatusRequest(charObj);
      const charVehicles = await fetchCharVehiclesRequest(charObj);
      const charVehicleMods = await fetchCharVehicleModsRequest(charObj);
      const charVehicleModBridge = await fetchCharVehicleModBridgeRequest(charObj);
      setCharGear({
        armor: charArmor,
        weapons: charWeapons,
        grenades: charGrenades,
        misc: charMiscGear,
        pharma: charPharma,
        cyberware: charCyberware,
        cyberwareStatus: charCyberwareStatus,
        vehicles: charVehicles,
        vehicleMods: charVehicleMods,
        vehicleModBridge: charVehicleModBridge,
      });

      const masterPharma = await fetchMasterPharmaListRequest();
      setMasterGear({ ...masterGear, pharma: masterPharma });
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
            <Tab value="#armor" href={`/#/equipsheet/${params.id}#armor`} label="Armor" />
            <Tab value="#weapons" href={`/#/equipsheet/${params.id}#weapons`} label="Weapons" />
            <Tab value="#other" href={`/#/equipsheet/${params.id}#other`} label="Other Gear" />
            <Tab value="#pharma" href={`/#/equipsheet/${params.id}#pharma`} label="Pharmaceuticals" />
            <Tab value="#netrunner" disabled href={`/#/equipsheet/${params.id}#netrunner`} label="Netrunner Gear" />
            <Tab value="#cyberware" href={`/#/equipsheet/${params.id}#cyberware`} label="Cyberware" />
            <Tab value="#vehicles" href={`/#/equipsheet/${params.id}#vehicles`} label="Vehicles" />
            <Tab value="#clothes" href={`/#/equipsheet/${params.id}#clothes`} label="Clothes" />
          </Tabs>
          {value === '#armor' && !loading ? (
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

          {value === '#weapons' ? (
            <>
              <AdvancementGearWeapons
                equipCharDetails={equipCharDetails}
                setEquipCharDetails={setEquipCharDetails}
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

          {value === '#pharma' ? (
            <>
              <AdvancementPharma
                equipCharDetails={equipCharDetails}
                setEquipCharDetails={setEquipCharDetails}
                masterGear={masterGear}
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

          {value === '#other' ? (
            <>
              <AdvancementGearOther charGear={charGear} />
            </>
          ) : (
            <></>
          )}

          {value === '#netrunner' ? (
            <>
              <AdvancementNetrunnerGear />
            </>
          ) : (
            <></>
          )}

          {value === '#cyberware' ? (
            <>
              <AdvancementCyberware
                equipCharStatus={equipCharStatus}
                equipCharDetails={equipCharDetails}
                charGear={charGear}
                setEquipCharDetails={setEquipCharDetails}
                setEquipCharStatus={setEquipCharStatus}
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

          {value === '#vehicles' ? (
            <>
              <AdvancementGarage
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

          {value === '#clothes' ? (
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
