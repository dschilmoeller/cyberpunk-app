import React from 'react';
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
import { Button } from '@mui/material';

export default function AdvancementGarage() {
    const dispatch = useDispatch();
    const characterVehicles = useSelector(store => store.advancementGear.vehicles)
    const characterVehicleMods = useSelector(store => store.advancementGear.vehicleMods)
    const characterEquippedVehicleMods = useSelector(store => store.characterModMaster.vehicleMods)

    const removeVehicleMod = (row, mod) => {
        dispatch({ type: 'REMOVE_VEHICLE_MOD', payload: { modData: mod } })
        if (mod.name === 'Seating Upgrade') {
            dispatch({ type: 'VEHICLE_CHANGE_SEAT', payload: { vehicle_bridge_id: row.vehicle_bridge_id, amount: -1 } })
        }
    }

    const optionBuilder = (type, row) => {
        
        const dispatchVehicleSelection = (event) => {
            dispatch({ type: "EQUIP_VEHICLE_MOD", payload: { vehicle_bridge_id: event.target.value, modData: row } })
            if (row.name === 'Seating Upgrade') {
                dispatch({ type: 'VEHICLE_CHANGE_SEAT', payload: { vehicle_bridge_id: event.target.value, amount: 1 } })
            }
        }

        return (
            <>
                <TableCell align='center'>
                    <Select
                        value={''}
                        label="Vehicle"
                        fullWidth
                        onChange={dispatchVehicleSelection}>
                        {characterVehicles.map(vehicle => {
                            if (vehicle.type === type) {
                                return <MenuItem key={vehicle.vehicle_bridge_id} value={vehicle.vehicle_bridge_id}>{vehicle.name}</MenuItem>
                            }
                        })}
                    </Select>
                </TableCell>
            </>
        )
    }

    return (<>
        <h1>The Garage</h1>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell padding='normal'>Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Health</TableCell>
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
                                <TableRow>
                                    <TableCell padding='normal'><b>{row.name}</b></TableCell>
                                    <TableCell align="center">{row.description}</TableCell>
                                    <TableCell align="center">{row.health}</TableCell>
                                    <TableCell align="center">{row.seats + row.extra_seats}</TableCell>
                                    <TableCell align="center">{row.move}</TableCell>
                                    <TableCell align="center">{row.mph}</TableCell>
                                    <TableCell align="center">{row.type}</TableCell>
                                </TableRow>
                                {characterEquippedVehicleMods.map((mod, i) => {
                                    if (mod.vehicle_bridge_id === row.vehicle_bridge_id) {
                                        return (<React.Fragment key={i}>
                                            <TableRow>
                                                <TableCell>{row.name} Mod:</TableCell>
                                                <TableCell align="center">{mod.name}</TableCell>
                                                <TableCell colSpan={4} >{mod.description}</TableCell>
                                                <TableCell><Button onClick={() => removeVehicleMod(row, mod)}>Remove</Button></TableCell>
                                            </TableRow>
                                        </React.Fragment>)
                                    }
                                })}
                            </React.Fragment>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>



        <h2>My Vehicle Mods</h2>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell padding='normal'>Name</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Vehicle Select</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {characterVehicleMods.map((row, i) => {

                        return (
                            <TableRow key={i}>
                                <TableCell padding='normal'>{row.name}</TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="center">{row.type}</TableCell>
                                {optionBuilder(row.type, row)}
                            </TableRow>
                        )

                    })}
                </TableBody>
            </Table>
        </TableContainer>

    </>)
}