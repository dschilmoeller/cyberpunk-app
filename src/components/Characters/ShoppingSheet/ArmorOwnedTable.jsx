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

export default function ArmorOwnedTable() {
    const dispatch = useDispatch()

    const characterArmor = useSelector(store => store.characterGear.armor)
    const characterShield = useSelector(store => store.characterGear.shield)
    const charDetail = useSelector((store) => store.characterDetail)
    const loadStatus = useSelector(store => store.loaders.advancementSheet);

    const euroBuck = `\u20AC$`

    const sellArmor = (item) => {
        let newBank = Number(charDetail.bank + Math.floor(item.price / 4))
        dispatch({ type: 'SELL_ITEM', payload: { itemID: item.armor_bridge_id, newBank, charID: charDetail.id, table: 'char_armor_bridge', column: 'armor_bridge_id', equippedStatus: item.equipped } })
    }

    const sellShield = (item) => {
        let newBank = Number(charDetail.bank + Math.floor(item.price / 4))
        dispatch({ type: 'SELL_ITEM', payload: { itemID: item.shield_bridge_id, newBank, charID: charDetail.id, table: 'char_shield_bridge', column: 'shield_bridge_id', equippedStatus: item.equipped } })
    }

    const equipArmor = (incomingArmor) => {
        characterArmor.map(armor => {
            if (armor.equipped === true) {
                unequipArmor(armor)
            }
        })
        dispatch({ type: 'CHANGE_GEAR_EQUIP_STATUS', payload: { item: incomingArmor, charID: charDetail.id, table: 'char_armor_bridge', tablePrimaryKey: 'armor_bridge_id', tableID: incomingArmor.armor_bridge_id, equipStatus: true } })
    }

    const equipShield = (incomingShield) => {
        characterShield.map(shield => {
            if (shield.equipped === true) {
                unequipShield(shield)
            }
        })
        dispatch({ type: 'CHANGE_GEAR_EQUIP_STATUS', payload: { item: incomingShield, charID: charDetail.id, table: 'char_shield_bridge', tablePrimaryKey: 'shield_bridge_id', tableID: incomingShield.shield_bridge_id, equipStatus: true } })
    }

    const unequipArmor = (incomingArmor) => {
        dispatch({ type: 'CHANGE_GEAR_EQUIP_STATUS', payload: { item: incomingArmor, charID: charDetail.id, table: 'char_armor_bridge', tablePrimaryKey: 'armor_bridge_id', tableID: incomingArmor.armor_bridge_id, equipStatus: false } })
    }

    const unequipShield = (incomingShield) => {
        dispatch({ type: 'CHANGE_GEAR_EQUIP_STATUS', payload: { item: incomingShield, charID: charDetail.id, table: 'char_shield_bridge', tablePrimaryKey: 'shield_bridge_id', tableID: incomingShield.shield_bridge_id, equipStatus: false } })
    }


    // Table Functions
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
            numeric: true,
            disablePadding: false,
            label: 'Description',
        },
        {
            id: 'equip',
            numeric: true,
            disablePadding: false,
            label: 'Equip'
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
    for (let i = 0; i < characterArmor.length; i++) {
        charArmorRows.push(createCharArmorData(characterArmor[i].armor_bridge_id, characterArmor[i].armor_id, characterArmor[i].armor_master_id,
            characterArmor[i].armor_mod_1, characterArmor[i].char_id, characterArmor[i].description, characterArmor[i].equipped,
            characterArmor[i].name, characterArmor[i].price, characterArmor[i].quality))
    }

    // sort and monitor changes to charArmorRows in case of sales.
    const sortedCharArmorRows = React.useMemo(
        () =>
            stableSort(charArmorRows, getComparator(order, orderBy)),
        [order, orderBy, characterArmor],
    );

    function createCharShieldData(armor_mod_1, char_id, description, equipped, name, price, quality, shield_bridge_id, shield_id, shield_master_id) {
        return {
            armor_mod_1, char_id, description, equipped, name, price, quality, shield_bridge_id, shield_id, shield_master_id
        }
    }

    const charShieldRows = []
    for (let i = 0; i < characterShield.length; i++) {
        charShieldRows.push(createCharShieldData(characterShield[i].armor_mod_1, characterShield[i].char_id, characterShield[i].description,
            characterShield[i].equipped, characterShield[i].name, characterShield[i].price, characterShield[i].quality, characterShield[i].shield_bridge_id,
            characterShield[i].shield_id, characterShield[i].shield_master_id))
    }

    const sortedCharShieldRows = React.useMemo(
        () =>
            stableSort(charShieldRows, getComparator(order, orderBy)),
        [order, orderBy, characterShield],
    );

    return (
        <>
            <h2>Worn Armor</h2>

            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'small'}
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>Name</TableCell>
                                    <TableCell align='center'>Quality</TableCell>
                                    <TableCell align='center'>Description</TableCell>
                                    <TableCell align='center'>Unequip</TableCell>
                                    <TableCell align='center'>Street Price</TableCell>
                                    <TableCell align='center'>Sell</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {sortedCharArmorRows.map((row) => {
                                    if (row.equipped === true) {
                                        return (
                                            <TableRow hover key={row.armor_bridge_id}>
                                                <TableCell align='center'>{row.name}</TableCell>
                                                <TableCell align='center'>{row.quality}</TableCell>
                                                <TableCell align='center'>{row.description}</TableCell>
                                                <TableCell align='center'><Button variant={loadStatus === false ? 'contained' : 'disabled'} color='secondary' onClick={() => unequipArmor(row)}>Unequip</Button></TableCell>
                                                <TableCell align='center'>{euroBuck}{Math.floor(row.price / 4).toLocaleString("en-US")}</TableCell>
                                                <TableCell align='center'><Button variant={loadStatus === false ? 'contained' : 'disabled'} color='error' onClick={() => sellArmor(row)}>Sell</Button></TableCell>
                                            </TableRow>
                                        );
                                    }
                                })}
                                {sortedCharShieldRows.map((row) => {
                                    if (row.equipped === true) {
                                        return (
                                            <TableRow hover key={row.shield_bridge_id}>
                                                <TableCell align='center'>{row.name}</TableCell>
                                                <TableCell align='center'>{row.quality}</TableCell>
                                                <TableCell align='center'>{row.description}</TableCell>
                                                <TableCell align='center'><Button variant={loadStatus === false ? 'contained' : 'disabled'} color='secondary' onClick={() => unequipShield(row)}>Unequip</Button></TableCell>
                                                <TableCell align='center'>{euroBuck}{Math.floor(row.price / 4).toLocaleString("en-US")}</TableCell>
                                                <TableCell align='center'><Button variant={loadStatus === false ? 'contained' : 'disabled'} color='error' onClick={() => sellShield(row)}>Sell</Button></TableCell>
                                            </TableRow>
                                        );
                                    }
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>

            <h2>My Armor / Shields</h2>

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
                                                <TableCell >{row.name}</TableCell>
                                                <TableCell align='center'>{row.quality}</TableCell>
                                                <TableCell align='center'>{row.description}</TableCell>
                                                <TableCell align='center'><Button variant={loadStatus === false ? 'contained' : 'disabled'} color='info' onClick={() => equipArmor(row)}>Equip</Button></TableCell>
                                                <TableCell align='center'>{euroBuck}{Math.floor(row.price / 4).toLocaleString("en-US")}</TableCell>
                                                <TableCell align='center'><Button variant={loadStatus === false ? 'contained' : 'disabled'} color='error' onClick={() => sellArmor(row)}>Sell</Button></TableCell>
                                            </TableRow>
                                        );
                                    }
                                })}
                                {sortedCharShieldRows.map((row) => {
                                    if (row.equipped === false) {
                                        return (
                                            <TableRow hover key={row.shield_bridge_id}>
                                                <TableCell>{row.name}</TableCell>
                                                <TableCell align='center'>{row.quality}</TableCell>
                                                <TableCell align='center'>{row.description}</TableCell>
                                                <TableCell align='center'><Button variant={loadStatus === false ? 'contained' : 'disabled'} color='info' onClick={() => equipShield(row)}>Equip</Button></TableCell>
                                                <TableCell align='center'>{euroBuck}{Math.floor(row.price / 4).toLocaleString("en-US")}</TableCell>
                                                <TableCell align='center'><Button variant={loadStatus === false ? 'contained' : 'disabled'} color='error' onClick={() => sellShield(row)}>Sell</Button></TableCell>
                                            </TableRow>
                                        );
                                    }
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Box>
        </>
    )
}