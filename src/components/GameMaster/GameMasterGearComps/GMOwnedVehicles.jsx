import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import GMOwnedVehicleMods from './GMOwnedVehicleMods';

export default function GMOwnedVehicles() {
    const dispatch = useDispatch()

    const charVehicles = useSelector(store => store.advancementGear.vehicles)
    const boughtVehicles = useSelector(store => store.advancementGear.boughtVehicles)

    const charDetail = useSelector((store) => store.advancementDetail)

    const euroBuck = `\u20AC$`

    const gmRemoveVehicle = (item) => {
        dispatch({ type: 'GM_REMOVE_VEHICLE', payload: item })
    }

    const gmRemoveGMVehicle = (item) => {
        if (item.is_nomad_vehicle === true) {
            dispatch({ type: 'RESTORE_NOMAD_SLOT' })
        }
        dispatch({ type: 'GM_REMOVE_GM_VEHICLE', payload: item })
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
    // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
    // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
    // with exampleArray.slice().sort(getComparator(order, orderBy))
    // DS - the above gives a .map error for some reason. Not sure why.

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    const headCells = [
        {
            id: 'name',
            numeric: false,
            disablePadding: true,
            label: 'Name',
        },
        {
            id: 'description',
            numeric: false,
            disablePadding: false,
            label: 'Description',
        },
        {
            id: 'health',
            numeric: false,
            disablePadding: false,
            label: 'Health',
        },
        {
            id: 'seats',
            numeric: false,
            disablePadding: false,
            label: 'Seats',
        },
        {
            id: 'move',
            numeric: false,
            disablePadding: false,
            label: 'Move',
        },
        {
            id: 'mph',
            numeric: false,
            disablePadding: false,
            label: 'Top Speed',
        },
        {
            id: 'type',
            numeric: false,
            disablePadding: false,
            label: 'Type',
        },
        {
            id: 'price',
            numeric: true,
            disablePadding: false,
            label: 'Price',
        },
        {
            id: 'remove',
            numeric: false,
            disablePadding: false,
            label: 'Remove?',
        },
    ];

    function EnhancedTableHead(props) {
        const { order, orderBy, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow hover>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'center' : 'center'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        onRequestSort: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
    };

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('price');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function createCharVehicleData(char_id, description, health, move, mph, name, price, seats, type, vehicle_bridge_id, vehicle_master_id, total_mod_cost) {
        return {
            char_id, description, health, move, mph, name, price, seats, type, vehicle_bridge_id, vehicle_master_id, total_mod_cost
        }
    }

    const charVehicleRows = []
    for (let i = 0; i < charVehicles.length; i++) {
        charVehicleRows.push(createCharVehicleData(charVehicles[i].char_id, charVehicles[i].description, charVehicles[i].health, charVehicles[i].move, charVehicles[i].mph, charVehicles[i].name, charVehicles[i].price, charVehicles[i].seats, charVehicles[i].type, charVehicles[i].vehicle_bridge_id, charVehicles[i].vehicle_master_id, charVehicles[i].total_mod_cost
        ))
    }

    const sortedCharVehicleRows = React.useMemo(
        () =>
            stableSort(charVehicleRows, getComparator(order, orderBy)),
        [order, orderBy, charVehicleRows],
    );

    // handle selection between vehicles and mods
    const [selectedShopping, setSelectedShopping] = React.useState('vehicles')
    const handleShoppingSelect = (event, newValue) => {
        setSelectedShopping(newValue)
    }

    return (
        <>
            <Grid item xs={12}><h2>{charDetail.handle}'s' Vehicles</h2></Grid>

            <Tabs
                value={selectedShopping}
                onChange={handleShoppingSelect}
                indicatorColor='primary'
                textColor='secondary'>
                <Tab value='vehicles' label='Vehicles' />
                <Tab value='mods' label='Vehicle Mods' />
            </Tabs>

            {selectedShopping === 'vehicles' ? (<>
                <Box sx={{ width: '100%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        <TableContainer>
                            <Table
                                sx={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={'small'}
                            >
                                <EnhancedTableHead
                                    order={order}
                                    orderBy={orderBy}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {sortedCharVehicleRows.map((row) => {
                                        return (
                                            <TableRow hover key={row.vehicle_bridge_id}>
                                                <TableCell padding='normal'>{row.name}</TableCell>
                                                <TableCell align="center">{row.description}</TableCell>
                                                <TableCell align="center">{row.health}</TableCell>
                                                <TableCell align="center">{row.seats}</TableCell>
                                                <TableCell align="center">{row.move}</TableCell>
                                                <TableCell align="center">{row.mph}</TableCell>
                                                <TableCell align="center">{row.type}</TableCell>
                                                <TableCell align="center">{euroBuck}{Math.floor((row.price / 4) + row.total_mod_cost).toLocaleString("en-US")}</TableCell>
                                                <TableCell align="center"><Button onClick={() => gmRemoveVehicle(row)}>Remove</Button></TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {/* {boughtVehicles.map((row, i) => {
                                        return (
                                            <TableRow hover key={i}>
                                                <TableCell padding='normal'>{row.name}</TableCell>
                                                <TableCell align="center">{row.description}</TableCell>
                                                <TableCell align="center">{row.health}</TableCell>
                                                <TableCell align="center">{row.seats}</TableCell>
                                                <TableCell align="center">{row.move}</TableCell>
                                                <TableCell align="center">{row.mph}</TableCell>
                                                <TableCell align="center">{row.type}</TableCell>
                                                <TableCell align="center">{euroBuck}{Math.floor(row.price).toLocaleString("en-US")}</TableCell>
                                                <TableCell align="center"><Button onClick={() => gmRemoveGMVehicle(row)}>Remove</Button></TableCell>
                                            </TableRow>
                                        )
                                    })} */}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </>) : <></>}

            {selectedShopping === 'mods' ? <GMOwnedVehicleMods /> : <></>}
        </>
    )
}