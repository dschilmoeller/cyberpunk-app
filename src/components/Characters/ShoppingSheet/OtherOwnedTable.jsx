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
import Grid from '@mui/material/Grid';

export default function OtherOwnedTable() {
    const dispatch = useDispatch()
    const charMiscGear = useSelector(store => store.advancementGear.gear)
    const boughtMiscGear = useSelector(store => store.advancementGear.boughtMiscGear)
    const miscGearID = useSelector(store => store.advancementGear.miscGearID)

    const charDetail = useSelector((store) => store.advancementDetail)

    const euroBuck = `\u20AC$`

    const sellOwnedGear = (item) => {
        dispatch({ type: 'SELL_OWNED_MISC_GEAR', payload: item })
    }

    const sellBoughtGear = (item) => {
        dispatch({ type: 'SELL_ADVANCEMENT_MISC_GEAR', payload: item })
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
            id: 'price',
            numeric: true,
            disablePadding: false,
            label: 'Street Price',
        },
        {
            id: 'sell',
            numeric: true,
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
    const [orderBy, setOrderBy] = React.useState('name');

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    function createCharOtherData(char_gear_bridge_id, char_id, description, misc_gear_id, misc_gear_master_id, name, price) {
        return {
            char_gear_bridge_id,
            char_id,
            description,
            misc_gear_id,
            misc_gear_master_id,
            name,
            price
        }
    }

    const charOtherRows = []
    for (let i = 0; i < charMiscGear.length; i++) {
        charOtherRows.push(createCharOtherData(charMiscGear[i].char_gear_bridge_id,
            charMiscGear[i].char_id,
            charMiscGear[i].description,
            charMiscGear[i].misc_gear_id,
            charMiscGear[i].misc_gear_master_id,
            charMiscGear[i].name,
            charMiscGear[i].price))
    }

    // sort and monitor changes to charOtherRows in case of sales.
    const sortedCharOtherRows = React.useMemo(
        () =>
            stableSort(charOtherRows, getComparator(order, orderBy)),
        [order, orderBy, charOtherRows],
    );



    return (<>
        <h2>My Other</h2>

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
                            {sortedCharOtherRows.map((row) => {
                                return (
                                    <TableRow hover key={row.char_gear_bridge_id}>
                                        <TableCell >{row.name}</TableCell>
                                        <TableCell align="center">{row.description}</TableCell>
                                        <TableCell align="center">{euroBuck}{Math.floor(row.price / 4).toLocaleString("en-US")}</TableCell>
                                        <TableCell align="center"><Button onClick={() => sellOwnedGear(row)}>Sell</Button></TableCell>
                                    </TableRow>
                                );
                            })}
                            {boughtMiscGear.map((item, i) => {
                                return (
                                    <TableRow hover key={i}>
                                        <TableCell align="left">{item.name} </TableCell>
                                        <TableCell align="center">{item.description}</TableCell>
                                        <TableCell align="center">{euroBuck}{Math.floor(item.price).toLocaleString("en-US")}</TableCell>
                                        <TableCell align="center"><Button onClick={() => sellBoughtGear(item)}>Sell</Button></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    </>)
}
