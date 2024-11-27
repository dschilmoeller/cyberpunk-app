import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import { Button } from '@mui/material';

import AdvancementGarageOption from './AdvancementGarageOption';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}

export default function AdvancementGarage() {
  const advancementDetail = useSelector((store) => store.advancementDetail);
  const characterVehicles = useSelector(
    (store) => store.advancementGear.vehicles
  );
  const characterVehicleMods = useSelector(
    (store) => store.advancementGear.vehicleMods
  );
  const characterPreviouslyEquippedVehicleMods = useSelector(
    (store) => store.characterModMaster.vehicleMods
  );

  const loadStatus = useSelector((store) => store.loaders.advancementSheet);

  const dispatch = useDispatch();

  const seeIfArmored = (VehicleBridgeID) => {
    let armoredStatus = false;
    characterPreviouslyEquippedVehicleMods.map((mod) => {
      if (mod.name === 'Armored' && mod.vehicle_bridge_id === VehicleBridgeID) {
        armoredStatus = true;
      }
    });
    return armoredStatus;
  };

  const unequipMod = (mod, vehicle) => {
    dispatch({ type: 'SET_ADVANCEMENT_LOAD_STATUS', payload: true });
    console.log(`mod:`, mod);
    dispatch({
      type: 'CHANGE_MOD_EQUIP_STATUS',
      payload: {
        modItemID: mod.char_owned_vehicle_mods_id,
        mod,
        baseItemID: vehicle.vehicle_bridge_id,
        equipStatus: false,
        charID: advancementDetail.id,
        modTable: 'char_vehicle_mod_bridge',
        modTablePK: 'char_vehicle_mod_bridge_id',
        modID: mod.char_vehicle_mod_bridge_id,
        baseItemColumn: 'vehicle_bridge_id',
        modItemColumn: 'char_owned_vehicle_mods_id',
        modItemTable: 'char_owned_vehicle_mods',
      },
    });
  };

  // showSnackBar, setShowSnackbar and Alert are part of the toast functionality (along with Snackbar in return) being fired by failing to select a vehicle in AdvancementGarageOption
  const showSnackbar = useSelector((store) => store.alerts.advancementSheet);

  const setShowSnackbar = (incoming) => {
    dispatch({ type: 'SET_ADVANCEMENT_ALERT_STATUS', payload: incoming });
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  }); // end toast functionality

  return (
    <>
      <Snackbar
        TransitionComponent={TransitionUp}
        autoHideDuration={2000}
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="warning"
          sx={{ width: '100%' }}
        >
          Please Select a Vehicle!
        </Alert>
      </Snackbar>

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
            {characterVehicles.map((row, i) => {
              return (
                <React.Fragment key={row.vehicle_bridge_id}>
                  <TableRow hover>
                    <TableCell padding="normal">
                      <b>{row.name}</b>
                    </TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.health}</TableCell>
                    {/* Note - armor derived from health */}
                    <TableCell align="center">
                      {seeIfArmored(row.vehicle_bridge_id)
                        ? row.health
                        : Math.floor(row.health / 2)}
                    </TableCell>
                    <TableCell align="center">
                      {row.seats + row.extra_seats}
                    </TableCell>
                    <TableCell align="center">{row.move}</TableCell>
                    <TableCell align="center">{row.mph}</TableCell>
                    <TableCell align="center">{row.type}</TableCell>
                  </TableRow>
                  {characterPreviouslyEquippedVehicleMods.map((mod, i) => {
                    if (mod.vehicle_bridge_id === row.vehicle_bridge_id) {
                      return (
                        <React.Fragment key={i}>
                          <TableRow hover>
                            <TableCell>{row.name} Mod:</TableCell>
                            <TableCell align="center">{mod.name}</TableCell>
                            <TableCell colSpan={4}>{mod.description}</TableCell>
                            <TableCell>
                              <Button
                                variant={
                                  loadStatus === false
                                    ? 'contained'
                                    : 'disabled'
                                }
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
            {characterVehicleMods.map((row, i) => {
              if (row.equipped === false) {
                return (
                  <TableRow hover key={i}>
                    <TableCell padding="normal">{row.name}</TableCell>
                    <TableCell align="center">{row.description}</TableCell>
                    <TableCell align="center">{row.type}</TableCell>
                    <AdvancementGarageOption prop={row} />
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
