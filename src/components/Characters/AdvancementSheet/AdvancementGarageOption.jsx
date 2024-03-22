import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import TableCell from '@mui/material/TableCell';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { Button } from '@mui/material';

export default function AdvancementGarageOption({ prop }) {
    const advancementDetail = useSelector(store => store.advancementDetail)
    const characterVehicles = useSelector(store => store.advancementGear.vehicles)
    const loadStatus = useSelector(store => store.loaders.advancementSheet);

    const dispatch = useDispatch();

    const [selectedVehicle, setSelectedVehicle] = useState('')

    const handleChange = (event) => {
        setSelectedVehicle(event.target.value)
    }

    const equipVehicleMod = (mod, selectedVehicle) => {
        if (selectedVehicle != '') {
            dispatch({ type: "SET_ADVANCEMENT_LOAD_STATUS", payload: true })
            dispatch({
                type: 'CHANGE_MOD_EQUIP_STATUS',
                payload: {
                    modItemID: mod.char_owned_vehicle_mods_id,
                    baseItemID: selectedVehicle,
                    equipStatus: true,
                    charID: advancementDetail.id,
                    modTable: 'char_vehicle_mod_bridge',
                    baseItemColumn: 'vehicle_bridge_id',
                    modItemColumn: 'char_owned_vehicle_mods_id',
                    modItemTable: 'char_owned_vehicle_mods',
                }
            })
        } else {
            setShowSnackbar(true)
        }
    }

    const setShowSnackbar = (incoming) => {
        // This currently affects the snackbar in the AdvancementGarage only.
        dispatch({ type: 'SET_ADVANCEMENT_ALERT_STATUS', payload: incoming })
    }

    return (
        <>
            <TableCell align='center' sx={{ minWidth: 0.25 }}>
                <FormControl fullWidth>
                    <InputLabel>Vehicle</InputLabel>
                    <Select
                        value={selectedVehicle}
                        label="Vehicle"
                        fullWidth
                        onChange={handleChange}>
                        {characterVehicles.map(vehicle => {
                            if (vehicle.type === prop.type) {
                                return <MenuItem key={vehicle.vehicle_bridge_id} value={vehicle.vehicle_bridge_id}>{vehicle.name}</MenuItem>
                            }
                        })}
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell align="center">
            <Button variant={loadStatus === false && selectedVehicle != '' ? 'contained' : 'disabled'} color='info' onClick={() => equipVehicleMod(prop, selectedVehicle)}>Equip Mod</Button>
            
            
            </TableCell>
        </>
    )
}
