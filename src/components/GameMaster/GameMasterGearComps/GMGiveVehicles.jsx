import React from 'react';
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

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import GMGiveVehicleMods from './GMGiveVehicleMods';


export default function GMGiveVehicles() {
    const dispatch = useDispatch()

    const vehicleID = useSelector(store => store.advancementGear.vehicleID)
    const vehicleMaster = useSelector(store => store.gearMaster.vehicles)

    const charDetail = useSelector((store) => store.advancementDetail)

    const euroBuck = `\u20AC$`

    const buyVehicle = (item) => {
        dispatch({ type: 'GM_GIVE_VEHICLE', payload: { item, vehicleID } })
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
            id: 'give',
            numeric: false,
            disablePadding: false,
            label: 'Give',
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
                            align={'center'}
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

    function createVehicleMasterData(description, health, move, mph, name, price, seats, type, vehicle_master_id) {
        return {
            description, health, move, mph, name, price, seats, type, vehicle_master_id
        }
    }

    const vehicleMasterRows = []
    for (let i = 0; i < vehicleMaster.length; i++) {
        vehicleMasterRows.push(createVehicleMasterData(vehicleMaster[i].description, vehicleMaster[i].health, vehicleMaster[i].move, vehicleMaster[i].mph, vehicleMaster[i].name, vehicleMaster[i].price, vehicleMaster[i].seats, vehicleMaster[i].type, vehicleMaster[i].vehicle_master_id))
    }

    // sort and monitor changes to charvehiclerows in case of sales.
    const sortedVehicleMasterRows = React.useMemo(
        () =>
            stableSort(vehicleMasterRows, getComparator(order, orderBy)),
        [order, orderBy],
    );

    // handle selection between vehicles and mods
    const [selectedShopping, setSelectedShopping] = React.useState('vehicles')
    const handleShoppingSelect = (event, newValue) => {
        setSelectedShopping(newValue)
    }

    return (<>

        <h2>Give {charDetail.handle} Vehicles & Mods</h2>
        <Tabs
            value={selectedShopping}
            onChange={handleShoppingSelect}
            indicatorColor='primary'
            textColor='secondary'>
            <Tab value='vehicles' label='Vehicles' />
            <Tab value='mods' label='Vehicle Mods' />
        </Tabs>

        {selectedShopping === 'vehicles' ? (
            <>
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
                                    {sortedVehicleMasterRows.map((row) => {
                                        return (
                                            <TableRow hover key={row.vehicle_master_id}>
                                                <TableCell padding='normal'>{row.name}</TableCell>
                                                <TableCell align="center">{row.description}</TableCell>
                                                <TableCell align="center">{row.health}</TableCell>
                                                <TableCell align="center">{row.seats}</TableCell>
                                                <TableCell align="center">{row.move}</TableCell>
                                                <TableCell align="center">{row.mph}</TableCell>
                                                <TableCell align="center">{row.type}</TableCell>
                                                <TableCell align="center">{euroBuck}{Math.floor(row.price).toLocaleString("en-US")}</TableCell>
                                                <TableCell align="center"><Button onClick={() => buyVehicle(row)}>Give</Button></TableCell>
                                            </TableRow>
                                        )
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </>) : <></>}

        {selectedShopping === 'mods' ?
            <GMGiveVehicleMods />
            : <></>}
    </>)
}