import React from 'react';
import { Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { updateVehicleRequest, updateVehicleModEquipStatusRequest, deleteModVehicleBridgeRequest } from '../../../services/equip.services';
import AdvancementGarageOption from './AdvancementGarageOption';
export default function AdvancementGarage({ charGear, setCharGear, loading, setLoading, setPageAlert, chuckError }) {
  // TODO: change mod total cost so vehicle can be sold with mods attached
  // TODO: update vehicle selling page to handle the above?

  // It is doable to make a generic 'mod' route that hits various tables. Not sure if worth it.
  // const unequipMod = (mod, vehicle) => {
  //   dispatch({ type: 'SET_ADVANCEMENT_LOAD_STATUS', payload: true });
  //   console.log(`mod:`, mod);
  //   dispatch({
  //     type: 'CHANGE_MOD_EQUIP_STATUS',
  //     payload: {
  //       modItemID: mod.char_owned_vehicle_mods_id,
  //       mod,
  //       baseItemID: vehicle.vehicle_bridge_id,
  //       equipStatus: false,
  //       charID: advancementDetail.id,
  //       modTable: 'char_vehicle_mod_bridge',
  //       modTablePK: 'char_vehicle_mod_bridge_id',
  //       modID: mod.char_vehicle_mod_bridge_id,
  //       baseItemColumn: 'vehicle_bridge_id',
  //       modItemColumn: 'char_owned_vehicle_mods_id',
  //       modItemTable: 'char_owned_vehicle_mods',
  //     },
  //   });
  // };

  const handleUnequip = async (mod, vehicle) => {
    setLoading(true);
    let vehicleUpdateResult = '';
    vehicleUpdateResult = await updateVehicleRequest({
      vehicleBridgeId: vehicle.vehicle_bridge_id,
      has_armor: mod.name === 'Armored' ? false : vehicle.has_armor,
      extra_seats: mod.name === 'Seating Upgrade' ? vehicle.extra_seats - 1 : vehicle.extra_seats,
      total_mod_cost: vehicle.total_mod_cost,
    });

    const modRemoveResult = await deleteModVehicleBridgeRequest({ vehicleModBridgeId: mod.char_vehicle_mod_bridge_id });
    const modUpdateResult = await updateVehicleModEquipStatusRequest({ equipStatus: false, vehicleModId: mod.char_owned_vehicle_mods_id });

    if (modRemoveResult === 'OK' && modUpdateResult === 'OK' && vehicleUpdateResult === 'OK') {
      setPageAlert({ open: true, message: 'Mod Removed', severity: 'success' });
      setCharGear({
        ...charGear,
        vehicles: charGear.vehicles.map((gearVehicle) => {
          if (gearVehicle.vehicle_bridge_id === vehicle.vehicle_bridge_id && mod.name === 'Armored') {
            return { ...gearVehicle, has_armor: false };
          } else if (gearVehicle.vehicle_bridge_id === vehicle.vehicle_bridge_id && mod.name === 'Seating Upgrade') {
            return { ...gearVehicle, extra_seats: gearVehicle.extra_seats - 1 };
          } else {
            return gearVehicle;
          }
        }),
        vehicleMods: charGear.vehicleMods.map((gearMod) => {
          if (gearMod.char_owned_vehicle_mods_id === mod.char_owned_vehicle_mods_id) {
            return { ...gearMod, equipped: false };
          } else {
            return gearMod;
          }
        }),
        vehicleModBridge: charGear.vehicleModBridge.filter((e) => e.char_owned_vehicle_mods_id != mod.char_owned_vehicle_mods_id),
      });
    } else {
      chuckError();
    }

    setLoading(false);
  };
  return (
    <>
      <h1>The Garage</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow hover>
              <TableCell padding="normal">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Health</TableCell>
              <TableCell align="center">Armor</TableCell>
              <TableCell align="center">Seats</TableCell>
              <TableCell align="center">Move</TableCell>
              <TableCell align="center">Top Speed</TableCell>
              <TableCell align="center">Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {charGear.vehicles.map((row) => {
              return (
                <React.Fragment key={row.vehicle_bridge_id}>
                  <TableRow hover>
                    <TableCell padding="normal">
                      <b>{row.name}</b>
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.health}</TableCell>
                    <TableCell align="center">{row.has_armor === true ? row.health : Math.floor(row.health / 2)}</TableCell>
                    <TableCell align="center">{row.seats + row.extra_seats}</TableCell>
                    <TableCell align="center">{row.move}</TableCell>
                    <TableCell align="center">{row.mph}</TableCell>
                    <TableCell align="center">{row.type}</TableCell>
                  </TableRow>
                  {charGear.vehicleModBridge.map((mod, i) => {
                    if (mod.vehicle_bridge_id === row.vehicle_bridge_id) {
                      return (
                        <React.Fragment key={i}>
                          <TableRow hover>
                            <TableCell />
                            <TableCell align="center">{mod.name}</TableCell>
                            <TableCell colSpan={4}>{mod.description}</TableCell>
                            <TableCell>
                              <Button color="secondary" disabled={loading} onClick={() => handleUnequip(mod, row)}>
                                Unequip
                              </Button>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      );
                    }
                  })}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <h2>My Vehicle Mods</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow hover>
              <TableCell padding="normal">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Type</TableCell>
              <TableCell align="center">Vehicle Select</TableCell>
              <TableCell align="center">Confirm</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {charGear.vehicleMods.map((row, i) => {
              if (row.equipped === false) {
                return (
                  <TableRow hover key={i}>
                    <TableCell padding="normal">{row.name}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.type}</TableCell>
                    <AdvancementGarageOption
                      row={row}
                      vehicles={charGear.vehicles}
                      charGear={charGear}
                      setCharGear={setCharGear}
                      setPageAlert={setPageAlert}
                      chuckError={chuckError}
                    />
                  </TableRow>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
