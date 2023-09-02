import { useState, useMemo, forwardRef } from 'react';
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


export default function GMGiveNetrunnerMods() {
    const dispatch = useDispatch()
    const netrunnerGearID = useSelector(store => store.advancementGear.netrunnerGearID)
    const netrunnerGearMaster = useSelector(store => store.netrunnerGearMaster)

    const euroBuck = `\u20AC$`

    const buyNetrunnerGear = (item) => {
            dispatch({ type: 'GM_GIVE_NETRUNNER_GEAR', payload: { item, netrunnerGearID: netrunnerGearID, price: 0 } })
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
            id: 'give',
            numeric: true,
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
                            align={'left'}
                            padding={'normal'}
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
                                            <TableCell align="left">{row.slots}</TableCell>
                                            <TableCell align="left">{euroBuck}{row.price.toLocaleString("en-US")}</TableCell>
                                            <TableCell align="left"><Button onClick={() => buyNetrunnerGear(row)}>Give</Button></TableCell>
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