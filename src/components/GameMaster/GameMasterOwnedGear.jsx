import React, { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Item from '../Characters/CharacterSheet/Item';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import GMOwnedArmor from './GameMasterGearComps/GMOwnedArmor';
import GMOwnedWeapons from './GameMasterGearComps/GMOwnedWeapons';
import GMOwnedGrenade from './GameMasterGearComps/GMOwnedGrenade';
import GMOtherOwned from './GameMasterGearComps/GMOwnedGearOther';
import GMOwnedCyberware from './GameMasterGearComps/GMOwnedCyberware';
import GMOwnedNetrunner from './GameMasterGearComps/GMOwnedNetrunner';
import GMOwnedVehicles from './GameMasterGearComps/GMOwnedVehicles';

import {
  fetchCharacterArmorRequest,
  fetchCharacterShieldsRequest,
  fetchCharacterWeaponsRequest,
  fetchCharacterGrenadesRequest,
  fetchCharacterMiscGearRequest,
  fetchCharacterCyberwareRequest,
  fetchCharacterNetrunnerGearRequest,
  fetchCharacterVehiclesRequest,
  fetchCharacterVehicleModsRequest,
} from '../Characters/character.services';

export default function GameMasterOwnedGear({ charDetail, setCharDetail, setPageAlert, loading, setLoading, chuckError }) {
  const [selectedGear, setSelectedGear] = useState('armor');
  const handleSelectedGearChange = (event, newValue) => {
    setSelectedGear(newValue);
  };

  const [characterGear, setCharacterGear] = useState({});
  const fetchCharacterGear = async () => {
    const charObj = {
      charID: charDetail.id,
    };
    const charArmor = await fetchCharacterArmorRequest(charObj);
    const charShield = await fetchCharacterShieldsRequest(charObj);
    const charWeapons = await fetchCharacterWeaponsRequest(charObj);
    const charGrenades = await fetchCharacterGrenadesRequest(charObj);
    const charMisc = await fetchCharacterMiscGearRequest(charObj);
    const charCyberware = await fetchCharacterCyberwareRequest(charObj);
    const charNetrunner = await fetchCharacterNetrunnerGearRequest(charObj);
    const charVehicles = await fetchCharacterVehiclesRequest(charObj);
    const charVehicleMods = await fetchCharacterVehicleModsRequest(charObj);

    setCharacterGear({
      charArmor,
      charShield,
      charWeapons,
      charGrenades,
      charMisc,
      charCyberware,
      charNetrunner,
      charVehicles,
      charVehicleMods,
    });
  };

  useEffect(() => {
    fetchCharacterGear();
  }, []);

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
              <GMOwnedArmor charDetail={charDetail} charArmor={characterGear.charArmor} charShield={characterGear.charShield} />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'weapons' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMOwnedWeapons />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'grenades' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMOwnedGrenade />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'misc' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMOtherOwned />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'cyberware' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMOwnedCyberware />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'netrunner' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMOwnedNetrunner />
            </Grid>
          </>
        ) : (
          <></>
        )}

        {selectedGear === 'vehicles' ? (
          <>
            <Grid item xs={12} padding={1}>
              <GMOwnedVehicles />
            </Grid>
          </>
        ) : (
          <></>
        )}
      </Grid>
    </>
  );
}
