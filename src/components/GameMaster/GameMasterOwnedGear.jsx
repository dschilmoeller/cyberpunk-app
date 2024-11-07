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
  fetchCharacterWeaponsRequest,
  fetchCharacterGrenadesRequest,
  fetchCharacterMiscGearRequest,
  fetchCharacterCyberwareRequest,
  fetchCharacterNetrunnerGearRequest,
  fetchCharacterVehiclesRequest,
  fetchCharacterVehicleModsRequest,
} from '../Characters/gear.services';

export default function GameMasterOwnedGear({ charDetail, setCharDetail, setPageAlert, loading, setLoading, chuckError }) {
  const [selectedGear, setSelectedGear] = useState('armor');
  const handleSelectedGearChange = (event, newValue) => {
    setSelectedGear(newValue);
  };

  const [characterGear, setCharacterGear] = useState({
    charArmor: [],
    charWeapons: [],
    charGrenades: [],
    charMisc: [],
    charCyberware: [],
    charNetrunner: [],
    charVehicles: [],
    charVehicleMods: [],
  });

  const fetchCharacterGear = async () => {
    const charObj = {
      charID: charDetail.id,
    };
    try {
      const charArmor = await fetchCharacterArmorRequest(charObj);
      const charWeapons = await fetchCharacterWeaponsRequest(charObj);
      const charGrenades = await fetchCharacterGrenadesRequest(charObj);
      const charMisc = await fetchCharacterMiscGearRequest(charObj);
      const charCyberware = await fetchCharacterCyberwareRequest(charObj);
      const charNetrunner = await fetchCharacterNetrunnerGearRequest(charObj);
      const charVehicles = await fetchCharacterVehiclesRequest(charObj);
      const charVehicleMods = await fetchCharacterVehicleModsRequest(charObj);

      setCharacterGear({
        charArmor,
        charWeapons,
        charGrenades,
        charMisc,
        charCyberware,
        charNetrunner,
        charVehicles,
        charVehicleMods,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching gear:', error);
      chuckError();
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchCharacterGear();
  }, []);

  return (
    <>
      {loading ? (
        <> </>
      ) : (
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
                  <GMOwnedArmor
                    charDetail={charDetail}
                    charArmor={characterGear.charArmor}
                    setPageAlert={setPageAlert}
                    setCharDetail={setCharDetail}
                  />
                </Grid>
              </>
            ) : (
              <></>
            )}

            {selectedGear === 'weapons' ? (
              <>
                <Grid item xs={12} padding={1}>
                  <GMOwnedWeapons
                    charDetail={charDetail}
                    charWeapons={characterGear.charWeapons}
                    setPageAlert={setPageAlert}
                    setCharDetail={setCharDetail}
                  />
                </Grid>
              </>
            ) : (
              <></>
            )}

            {selectedGear === 'grenades' ? (
              <>
                <Grid item xs={12} padding={1}>
                  <GMOwnedGrenade
                    charDetail={charDetail}
                    charGrenades={characterGear.charGrenades}
                    setPageAlert={setPageAlert}
                    setCharDetail={setCharDetail}
                  />
                </Grid>
              </>
            ) : (
              <></>
            )}

            {selectedGear === 'misc' ? (
              <>
                <Grid item xs={12} padding={1}>
                  <GMOtherOwned
                    charDetail={charDetail}
                    charMiscGear={characterGear.charMisc}
                    setPageAlert={setPageAlert}
                    setCharDetail={setCharDetail}
                  />
                </Grid>
              </>
            ) : (
              <></>
            )}

            {selectedGear === 'cyberware' ? (
              <>
                <Grid item xs={12} padding={1}>
                  <GMOwnedCyberware
                    charDetail={charDetail}
                    charCyberware={characterGear.charCyberware}
                    setPageAlert={setPageAlert}
                    setCharDetail={setCharDetail}
                  />
                </Grid>
              </>
            ) : (
              <></>
            )}

            {selectedGear === 'netrunner' ? (
              <>
                <Grid item xs={12} padding={1}>
                  <GMOwnedNetrunner
                    charDetail={charDetail}
                    charNetrunnerGear={characterGear.charNetrunner}
                    setPageAlert={setPageAlert}
                    setCharDetail={setCharDetail}
                  />
                </Grid>
              </>
            ) : (
              <></>
            )}

            {selectedGear === 'vehicles' ? (
              <>
                <Grid item xs={12} padding={1}>
                  <GMOwnedVehicles
                    charDetail={charDetail}
                    charVehicles={characterGear.charVehicles}
                    charVehicleMods={characterGear.charVehicleMods}
                    setPageAlert={setPageAlert}
                    setCharDetail={setCharDetail}
                  />
                </Grid>
              </>
            ) : (
              <></>
            )}
          </Grid>
        </>
      )}
    </>
  );
}
