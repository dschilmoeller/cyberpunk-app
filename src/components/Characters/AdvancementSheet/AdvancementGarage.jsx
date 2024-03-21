import React from 'react';
import { useSelector } from 'react-redux';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Button } from '@mui/material';

import AdvancementGarageOption from './AdvancementGarageOption';

export default function AdvancementGarage() {

    const characterVehicles = useSelector(store => store.advancementGear.vehicles)
    const characterVehicleMods = useSelector(store => store.advancementGear.vehicleMods)
    const characterPreviouslyEquippedVehicleMods = useSelector(store => store.characterModMaster.vehicleMods)
    const characterNewlyEquippedVehicleMods = useSelector(store => store.characterModMaster.addedVehicleMods)

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

    // need new component to deal with state changes on an individual vehicle basis.


    

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
                                    <AdvancementGarageOption prop={row} />
                                    {/* {optionBuilder(row.type, row)} */}
                                </TableRow>
                            )
                        }
                    })}

                </TableBody>
            </Table>
        </TableContainer>

    </>)
}