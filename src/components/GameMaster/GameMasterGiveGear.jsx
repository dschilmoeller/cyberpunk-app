import React, { useState, useEffect } from 'react';
import { Grid, Tabs, Tab } from '@mui/material/';

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
import { giveCharacterGearRequest } from '../GameMaster/gm.services';

import Item from '../Characters/CharacterSheet/Item';
import GMGiveArmor from './GameMasterGearComps/GMGiveArmor';
import GMGiveWeapons from './GameMasterGearComps/GMGiveWeapons';
import GMGiveGrenade from './GameMasterGearComps/GMGiveGrenade';
import GMGiveGearOther from './GameMasterGearComps/GMGiveGearOther';
import GMGiveCyberware from './GameMasterGearComps/GMGiveCyberware';
import GMGiveNetrunnerMain from './GameMasterGearComps/GMGiveNetrunnerMain';
import GMGiveVehicles from './GameMasterGearComps/GMGiveVehicles';

// TODO
// Allow creation of items (LATER) through page rather than DB edits.
export default function GameMasterGiveGear({ charDetail, setPageAlert, setLoading, chuckError }) {
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
    setLoading(true);
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

  const giveCharacterGear = async (gearObj) => {
    setLoading(true);
    try {
      let result = await giveCharacterGearRequest(gearObj);
      if (result === 'OK') {
        setPageAlert({
          open: true,
          message: 'Item Given',
          severity: 'success',
        });
      } else {
        chuckError();
      }
    } catch (error) {
      console.error('Error giving character gear:', error);
      chuckError();
    }
    setLoading(false);
  };

  useEffect(() => {
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
              <Tab disabled value="netrunner" label="Netrunner" />
              <Tab value="vehicles" label="Vehicles" />
            </Tabs>
          </Item>
        </Grid>

        {selectedGear === 'armor' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMGiveArmor charDetail={charDetail} armorMaster={gearMaster.armor} giveCharacterGear={giveCharacterGear} />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'weapons' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMGiveWeapons charDetail={charDetail} weaponMaster={gearMaster.weapons} giveCharacterGear={giveCharacterGear} />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'grenades' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMGiveGrenade charDetail={charDetail} grenadeMaster={gearMaster.grenades} giveCharacterGear={giveCharacterGear} />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'misc' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMGiveGearOther charDetail={charDetail} gearMaster={gearMaster.miscGear} giveCharacterGear={giveCharacterGear} />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'cyberware' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMGiveCyberware charDetail={charDetail} cyberwareMaster={gearMaster.cyberware} giveCharacterGear={giveCharacterGear} />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'netrunner' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMGiveNetrunnerMain charDetail={charDetail} netrunnerMaster={gearMaster.netrunner} giveCharacterGear={giveCharacterGear} />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'vehicles' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMGiveVehicles
                charDetail={charDetail}
                vehicleMaster={gearMaster.vehicles}
                vehicleModMaster={gearMaster.vehicleMods}
                giveCharacterGear={giveCharacterGear}
              />
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
}
