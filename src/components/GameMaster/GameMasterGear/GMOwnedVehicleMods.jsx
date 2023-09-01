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

export default function GMOwnedVehicleMods() {

    const dispatch = useDispatch()

    const charVehicleMods = useSelector(store => store.advancementGear.vehicleMods)
    const boughtVehicleMods = useSelector(store => store.advancementGear.boughtVehicleMods)

    const euroBuck = `\u20AC$`

    const gmRemoveVehicleMod = (item) => {
        dispatch({ type: 'GM_REMOVE_VEHICLE_MOD', payload: item })
    }

    const gmRemoveGMVehicleMod = (item) => {
        if (item.is_nomad_vehicle === true) {
            dispatch({ type: 'RESTORE_NOMAD_SLOT' })
        }
        dispatch({ type: 'GM_REMOVE_GM_VEHICLE_MOD', payload: item })
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
            id: 'sell',
            numeric: false,
            disablePadding: false,
            label: 'Sell',
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
                <TableRow>
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

    function createCharVehicleModData(char_id, char_owned_vehicle_mods_id, description, equipped, name, price, type, vehicle_mod_master_id) {
        return {
            char_id, char_owned_vehicle_mods_id, description, equipped, name, price, type, vehicle_mod_master_id
        }
    }


    const charVehicleModRows = []
    for (let i = 0; i < charVehicleMods.length; i++) {
        charVehicleModRows.push(createCharVehicleModData(
            charVehicleMods[i].char_id,
            charVehicleMods[i].char_owned_vehicle_mods_id,
            charVehicleMods[i].description,
            charVehicleMods[i].equipped,
            charVehicleMods[i].name,
            charVehicleMods[i].price,
            charVehicleMods[i].type,
            charVehicleMods[i].vehicle_mod_master_id))
    }

    // sort and monitor changes to charArmorRows in case of sales.
    const sortedCharVehicleModRows = React.useMemo(
        () =>
            stableSort(charVehicleModRows, getComparator(order, orderBy)),
        [order, orderBy, charVehicleModRows],
    );

    return (
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
                                {sortedCharVehicleModRows.map((row) => {
                                    if (row.equipped === false) {
                                        return (
                                            <TableRow hover key={row.char_owned_vehicle_mods_id}>
                                                <TableCell padding='normal'>{row.name}</TableCell>
                                                <TableCell align="center">{row.description}</TableCell>
                                                <TableCell align="center">{row.type}</TableCell>
                                                <TableCell align="center">{euroBuck}{Math.floor(row.price / 4).toLocaleString("en-US")}</TableCell>
                                                <TableCell align="center"><Button onClick={() => gmRemoveVehicleMod(row)}>Sell</Button></TableCell>
                                            </TableRow>
                                        );
                                    }
                                })}
                                {boughtVehicleMods.map((row, i) => {
                                    return (
                                        <TableRow hover key={i}>
                                            <TableCell padding='normal'>{row.name}</TableCell>
                                            <TableCell align="center">{row.description}</TableCell>
                                            <TableCell align="center">{row.type}</TableCell>
                                            <TableCell align="center">{euroBuck}{Math.floor(row.price).toLocaleString("en-US")}</TableCell>
                                            <TableCell align="center"><Button onClick={() => sellBoughtVehicleMod(row)}>Sell</Button></TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </>
    )
}