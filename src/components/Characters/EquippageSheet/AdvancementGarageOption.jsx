import React, { useState } from 'react';
import { Button, TableCell, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { updateVehicleRequest, updateVehicleModEquipStatusRequest, insertModVehicleBridgeRequest } from './Equip.services';

export default function AdvancementGarageOption({ row, vehicles, charGear, setCharGear, setPageAlert, chuckError }) {
  const [selectedVehicle, setSelectedVehicle] = useState('');

  const handleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  const handleEquip = async (mod, vehicle) => {
    console.log({ vehicle: vehicle, mod: mod });
    let vehicleUpdateResult = '';
    vehicleUpdateResult = await updateVehicleRequest({
      vehicleBridgeId: vehicle.vehicle_bridge_id,
      has_armor: mod.name === 'Armored' ? true : vehicle.has_armor,
      extra_seats: mod.name === 'Seating Upgrade' ? vehicle.extra_seats + 1 : vehicle.extra_seats,
      total_mod_cost: vehicle.total_mod_cost,
    });

    const modInsertResult = await insertModVehicleBridgeRequest({ vehicleID: vehicle.vehicle_bridge_id, modID: mod.char_owned_vehicle_mods_id });
    const modUpdateResult = await updateVehicleModEquipStatusRequest({ equipStatus: true, vehicleModId: mod.char_owned_vehicle_mods_id });

    if (modInsertResult.success === 1 && modUpdateResult === 'OK' && vehicleUpdateResult === 'OK') {
      setPageAlert({ open: true, message: 'Mod Installed', severity: 'success' });
      setCharGear({
        ...charGear,
        vehicles: charGear.vehicles.map((gearVehicle) => {
          if (gearVehicle.vehicle_bridge_id === vehicle.vehicle_bridge_id && mod.name === 'Armored') {
            return { ...gearVehicle, has_armor: true };
          } else if (gearVehicle.vehicle_bridge_id === vehicle.vehicle_bridge_id && mod.name === 'Seating Upgrade') {
            return { ...gearVehicle, extra_seats: gearVehicle.extra_seats + 1 };
          } else {
            return gearVehicle;
          }
        }),
        vehicleMods: charGear.vehicleMods.map((gearMod) => {
          if (gearMod.char_owned_vehicle_mods_id === mod.char_owned_vehicle_mods_id) {
            return { ...gearMod, equipped: true };
          } else {
            return gearMod;
          }
        }),
        vehicleModBridge: [
          ...charGear.vehicleModBridge,
          {
            ...mod,
            vehicle_id: vehicle.vehicle_id,
            vehicle_bridge_id: vehicle.vehicle_bridge_id,
            char_vehicle_mod_bridge_id: modInsertResult.result.char_vehicle_mod_bridge_id,
            equipped: true,
          },
        ],
      });
    } else {
      chuckError();
    }
  };

  return (
    <>
      <TableCell align="center" sx={{ minWidth: 0.25 }}>
        <FormControl fullWidth>
          <InputLabel>Vehicle</InputLabel>
          <Select value={selectedVehicle} label="Vehicle" fullWidth onChange={handleChange}>
            {vehicles.map((vehicle) => {
              if (vehicle.type === row.type) {
                return (
                  <MenuItem key={vehicle.vehicle_bridge_id} value={vehicle}>
                    {vehicle.name}
                  </MenuItem>
                );
              }
            })}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell align="center">
        <Button variant={selectedVehicle != '' ? 'contained' : 'disabled'} color="info" onClick={() => handleEquip(row, selectedVehicle)}>
          Equip Mod
        </Button>
      </TableCell>
    </>
  );
}
