import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { Button } from '@mui/material';

export default function AdvancementGarageOption({ prop }) {
    const advancementDetail = useSelector(store => store.advancementDetail)

    const characterVehicles = useSelector(store => store.advancementGear.vehicles)

    const dispatch = useDispatch();

    const [selectedVehicle, setSelectedVehicle] = useState('')

    const handleChange = (event) => {
        setSelectedVehicle(event.target.value)
    }

    const equipVehicleMod = (mod, selectedVehicle) => {
        // need new dispatch
        // "EQUIP_MOD"
        // includes mod type (vehicle in this case) for initial sorting
        // will need to include base item bridge ID and column name - char_vehicle_mod_bridge.vehicle_bridge_id
        // will need to include mod item bridge ID and column name - char_vehicle_mod_bridge.char_owned_vheicle
        // secondary effects (armored, seat # changes, etc) need to be handled and changed in the saga to conform to the rest of the app
        // need to make it like "BUY ITEM" where it works for any item, including whitelists/etc as needed.
        
        dispatch({
            type: 'EQUIP_MOD',
            payload: {
                mod,
                baseItemID: selectedVehicle,
                charID: advancementDetail.id,
                table: 'char_vehicle_mod_bridge',
                baseItemColumn: 'vehicle_bridge_id',
                modItemColumn: 'char_owned_vehicle_mods_id'
            }
        })
    }

    return (
        <>
            <TableCell align='center' sx={{minWidth:0.25}}>
                <FormControl fullWidth>
                    <InputLabel>Vehicle</InputLabel>
                    <Select
                        value={selectedVehicle}
                        label="Vehicle"
                        fullWidth
                        onChange={handleChange}>
                        {characterVehicles.map(vehicle => {
                            {/* if (vehicle.type === type) { */ }
                            return <MenuItem key={vehicle.vehicle_bridge_id} value={vehicle.vehicle_bridge_id}>{vehicle.name}</MenuItem>
                            {/* } */ }
                        })}
                    </Select>
                </FormControl>
            </TableCell>
            <TableCell align="center"><Button onClick={() => equipVehicleMod(prop, selectedVehicle)}>Equip Mod</Button></TableCell>
        </>
    )
}
