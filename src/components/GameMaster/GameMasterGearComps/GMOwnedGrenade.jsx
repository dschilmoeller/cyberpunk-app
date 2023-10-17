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

import WeaponDialog from '../../Modals/WeaponDialog';

export default function GMOwnedGrenade() {
    const dispatch = useDispatch()
    const charGrenades = useSelector(store => store.advancementGear.grenades)
    const boughtGrenades = useSelector(store => store.advancementGear.boughtGrenades)

    const charDetail = useSelector((store) => store.advancementDetail)

    const euroBuck = `\u20AC$`

    

    const gmRemoveGrenade = (item) => {
        dispatch({ type: 'GM_REMOVE_GRENADE', payload: item })
    }

    const gmRemoveGMGrenade = (item) => {
        dispatch({ type: 'GM_REMOVE_GM_GRENADE', payload: item })
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
            id: 'range',
            numeric: true,
            disablePadding: false,
            label: 'Range',
        },
        {
            id: 'price',
            numeric: true,
            disablePadding: false,
            label: 'Street Price',
        },
        {
            id: 'remove',
            numeric: false,
            disablePadding: false,
            label: 'Remove',
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

    function createCharGrenadeData(char_id, name, description, price, range, grenade_bridge_id, grenade_id, grenade_master_id) {
        return {
            char_id,
            name,
            description,
            price,
            range,
            grenade_bridge_id,
            grenade_id,
            grenade_master_id
        }
    }

    const charGrenadeRows = []
    for (let i = 0; i < charGrenades.length; i++) {
        charGrenadeRows.push(createCharGrenadeData(
            charGrenades[i].char_id,
            charGrenades[i].name,
            charGrenades[i].description,
            charGrenades[i].price,
            charGrenades[i].range,
            charGrenades[i].grenade_bridge_id,
            charGrenades[i].grenade_id,
            charGrenades[i].grenade_master_id
        ))
    }

    // sort and monitor changes to charWeaponRows in case of sales.
    const sortedCharGrenadeRows = React.useMemo(
        () =>
            stableSort(charGrenadeRows, getComparator(order, orderBy)),
        [order, orderBy, charGrenadeRows],
    );



    return (<>
        <h2>My Grenades</h2>

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
                            {sortedCharGrenadeRows.map((row) => {
                                return (
                                    <TableRow hover key={row.grenade_bridge_id}>
                                        <TableCell padding="none"><WeaponDialog prop={row.name} /></TableCell>
                                        <TableCell align="center">{row.description}</TableCell>
                                        <TableCell align="center">{5 * (charDetail.strength + charDetail.cyber_strength)}</TableCell>
                                        <TableCell align="center">{euroBuck}{Math.floor(row.price / 4).toLocaleString("en-US")}</TableCell>
                                        <TableCell align="center"><Button onClick={() => gmRemoveGrenade(row)}>Remove</Button></TableCell>
                                    </TableRow>
                                );
                            })}
                            {boughtGrenades.map((item, i) => {
                                return (
                                    <TableRow hover key={i}>
                                        <TableCell padding="none"><WeaponDialog prop={item.name} /></TableCell>
                                        <TableCell align="center">{item.description}</TableCell>
                                        <TableCell align="center">{5 * (charDetail.strength + charDetail.cyber_strength)}</TableCell>
                                        <TableCell align="center">{euroBuck}{Math.floor(item.price.toLocaleString("en-US"))}</TableCell>
                                        <TableCell align="center"><Button onClick={() => gmRemoveGMGrenade(item)}>Remove</Button></TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>

        {/* Old table - not sortable */}

        {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow hover>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Damage</TableCell>
                        <TableCell align="center">Range</TableCell>
                        <TableCell align="center">Rate of Fire</TableCell>
                        <TableCell align="center">Max Clip</TableCell>
                        <TableCell align="center"># of Hands</TableCell>
                        <TableCell align="center">Concealable?</TableCell>
                        <TableCell align="center">Street Price</TableCell>
                        <TableCell align="center">Sell</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {charWeapons.map(item => {
                        if (item.equipped === false) {
                            return (<React.Fragment key={item.weapon_bridge_id}>
                                <TableRow hover>
                                    <TableCell align="left">{item.name} </TableCell>
                                    <TableCell align="center">{item.damage + charDetail.strength + charDetail.cyber_strength}</TableCell>
                                    <TableCell align="center">{item.range}</TableCell>
                                    <TableCell align="center">{item.rof}</TableCell>
                                    <TableCell align="center">{item.max_clip}</TableCell>
                                    <TableCell align="center">{item.hands}</TableCell>
                                    <TableCell align="center">{item.concealable ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="center">{Math.floor(item.price / 4)}</TableCell>
                                    <TableCell align="center"><Button onClick={() => sellOwnedWeapon(item)}>Sell</Button></TableCell>
                                </TableRow>
                            </React.Fragment>)
                        }
                    })}
                    {boughtWeapons.map((item, i) => {
                        return (<React.Fragment key={i}>
                            <TableRow hover>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="center">{item.damage + charDetail.strength + charDetail.cyber_strength}</TableCell>
                                <TableCell align="center">{item.range}</TableCell>
                                <TableCell align="center">{item.rof}</TableCell>
                                <TableCell align="center">{item.max_clip}</TableCell>
                                <TableCell align="center">{item.hands}</TableCell>
                                <TableCell align="center">{item.concealable ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{Math.floor(item.price)}</TableCell>
                                <TableCell align="center"><Button onClick={() => sellBoughtWeapon(item)}>Sell</Button></TableCell>
                            </TableRow>
                        </React.Fragment>)
                    })}
                </TableBody>
            </Table>
        </TableContainer> */}

    </>)
}
