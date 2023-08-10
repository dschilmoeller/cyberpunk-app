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


export default function ArmorMasterTable() {
    const dispatch = useDispatch()

    const charArmor = useSelector(store => store.advancementGear.armor)
    const boughtArmor = useSelector(store => store.advancementGear.boughtArmor)
    const armorID = useSelector(store => store.advancementGear.armorID)
    const armorMaster = useSelector(store => store.armorMaster)

    const charShield = useSelector(store => store.advancementGear.shield)
    const boughtShield = useSelector(store => store.advancementGear.boughtShield)
    const shieldID = useSelector(store => store.advancementGear.shieldID)
    const shieldMaster = useSelector(store => store.shieldMaster)

    const charDetail = useSelector((store) => store.advancementDetail)

    const sellOwnedArmor = (item) => {
        dispatch({ type: 'SELL_OWNED_ARMOR', payload: item })
    }

    const sellBoughtArmor = (item) => {
        dispatch({ type: 'SELL_ADVANCEMENT_ARMOR', payload: item })
    }

    const buyArmor = (item) => {
        if (charDetail.bank >= item.price) {
            dispatch({ type: 'BUY_ARMOR', payload: { item, armorID } })
        }
        else {
            alert('Transaction canceled due to lack of funds!')
        }
    }

    const sellOwnedShield = (item) => {
        dispatch({ type: 'SELL_OWNED_SHIELD', payload: item })
    }

    const sellBoughtShield = (item) => {
        dispatch({ type: 'SELL_ADVANCEMENT_SHIELD', payload: item })
    }

    const buyShield = (item) => {
        if (charDetail.bank >= item.price) {
            dispatch({ type: 'BUY_SHIELD', payload: { item, shieldID } })
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

    function createMasterArmorData(armor_master_id, description, name, price, quality) {
        return {
            armor_master_id, description, name, price, quality
        }
    }

    const masterArmorRows = []
    for (let i = 0; i < armorMaster.length; i++) {
        masterArmorRows.push(createMasterArmorData(armorMaster[i].armor_master_id, armorMaster[i].description, armorMaster[i].name,
            armorMaster[i].price, armorMaster[i].quality))
    }
    
    // sort and monitor changes to charArmorRows in case of sales.
    const sortedMasterArmorRows = React.useMemo(
        () =>
            stableSort(masterArmorRows, getComparator(order, orderBy)),
        [order, orderBy],
    );

    function createMasterShieldData(description, name, price, quality, shield_master_id) {
        return {
            description, name, price, quality, shield_master_id
        }
    }

    const masterShieldRows = []
    for (let i = 0; i < shieldMaster.length; i++) {
        masterShieldRows.push(createMasterShieldData(shieldMaster[i].description, shieldMaster[i].name, shieldMaster[i].price,
            shieldMaster[i].quality, shieldMaster[i].shield_master_id))
    }

    const sortedMasterShieldRows = React.useMemo(
        () =>
            stableSort(masterShieldRows, getComparator(order, orderBy)),
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
                            {sortedMasterArmorRows.map((row) => {
                                    return (
                                        <TableRow hover key={row.armor_master_id}>
                                            <TableCell padding="none">{row.name}</TableCell>
                                            <TableCell align="center">{row.quality}</TableCell>
                                            <TableCell align="center">{row.description}</TableCell>
                                            <TableCell align="center">{Math.floor(row.price)}</TableCell>
                                            <TableCell align="center"><Button onClick={() => buyArmor(row)}>Buy</Button></TableCell>
                                        </TableRow>
                                    );
                            })}
                            {sortedMasterShieldRows.map((row) => {
                                    return (
                                        <TableRow hover key={row.shield_master_id}>
                                            <TableCell padding="none">{row.name}</TableCell>
                                            <TableCell align="center">{row.quality}</TableCell>
                                            <TableCell align="center">{row.description}</TableCell>
                                            <TableCell align="center">{Math.floor(row.price)}</TableCell>
                                            <TableCell align="center"><Button onClick={() => buyShield(row)}>Buy</Button></TableCell>
                                        </TableRow>
                                    );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>

    </>)
}