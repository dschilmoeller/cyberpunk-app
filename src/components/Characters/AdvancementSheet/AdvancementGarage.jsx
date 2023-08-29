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
import Autocomplete from '@mui/material/Autocomplete';
import { Button } from '@mui/material';

export default function AdvancementGarage() {
    const dispatch = useDispatch();
    const characterVehicles = useSelector(store => store.advancementGear.vehicles)
    const characterVehicleMods = useSelector(store => store.advancementGear.vehicleMods)
    const characterEquippedVehicleMods = useSelector(store => store.characterModMaster.vehicleMods)
    const charDetail = useSelector(store => store.advancementDetail)


    // const unequipWeapon = (incomingWeapon) => {
    //     dispatch({ type: "UNEQUIP_WEAPON", payload: incomingWeapon })
    // }

    // const equipWeapon = (incomingWeapon) => {
    //     dispatch({ type: "EQUIP_WEAPON", payload: incomingWeapon })
    // }
    const [vehicleList, setVehicleList] = React.useState([])
    const [refreshAutocomplete, setRefreshAutocomplete] = React.useState(false)
    const vehicleSetter = () => {
        setVehicleList([])
        characterVehicles.map(item => {
            setVehicleList(vehicleList => [...vehicleList, characterVehicleDataBuilder(item.name, item.vehicle_bridge_id, item.type)])
        })
    }

    const characterVehicleDataBuilder = (vehicleName, vehicle_bridge_id, type) => {
        return { label: vehicleName, id: vehicle_bridge_id, type: type }
    }

    React.useEffect(() => {
        vehicleSetter();
    }, [])

    const AutoSelector = (row) => {
        const filterVehicleList = []

        vehicleList.map(vehicle => {
            if (vehicle.type === row.type) {
                filterVehicleList.push(vehicle)
            }
        })

        return (
            <Autocomplete
                key={refreshAutocomplete}
                disablePortal
                id="vehicle-box-selector"
                options={filterVehicleList}
                onChange={(event, value) => handleVehicleSelector(value, row)}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Choose Vehicle" />}
            />
        );
    }

    const handleVehicleSelector = (value, row) => {

        if (value !== null && row !== null) {
            console.log(`value:`, value)
            console.log(`row:`, row)
            dispatch({ type: "EQUIP_VEHICLE_MOD", payload: { vehicle_bridge_id: value.id, modData: row } })
            setRefreshAutocomplete(true)
        }

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
                                    <TableCell align="center">{row.seats}</TableCell>
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
                                                <TableCell colSpan={5} >{mod.description}</TableCell>
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
                        <TableCell align="center">Equip to vehicle</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {characterVehicleMods.map((row, i) => {

                        return (
                            <TableRow key={i}>
                                <TableCell padding='normal'>{row.name}</TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="center">{row.type}</TableCell>
                                <TableCell align='center'>{AutoSelector(row)}</TableCell>
                            </TableRow>
                        )

                    })}
                </TableBody>
            </Table>
        </TableContainer>

    </>)
}