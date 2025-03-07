import React, { useState, useEffect } from 'react';
import { Grid, Tab, Tabs } from '@mui/material';
import Item from '../Characters/CharacterSheet/Item';

import GMOwnedArmor from './GameMasterGearComps/GMOwnedArmor';
import GMOwnedWeapons from './GameMasterGearComps/GMOwnedWeapons';
import GMOwnedGrenade from './GameMasterGearComps/GMOwnedGrenade';
import GMOtherOwned from './GameMasterGearComps/GMOwnedGearOther';
import GMOwnedCyberware from './GameMasterGearComps/GMOwnedCyberware';
import GMOwnedNetrunner from './GameMasterGearComps/GMOwnedNetrunner';
import GMOwnedVehicles from './GameMasterGearComps/GMOwnedVehicles';

import { deleteCharacterGearRequest } from '../../services/gm.services';

import {
  fetchCharacterArmorRequest,
  fetchCharacterWeaponsRequest,
  fetchCharacterGrenadesRequest,
  fetchCharacterMiscGearRequest,
  fetchCharacterCyberwareRequest,
  fetchCharacterNetrunnerGearRequest,
  fetchCharacterVehiclesRequest,
  fetchCharacterVehicleModsRequest,
} from '../../services/gear.services';

export default function GameMasterOwnedGear({ charDetail, setCharDetail, setPageAlert, loading, setLoading }) {
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
    setLoading(true);
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
    } catch (error) {
      console.error('Error fetching gear:', error);
      setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
    }
    setLoading(false);
  };

  const deleteCharacterGear = async (gearObj) => {
    setLoading(true);
    try {
      let result = await deleteCharacterGearRequest(gearObj);
      if (result === 'OK') {
        fetchCharacterGear();
        setPageAlert({
          open: true,
          message: 'Crap Deleted',
          severity: 'success',
        });
      } else {
        setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
      }
    } catch (error) {
      console.error('Error deleting character gear:', error);
      setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
    }
    setLoading(false);
  };

  useEffect(() => {
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
                    deleteCharacterGear={deleteCharacterGear}
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
                    deleteCharacterGear={deleteCharacterGear}
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
                    deleteCharacterGear={deleteCharacterGear}
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
                    deleteCharacterGear={deleteCharacterGear}
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
                    deleteCharacterGear={deleteCharacterGear}
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
                    deleteCharacterGear={deleteCharacterGear}
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
                    deleteCharacterGear={deleteCharacterGear}
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
