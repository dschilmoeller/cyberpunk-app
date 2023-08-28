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

export default function ArmorOwnedTable() {
    const dispatch = useDispatch()

    const charArmor = useSelector(store => store.advancementGear.armor)
    const boughtArmor = useSelector(store => store.advancementGear.boughtArmor)
    const armorID = useSelector(store => store.advancementGear.armorID)

    const charShield = useSelector(store => store.advancementGear.shield)
    const boughtShield = useSelector(store => store.advancementGear.boughtShield)
    const shieldID = useSelector(store => store.advancementGear.shieldID)

    const charDetail = useSelector((store) => store.advancementDetail)

    const euroBuck = `\u20AC$`

    const sellOwnedArmor = (item) => {
        dispatch({ type: 'SELL_OWNED_ARMOR', payload: item })
    }

    const sellBoughtArmor = (item) => {
        dispatch({ type: 'SELL_ADVANCEMENT_ARMOR', payload: item })
    }

    const sellOwnedShield = (item) => {
        dispatch({ type: 'SELL_OWNED_SHIELD', payload: item })
    }

    const sellBoughtShield = (item) => {
        dispatch({ type: 'SELL_ADVANCEMENT_SHIELD', payload: item })
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
            id: 'quality',
            numeric: true,
            disablePadding: false,
            label: 'Quality',
        },
        {
            id: 'description',
            numeric: false,
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

    function createCharArmorData(armor_bridge_id, armor_id, armor_master_id, armor_mod_1, char_id, description, equipped, name, price, quality) {
        return {
            armor_bridge_id, armor_id, armor_master_id, armor_mod_1, char_id, description, equipped, name, price, quality
        }
    }

    const charArmorRows = []
    for (let i = 0; i < charArmor.length; i++) {
        charArmorRows.push(createCharArmorData(charArmor[i].armor_bridge_id, charArmor[i].armor_id, charArmor[i].armor_master_id,
            charArmor[i].armor_mod_1, charArmor[i].char_id, charArmor[i].description, charArmor[i].equipped,
            charArmor[i].name, charArmor[i].price, charArmor[i].quality))
    }

    // sort and monitor changes to charArmorRows in case of sales.
    const sortedCharArmorRows = React.useMemo(
        () =>
            stableSort(charArmorRows, getComparator(order, orderBy)),
        [order, orderBy, charArmorRows],
    );

    function createCharShieldData(armor_mod_1, char_id, description, equipped, name, price, quality, shield_bridge_id, shield_id, shield_master_id) {
        return {
            armor_mod_1, char_id, description, equipped, name, price, quality, shield_bridge_id, shield_id, shield_master_id
        }
    }

    const charShieldRows = []
    for (let i = 0; i < charShield.length; i++) {
        charShieldRows.push(createCharShieldData(charShield[i].armor_mod_1, charShield[i].char_id, charShield[i].description,
            charShield[i].equipped, charShield[i].name, charShield[i].price, charShield[i].quality, charShield[i].shield_bridge_id,
            charShield[i].shield_id, charShield[i].shield_master_id))
    }

    const sortedCharShieldRows = React.useMemo(
        () =>
            stableSort(charShieldRows, getComparator(order, orderBy)),
        [order, orderBy, charShieldRows],
    );

    return (
        <>
            
            <h2>My Armor</h2>

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
                                {sortedCharArmorRows.map((row) => {
                                    if (row.equipped === false) {
                                        return (
                                            <TableRow hover key={row.armor_bridge_id}>
                                                <TableCell padding="none">{row.name}</TableCell>
                                                <TableCell align="center">{row.quality}</TableCell>
                                                <TableCell align="center">{row.description}</TableCell>
                                                <TableCell align="center">{euroBuck}{Math.floor(row.price / 4).toLocaleString("en-US")}</TableCell>
                                                <TableCell align="center"><Button onClick={() => sellOwnedArmor(row)}>Sell</Button></TableCell>
                                            </TableRow>
                                        );
                                    }
                                })}
                                {boughtArmor.map((item, i) => {
                                    return (
                                        <TableRow hover key={i}>
                                            <TableCell padding="none" align="left">{item.name} </TableCell>
                                            <TableCell align="center">{item.quality}</TableCell>
                                            <TableCell align="center">{item.description}</TableCell>
                                            <TableCell align="center">{euroBuck}{Math.floor(item.price).toLocaleString("en-US")}</TableCell>
                                            <TableCell align="center"><Button onClick={() => sellBoughtArmor(item)}>Sell</Button></TableCell>
                                        </TableRow>
                                    )
                                })}
                                {sortedCharShieldRows.map((row) => {
                                    if (row.equipped === false) {
                                        return (
                                            <TableRow hover key={row.shield_bridge_id}>
                                                <TableCell padding="none">{row.name}</TableCell>
                                                <TableCell align="center">{row.quality}</TableCell>
                                                <TableCell align="center">{row.description}</TableCell>
                                                <TableCell align="center">{euroBuck}{Math.floor(row.price / 4).toLocaleString("en-US")}</TableCell>
                                                <TableCell align="center"><Button onClick={() => sellOwnedShield(row)}>Sell</Button></TableCell>
                                            </TableRow>
                                        );
                                    }
                                })}
                                {boughtShield.map((item, i) => {
                                    return (
                                        <TableRow hover key={i}>
                                            <TableCell padding="none" align="left">{item.name} </TableCell>
                                            <TableCell align="center">{item.quality}</TableCell>
                                            <TableCell align="center">{item.description}</TableCell>
                                            <TableCell align="center">{euroBuck}{Math.floor(item.price).toLocaleString("en-US")}</TableCell>
                                            <TableCell align="center"><Button onClick={() => sellBoughtShield(item)}>Sell</Button></TableCell>
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