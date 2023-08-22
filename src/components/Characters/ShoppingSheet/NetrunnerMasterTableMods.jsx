import { useState, useMemo } from 'react';
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

export default function NetrunnerMasterTableMods() {
    const dispatch = useDispatch()
    const netrunnerGearID = useSelector(store => store.advancementGear.netrunnerGearID)
    const netrunnerGearMaster = useSelector(store => store.netrunnerGearMaster)

    const charDetail = useSelector((store) => store.advancementDetail)

    const buyNetrunnerGear = (item) => {
        if (charDetail.bank >= item.price) {
            dispatch({ type: 'BUY_NETRUNNER_GEAR', payload: { item, netrunnerGearID: netrunnerGearID } })
        }
        else {
            alert('Transaction canceled due to lack of funds!')
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
            numeric: true,
            disablePadding: false,
            label: 'Description',
        },
        {
            id: 'slots',
            numeric: true,
            disablePadding: false,
            label: 'Slots',
        },
        {
            id: 'price',
            numeric: true,
            disablePadding: false,
            label: 'Price',
        },
        {
            id: 'purchase',
            numeric: false,
            disablePadding: false,
            label: 'Purchase',
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
                            align={headCell.numeric ? 'center' : 'left'}
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

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('name');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // create OtherGear Data

    function createNetrunnerGearData(attack, defense, description, name, netrunner_master_id, price, rez, slots, type) {
        return {
            attack, defense, description, name, netrunner_master_id, price, rez, slots, type
        }
    }

    // take misc gear data and push into array for conversion into rows.
    const netrunnerMasterRows = []
    for (let i = 0; i < netrunnerGearMaster.length; i++) {
        netrunnerMasterRows.push(createNetrunnerGearData(netrunnerGearMaster[i].attack, netrunnerGearMaster[i].defense, netrunnerGearMaster[i].description, netrunnerGearMaster[i].name, netrunnerGearMaster[i].netrunner_master_id, netrunnerGearMaster[i].price, netrunnerGearMaster[i].rez, netrunnerGearMaster[i].slots, netrunnerGearMaster[i].type))
    }

    // sort and monitor changes. 
    const sortedNetrunnerMasterRows = useMemo(
        () =>
            stableSort(netrunnerMasterRows, getComparator(order, orderBy)),
        [order, orderBy],
    );

    return (<>
        <h2>Buy Netrunner Gear</h2>
        {/* Decks
            <TableCell align="center">{row.slots}</TableCell>
            <TableCell align="center">{Math.floor(row.slots / 3)}</TableCell> */}
        {/* software */}

        {/* Tables = turn into own component. Tables are too different. */}
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
                            {sortedNetrunnerMasterRows.map((row) => {
                                if (row.type === 'mod') {
                                    return (
                                        <TableRow hover key={row.name}>
                                            <TableCell align='left'>{row.name}</TableCell>
                                            <TableCell align="left">{row.description}</TableCell>
                                            <TableCell align="center">{row.slots}</TableCell>
                                            <TableCell align="center">${row.price}</TableCell>
                                            <TableCell align="center"><Button onClick={() => buyNetrunnerGear(row)}>Buy</Button></TableCell>
                                        </TableRow>
                                    );
                                }
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    </>)
}