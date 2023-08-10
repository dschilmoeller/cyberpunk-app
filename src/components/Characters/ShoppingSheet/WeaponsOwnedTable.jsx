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

export default function WeaponsOwnedTable() {
    const dispatch = useDispatch()
    const charWeapons = useSelector(store => store.advancementGear.weapons)
    const boughtWeapons = useSelector(store => store.advancementGear.boughtWeapons)

    const charDetail = useSelector((store) => store.advancementDetail)

    const sellOwnedWeapon = (item) => {
        dispatch({ type: 'SELL_OWNED_WEAPON', payload: item })
    }

    const sellBoughtWeapon = (item) => {
        dispatch({ type: 'SELL_ADVANCEMENT_WEAPON', payload: item })
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
            id: 'damage',
            numeric: true,
            disablePadding: false,
            label: 'Damage',
        },
        {
            id: 'range',
            numeric: true,
            disablePadding: false,
            label: 'Range',
        },
        {
            id: 'rof',
            numeric: true,
            disablePadding: false,
            label: 'Rate of Fire',
        },
        {
            id: 'max_clip',
            numeric: true,
            disablePadding: false,
            label: 'Max Clip',
        },
        {
            id: 'hands',
            numeric: true,
            disablePadding: false,
            label: '# of Hands',
        },
        {
            id: 'concealable',
            numeric: false,
            disablePadding: false,
            label: 'Concealable',
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

    function createCharWeaponData(char_id, concealable, current_shots_fired,
        damage, dmg_type, equipped,
        hands, max_clip, name,
        price, range, rof,
        weapon_bridge_id, weapon_id, weapon_master_id,
        weapon_mod_1, weapon_mod_2) {
        return {
            char_id, concealable, current_shots_fired,
            damage, dmg_type, equipped,
            hands, max_clip, name,
            price, range, rof,
            weapon_bridge_id, weapon_id, weapon_master_id,
            weapon_mod_1, weapon_mod_2
        }
    }

    const charWeaponRows = []
    for (let i = 0; i < charWeapons.length; i++) {
        let damage = 0
        let range = 0

        if (charWeapons[i].dmg_type === 'melee' || charWeapons[i].dmg_type === 'bow') {
            damage = charDetail.strength + charDetail.cyber_strength + charWeapons[i].damage
        } else {
            damage = charWeapons[i].damage
        }

        if (charWeapons[i].dmg_type === 'bow') {
            range = (charDetail.strength + charDetail.cyber_strength) * charWeapons[i].range
        } else {
            range = charWeapons[i].range
        }

        charWeaponRows.push(createCharWeaponData(charWeapons[i].char_id, charWeapons[i].concealable, charWeapons[i].current_shots_fired,
            damage, charWeapons[i].dmg_type, charWeapons[i].equipped,
            charWeapons[i].hands, charWeapons[i].max_clip, charWeapons[i].name,
            charWeapons[i].price, range, charWeapons[i].rof,
            charWeapons[i].weapon_bridge_id, charWeapons[i].weapon_id, charWeapons[i].weapon_master_id,
            charWeapons[i].weapon_mod_1, charWeapons[i].weapon_mod_2))
    }

    // sort and monitor changes to charWeaponRows in case of sales.
    const sortedCharWeaponRows = React.useMemo(
        () =>
            stableSort(charWeaponRows, getComparator(order, orderBy)),
        [order, orderBy, charWeaponRows],
    );



    return (<>
        <h1>Shop Weapons</h1>
        <h2>My Weapons</h2>

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
                            {sortedCharWeaponRows.map((row) => {
                                if (row.equipped === false) {
                                    return (
                                        <TableRow hover key={row.weapon_bridge_id}>
                                            <TableCell padding="none">{row.name}</TableCell>
                                            <TableCell align="center">{row.damage}</TableCell>
                                            <TableCell align="center">{row.range}</TableCell>
                                            <TableCell align="center">{row.rof}</TableCell>
                                            <TableCell align="center">{row.max_clip}</TableCell>
                                            <TableCell align="center">{row.hands}</TableCell>
                                            <TableCell align="center">{row.concealable === true ? 'yes' : 'no'}</TableCell>
                                            <TableCell align="center">{Math.floor(row.price / 4)}</TableCell>
                                            <TableCell align="center"><Button onClick={() => sellOwnedWeapon(row)}>Sell</Button></TableCell>
                                        </TableRow>
                                    );
                                }
                            })}
                            {boughtWeapons.map((item, i) => {
                                return (
                                    <TableRow hover key={i}>
                                        <TableCell padding="none" align="left">{item.name} </TableCell>
                                        <TableCell align="center">{item.damage + charDetail.strength + charDetail.cyber_strength}</TableCell>
                                        <TableCell align="center">{item.range}</TableCell>
                                        <TableCell align="center">{item.rof}</TableCell>
                                        <TableCell align="center">{item.max_clip}</TableCell>
                                        <TableCell align="center">{item.hands}</TableCell>
                                        <TableCell align="center">{item.concealable ? 'Yes' : 'No'}</TableCell>
                                        <TableCell align="center">{Math.floor(item.price)}</TableCell>
                                        <TableCell align="center"><Button onClick={() => sellBoughtWeapon(item)}>Sell</Button></TableCell>
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
                    <TableRow>
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
                                <TableRow>
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
                            <TableRow>
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
