import React from 'react';

import { Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import AdvancementGarageOption from './AdvancementGarageOption';
import { updateVehicleRequest, unequipVehicleModRequest, deleteModVehicleBridgeRequest } from './Equip.services';
export default function AdvancementGarage({ charGear, setCharGear, loading, setLoading, setPageAlert, chuckError }) {
  // TODO: saving for reference of generic mod equip/remove route...
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
    console.log(`Mod:`, mod);
    console.log(`vehicle:`, vehicle);
    let vehicleUpdateResult = '';
    if (mod.name === 'Armored') {
      vehicleUpdateResult = await updateVehicleRequest({
        vehicleBridgeId: vehicle.vehicle_bridge_id,
        has_armor: false,
        extra_seats: vehicle.extra_seats,
        total_mod_cost: vehicle.total_mod_cost,
      });
    } else if (mod.name === 'Seating Upgrade') {
      vehicleUpdateResult = await updateVehicleRequest({
        vehicleBridgeId: vehicle.vehicle_bridge_id,
        has_armor: vehicle.has_armor,
        extra_seats: vehicle.extra_seats - 1,
        total_mod_cost: vehicle.total_mod_cost,
      });
    } else {
      vehicleUpdateResult = await updateVehicleRequest({
        vehicleBridgeId: vehicle.vehicle_bridge_id,
        has_armor: vehicle.has_armor,
        extra_seats: vehicle.extra_seats,
        total_mod_cost: vehicle.total_mod_cost,
      });
    }

    const modRemoveResult = await deleteModVehicleBridgeRequest({ vehicleModBridgeId: mod.char_vehicle_mod_bridge_id });
    const modUpdateResult = await unequipVehicleModRequest({ vehicleModId: mod.char_owned_vehicle_mods_id });

    if (modRemoveResult === 'OK' && modUpdateResult === 'OK' && vehicleUpdateResult === 'OK') {
      setPageAlert({ open: true, message: 'Mod Removed', severity: 'success' });
    } else {
      chuckError();
    }
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
                              <Button color="secondary" onClick={() => handleUnequip(mod, row)}>
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
                    <AdvancementGarageOption row={row} vehicles={charGear.vehicles} />
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
