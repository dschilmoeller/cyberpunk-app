import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import Item from '../Characters/CharacterSheet/Item';

import {
  fetchArmorMasterRequest,
  fetchWeaponMasterRequest,
  fetchGrenadeMasterRequest,
  fetchMiscGearMasterRequest,
  fetchCyberwareMasterRequest,
  fetchNetrunnerMasterRequest,
  fetchVehicleMasterRequest,
  fetchVehicleModMasterRequest,
} from '../Characters/gear.services';

import GMGiveArmor from './GameMasterGearComps/GMGiveArmor';
import GMGiveWeapons from './GameMasterGearComps/GMGiveWeapons';
import GMGiveGrenade from './GameMasterGearComps/GMGiveGrenade';
import GMGiveGearOther from './GameMasterGearComps/GMGiveGearOther';
import GMGiveCyberware from './GameMasterGearComps/GMGiveCyberware';
import GMGiveNetrunnerMain from './GameMasterGearComps/GMGiveNetrunnerMain';
import GMGiveVehicles from './GameMasterGearComps/GMGiveVehicles';

// TODO
// fetch all master gear lists and store as state similar to character fetch?
// display same properly.
// DISTINGUISH treasure items.
// Affirm (setPageAlert) gear has been given
// Allow creation of items (LATER) through page rather than DB edits.
export default function GameMasterGiveGear({ charDetail, setPageAlert, loading, setLoading, chuckError }) {
  const [gearMaster, setGearMaster] = useState({
    armor: [],
    weapons: [],
    grenades: [],
    miscGear: [],
    cyberware: [],
    netrunner: [],
    vehicles: [],
    vehicleMods: [],
  });

  const fetchGearMaster = async () => {
    try {
      const armor = await fetchArmorMasterRequest();
      const weapons = await fetchWeaponMasterRequest();
      const grenades = await fetchGrenadeMasterRequest();
      const miscGear = await fetchMiscGearMasterRequest();
      const cyberware = await fetchCyberwareMasterRequest();
      const netrunner = await fetchNetrunnerMasterRequest();
      const vehicles = await fetchVehicleMasterRequest();
      const vehicleMods = await fetchVehicleModMasterRequest();

      setGearMaster({
        armor,
        weapons,
        grenades,
        miscGear,
        cyberware,
        netrunner,
        vehicles,
        vehicleMods,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching master gear lists:', error);
      chuckError();
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchGearMaster();
  }, []);

  const [selectedGear, setSelectedGear] = React.useState('armor');
  const handleSelectedGearChange = (event, newValue) => {
    setSelectedGear(newValue);
  };

  return (
    <>
      <Grid container paddingTop={3} spacing={3} alignContent={'center'}>
        <Grid item xs={12} padding={3}>
          <Item>
            <Tabs value={selectedGear} onChange={handleSelectedGearChange} indicatorColor="primary" textColor="secondary">
              <Tab value="armor" label="Armor" />
              <Tab value="weapons" label="Weapons" />
              <Tab value="grenades" label="Grenades" />
              <Tab value="misc" label="Misc Gear" />
              <Tab value="cyberware" label="Cyberware" />
              <Tab value="netrunner" label="Netrunner" />
              <Tab value="vehicles" label="Vehicles" />
            </Tabs>
          </Item>
        </Grid>

        {selectedGear === 'armor' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMGiveArmor
                charDetail={charDetail}
                armorMaster={gearMaster.armor}
                setPageAlert={setPageAlert}
                loading={loading}
                setLoading={setLoading}
                chuckError={chuckError}
              />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'weapons' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMGiveWeapons
                charDetail={charDetail}
                weaponMaster={gearMaster.weapons}
                setPageAlert={setPageAlert}
                loading={loading}
                setLoading={setLoading}
                chuckError={chuckError}
              />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'grenades' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMGiveGrenade
                charDetail={charDetail}
                grenadeMaster={gearMaster.grenades}
                setPageAlert={setPageAlert}
                loading={loading}
                setLoading={setLoading}
                chuckError={chuckError}
              />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'misc' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMGiveGearOther
                charDetail={charDetail}
                gearMaster={gearMaster.miscGear}
                setPageAlert={setPageAlert}
                loading={loading}
                setLoading={setLoading}
                chuckError={chuckError}
              />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'cyberware' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMGiveCyberware
                charDetail={charDetail}
                cyberwareMaster={gearMaster.cyberware}
                setPageAlert={setPageAlert}
                loading={loading}
                setLoading={setLoading}
                chuckError={chuckError}
              />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'netrunner' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMGiveNetrunnerMain
                charDetail={charDetail}
                netrunnerMaster={gearMaster.netrunner}
                setPageAlert={setPageAlert}
                loading={loading}
                setLoading={setLoading}
                chuckError={chuckError}
              />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'vehicles' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMGiveVehicles />
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
}
