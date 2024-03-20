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

    const advancementDetail = useSelector(store => store.advancementDetail)

    const characterVehicles = useSelector(store => store.advancementGear.vehicles)
    const characterVehicleMods = useSelector(store => store.advancementGear.vehicleMods)
    const characterPreviouslyEquippedVehicleMods = useSelector(store => store.characterModMaster.vehicleMods)
    const characterNewlyEquippedVehicleMods = useSelector(store => store.characterModMaster.addedVehicleMods)

    // need new dispatch
    // "EQUIP_MOD"
    // includes mod type (vehicle in this case) for initial sorting
    // will need to include base item bridge ID and column name - char_vehicle_mod_bridge.vehicle_bridge_id
    // will need to include mod item bridge ID and column name - char_vehicle_mod_bridge.char_owned_vheicle
    // secondary effects (armored, seat # changes, etc) need to be handled and changed in the saga to conform to the rest of the app
    // need to make it like "BUY ITEM" where it works for any item, including whitelists/etc as needed.

    const equipVehicleMod = (mod) => {
        // This currently dispatches the mod but not the base item. Need to modify the existing option builder to be able to pack in the base item data. 
        dispatch({
            type: 'EQUIP_MOD',
            payload: {
                mod,
                charID: advancementDetail.id,
                table: 'char_vehicle_mod_bridge',
                baseItemColumn: 'vehicle_bridge_id',
                modItemColumn: 'char_owned_vehicle_mods_id'
            }
        })
    }

    const removePreviouslyEquippedVehicleMod = (row, mod) => {
        dispatch({ type: 'REMOVE_VEHICLE_MOD', payload: { modData: mod } })
        if (mod.name === 'Seating Upgrade') {
            dispatch({ type: 'VEHICLE_CHANGE_SEAT', payload: { vehicle_bridge_id: row.vehicle_bridge_id, amount: -1 } })
        }
    }

    const removeNewlyEquippedVehicleMod = (row, mod) => {
        dispatch({ type: 'REMOVE_NEW_VEHICLE_MOD', payload: { modData: mod } })
        if (mod.name === 'Seating Upgrade') {
            dispatch({ type: 'VEHICLE_CHANGE_SEAT', payload: { vehicle_bridge_id: row.vehicle_bridge_id, amount: -1 } })
        }
    }

    const seeIfArmored = (VehicleBridgeID) => {
        let armoredStatus = false
        characterPreviouslyEquippedVehicleMods.map(mod => {
            if (mod.name === "Armored" && mod.vehicle_bridge_id === VehicleBridgeID) {
                armoredStatus = true
            }
        })
        characterNewlyEquippedVehicleMods.map(mod => {
            if (mod.name === "Armored" && mod.vehicle_bridge_id === VehicleBridgeID) {
                armoredStatus = true
            }
        })

        return armoredStatus
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
                    <TableRow hover>
                        <TableCell padding='normal'>Name</TableCell>
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
                                    <TableCell padding='normal'><b>{row.name}</b></TableCell>
                                    <TableCell align="center">{row.description}</TableCell>
                                    <TableCell align="center">{row.health}</TableCell>
                                    {/* Note - armor derived from health */}
                                    <TableCell align="center">{seeIfArmored(row.vehicle_bridge_id) ? row.health : Math.floor(row.health / 2)}</TableCell>
                                    <TableCell align="center">{row.seats + row.extra_seats}</TableCell>
                                    <TableCell align="center">{row.move}</TableCell>
                                    <TableCell align="center">{row.mph}</TableCell>
                                    <TableCell align="center">{row.type}</TableCell>
                                </TableRow>
                                {characterPreviouslyEquippedVehicleMods.map((mod, i) => {
                                    if (mod.vehicle_bridge_id === row.vehicle_bridge_id) {
                                        return (<React.Fragment key={i}>
                                            <TableRow hover>
                                                <TableCell>{row.name} Mod:</TableCell>
                                                <TableCell align="center">{mod.name}</TableCell>
                                                <TableCell colSpan={4} >{mod.description}</TableCell>
                                                <TableCell><Button onClick={() => removePreviouslyEquippedVehicleMod(row, mod)}>Remove</Button></TableCell>
                                            </TableRow>
                                        </React.Fragment>)
                                    }
                                })}
                                {characterNewlyEquippedVehicleMods.map((mod, i) => {
                                    if (mod.vehicle_bridge_id === row.vehicle_bridge_id) {
                                        return (<React.Fragment key={i}>
                                            <TableRow hover>
                                                <TableCell>{row.name} Mod:</TableCell>
                                                <TableCell align="center">{mod.name}</TableCell>
                                                <TableCell colSpan={4} >{mod.description}</TableCell>
                                                <TableCell><Button onClick={() => removeNewlyEquippedVehicleMod(row, mod)}>Remove</Button></TableCell>
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
                    <TableRow hover>
                        <TableCell padding='normal'>Name</TableCell>
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
                                    <TableCell padding='normal'>{row.name}</TableCell>
                                    <TableCell align="center">{row.description}</TableCell>
                                    <TableCell align="center">{row.type}</TableCell>
                                    {optionBuilder(row.type, row)}
                                    <TableCell align="center"><Button onClick={() => equipVehicleMod(row)}>Equip Mod</Button></TableCell>
                                </TableRow>
                            )
                        }
                    })}

                </TableBody>
            </Table>
        </TableContainer>

    </>)
}