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

export default function WeaponsMasterTable() {
    const dispatch = useDispatch()
    const weaponID = useSelector(store => store.advancementGear.weaponID)
    const weaponMaster = useSelector(store => store.weaponMaster)

    const charDetail = useSelector((store) => store.advancementDetail)

    const buyWeapon = (item) => {
        if (charDetail.bank >= item.price) {
            dispatch({ type: 'BUY_WEAPON', payload: { item, weaponID } })
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



    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('price');


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    // create weaponMaster data

    function createMasterWeaponData(concealable, damage, dmg_type, hands, max_clip, name, price, range, rof, weapon_master_id) {
        return {
            concealable,
            damage,
            dmg_type,
            hands,
            max_clip,
            name,
            price,
            range,
            rof,
            weapon_master_id
        }
    }

    // take weaponMaster data and push into array for conversion into rows.
    const weaponMasterRows = []
    for (let i = 0; i < weaponMaster.length; i++) {
        let damage = 0
        let range = 0

        // precalculate strength based damage
        if (weaponMaster[i].dmg_type === 'melee' || weaponMaster[i].dmg_type === 'bow') {
            damage = charDetail.strength + charDetail.cyber_strength + weaponMaster[i].damage
        } else {
            damage = weaponMaster[i].damage
        }
        // precalculate strength based range
        if (weaponMaster[i].dmg_type === 'bow') {
            range = (charDetail.strength + charDetail.cyber_strength) * weaponMaster[i].range
        } else {
            range = weaponMaster[i].range
        }
        // return finalized weapon data (allows range and damage to sort properly)
        weaponMasterRows.push(createMasterWeaponData(weaponMaster[i].concealable, damage, weaponMaster[i].dmg_type,
            weaponMaster[i].hands, weaponMaster[i].max_clip, weaponMaster[i].name,
            weaponMaster[i].price, range, weaponMaster[i].rof,
            weaponMaster[i].weapon_master_id))
    }

    // sort and monitor changes. 
    const sortedWeaponMasterRows = React.useMemo(
        () =>
            stableSort(weaponMasterRows, getComparator(order, orderBy)),
        [order, orderBy],
    );

    return (<>
        <h1>Shop Weapons</h1>


        <h2>Buy Weapon</h2>
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
                            {sortedWeaponMasterRows.map((row) => {
                                return (
                                    <TableRow hover key={row.name}>
                                        <TableCell padding="none">{row.name}</TableCell>
                                        <TableCell align="center">{row.damage}</TableCell>
                                        <TableCell align="center">{row.range}</TableCell>
                                        <TableCell align="center">{row.rof}</TableCell>
                                        <TableCell align="center">{row.max_clip}</TableCell>
                                        <TableCell align="center">{row.hands}</TableCell>
                                        <TableCell align="center">{row.concealable === true ? 'Yes' : 'No'}</TableCell>
                                        <TableCell align="center">{row.price}</TableCell>
                                        <TableCell align="center"><Button onClick={() => buyWeapon(row)}>Buy</Button></TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>

        {/* Old table - not sortable. */}
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
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Buy</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {weaponMaster.map(item => {
                        return (<React.Fragment key={item.weapon_master_id}>
                            <TableRow>
                                <TableCell align="left">{item.name} </TableCell>
                                <TableCell align="center">{item.dmg_type === 'melee' || item.dmg_type === 'bow' ? `${charDetail.strength + charDetail.cyber_strength + item.damage}` : `${item.damage}`}</TableCell>
                                <TableCell align="center">{item.dmg_type === 'bow' ? `${(charDetail.strength + charDetail.cyber_strength) * item.range}` : `${item.range}`}</TableCell>
                                <TableCell align="center">{item.rof}</TableCell>
                                <TableCell align="center">{item.max_clip}</TableCell>
                                <TableCell align="center">{item.hands}</TableCell>
                                <TableCell align="center">{item.concealable ? 'Yes' : 'No'}</TableCell>
                                <TableCell align="center">{item.price}</TableCell>
                                <TableCell align="center"><Button onClick={() => buyWeapon(item)}>Buy</Button></TableCell>
                            </TableRow>
                        </React.Fragment>)
                    })}
                </TableBody>
            </Table>
        </TableContainer> */}
    </>)
}