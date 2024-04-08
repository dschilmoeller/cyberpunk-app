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

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

import ModVehicleMasterTable from './ModVehicleMasterTable'

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

export default function VehicleMasterTable() {
    const dispatch = useDispatch()

    const vehicleMaster = useSelector(store => store.gearMaster.vehicles)

    const charDetail = useSelector((store) => store.characterDetail)
    const loadStatus = useSelector(store => store.loaders.advancementSheet);
    
    const useNomadFreebie = useSelector(store => store.characterGear.useNomadFreebie)

    const [nomadDiscount, setNomadDiscount] = React.useState(0)

    const calculateNomadDiscount = () => {
        if (charDetail.nomad > 0 && charDetail.nomad < 5) {
            setNomadDiscount(charDetail.nomad * 10000)
        } else if (charDetail.nomad > 4 && charDetail.nomad < 7) {
            setNomadDiscount(charDetail.nomad * 15000)
        } else if (charDetail.nomad > 6 && charDetail.nomad < 10) {
            setNomadDiscount(charDetail.nomad * 20000)
        } else {
            setNomadDiscount(charDetail.nomad * 40000)
        }
    }

    React.useEffect(() => {
        calculateNomadDiscount()
    }, [charDetail])

    const euroBuck = `\u20AC$`

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const buyVehicle = (item) => {
        if (charDetail.bank >= item.price && useNomadFreebie === false) {
            let newBank = charDetail.bank - item.price
            // dispatch({ type: 'BUY_VEHICLE', payload: { item, vehicleID } })
            dispatch({ type: 'BUY_ITEM', payload: { itemMasterID: item.vehicle_master_id, newBank, charID: charDetail.id, table: 'char_vehicle_bridge', column: 'vehicle_id', useNomadFreebie: false } })
        } else if (useNomadFreebie === true) {
            let newBank = charDetail.bank
            dispatch({ type: 'BUY_ITEM', payload: { itemMasterID: item.vehicle_master_id, newBank, charID: charDetail.id, table: 'char_vehicle_bridge', column: 'vehicle_id', useNomadFreebie: true } })
            dispatch({ type: 'SET_NOMAD_FREEBIE', payload: false})
        } else {
            setShowSnackbar(true)
        }
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
            id: 'buy',
            numeric: false,
            disablePadding: false,
            label: 'Buy',
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
                            align={headCell.numeric ? 'center' : 'left'}
                            padding={headCell.disablePadding ? 'normal' : 'normal'}
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
        [order, orderBy, vehicleMaster],
    );

    // handle selection between vehicles and mods
    const [selectedShopping, setSelectedShopping] = React.useState('vehicles')
    const handleShoppingSelect = (event, newValue) => {
        setSelectedShopping(newValue)
    }

    return (<>

        <Snackbar
            TransitionComponent={TransitionUp}
            autoHideDuration={2000}
            open={showSnackbar}
            onClose={() => setShowSnackbar(false)}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
            <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
                Transaction canceled due to lack of funds!
            </Alert>
        </Snackbar>

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
                <h2>Buy Vehicle</h2>
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
                                    {useNomadFreebie === true ? (<>
                                        {sortedVehicleMasterRows.map((row) => {
                                            if (useNomadFreebie === true && row.price <= nomadDiscount) {
                                                return (
                                                    <TableRow hover key={row.vehicle_master_id}>
                                                        <TableCell padding='normal'>{row.name}</TableCell>
                                                        <TableCell align="center">{row.description}</TableCell>
                                                        <TableCell align="center">{row.health}</TableCell>
                                                        <TableCell align="center">{row.seats}</TableCell>
                                                        <TableCell align="center">{row.move}</TableCell>
                                                        <TableCell align="center">{row.mph}</TableCell>
                                                        <TableCell align="center">{row.type}</TableCell>
                                                        <TableCell align="center">{euroBuck}0</TableCell>
                                                        <TableCell align="center"><Button variant={loadStatus === false ? 'contained' : 'disabled'} color='success' onClick={() => buyVehicle(row)}>Buy</Button></TableCell>
                                                    </TableRow>
                                                );
                                            } else {
                                                return (<React.Fragment key={row.vehicle_master_id}></React.Fragment>)
                                            }
                                        })}

                                    </>) : <></>}

                                    {useNomadFreebie === false ? (<>
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
                                                    <TableCell align="center"><Button variant={loadStatus === false ? 'contained' : 'disabled'} color='success' onClick={() => buyVehicle(row)}>Buy</Button></TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </>) : <></>}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </>) : <></>}

        {selectedShopping === 'mods' ?
            <ModVehicleMasterTable />
            : <></>}
    </>)
}