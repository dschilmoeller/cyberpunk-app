import React from 'react';

import { Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import AdvancementGarageOption from './AdvancementGarageOption';

export default function AdvancementGarage({ charGear, setCharGear, loading, setLoading, setPageAlert, chuckError }) {
  const characterVehicles = charGear.vehicles;
  const characterVehicleMods = charGear.vehicleMods;

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
            {characterVehicles.map((row) => {
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
                            {/* <TableCell>{row.name} Mod:</TableCell> */}
                            <TableCell />
                            <TableCell align="center">{mod.name}</TableCell>
                            <TableCell colSpan={4}>{mod.description}</TableCell>
                            <TableCell>
                              <Button color="secondary" onClick={() => unequipMod(mod, row)}>
                                Unequip
                              </Button>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      );
                    }
                  })}
                  {/* {characterPreviouslyEquippedVehicleMods.map((mod, i) => {
                    if (mod.vehicle_bridge_id === row.vehicle_bridge_id) {
                      return (
                        <React.Fragment key={i}>
                          <TableRow hover>
                            <TableCell>{row.name} Mod:</TableCell>
                            <TableCell align="center">{mod.name}</TableCell>
                            <TableCell colSpan={4}>{mod.description}</TableCell>
                            <TableCell>
                              <Button
                                variant={loadStatus === false ? 'contained' : 'disabled'}
                                color="secondary"
                                onClick={() => unequipMod(mod, row)}
                              >
                                Unequip
                              </Button>
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      );
                    }
                  })} */}
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
            {characterVehicleMods.map((row, i) => {
              if (row.equipped === false) {
                return (
                  <TableRow hover key={i}>
                    <TableCell padding="normal">{row.name}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.type}</TableCell>
                    <AdvancementGarageOption row={row} vehicles={charGear.vehicles} />
                    {/* {optionBuilder(row.type, row)} */}
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
