import React, { useState } from 'react';

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

export default function GameMasterOwnedGear() {
  const [selectedGear, setSelectedGear] = useState('armor');
  const handleSelectedGearChange = (event, newValue) => {
    setSelectedGear(newValue);
  };

  return (
    <>
      <Grid container paddingTop={3} spacing={3} alignContent={'center'}>
        <Grid item xs={12} padding={3}>
          <Item>
            <Tabs
              value={selectedGear}
              onChange={handleSelectedGearChange}
              indicatorColor="primary"
              textColor="secondary"
            >
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
              <GMOwnedArmor />
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
