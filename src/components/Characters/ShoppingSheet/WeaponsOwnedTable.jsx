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

export default function WeaponsOwnedTable() {
  const dispatch = useDispatch();

  const charWeapons = useSelector((store) => store.advancementGear.weapons);
  const charDetail = useSelector((store) => store.advancementDetail);
  const loadStatus = useSelector((store) => store.loaders.advancementSheet);

  const euroBuck = `\u20AC$`;

  const sellWeapon = (item) => {
    let newBank = Number(charDetail.bank + Math.floor(item.price / 4));
    dispatch({
      type: 'SELL_ITEM',
      payload: {
        itemID: item.weapon_bridge_id,
        newBank,
        charID: charDetail.id,
        table: 'char_weapons_bridge',
        column: 'weapon_bridge_id',
      },
    });
  };

  const equipWeapon = (item) => {
    dispatch({
      type: 'CHANGE_GEAR_EQUIP_STATUS',
      payload: {
        item,
        charID: charDetail.id,
        table: 'char_weapons_bridge',
        tablePrimaryKey: 'weapon_bridge_id',
        tableID: item.weapon_bridge_id,
        equipStatus: true,
      },
    });
  };

  const unequipWeapon = (item) => {
    dispatch({
      type: 'CHANGE_GEAR_EQUIP_STATUS',
      payload: {
        item,
        charID: charDetail.id,
        table: 'char_weapons_bridge',
        tablePrimaryKey: 'weapon_bridge_id',
        tableID: item.weapon_bridge_id,
        equipStatus: false,
      },
    });
  };

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
      numeric: true,
      disablePadding: false,
      label: 'Concealable',
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'Street Price',
    },
  ];

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
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

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('equipped');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  function createCharWeaponData(
    char_id,
    concealable,
    current_shots_fired,
    damage,
    dmg_type,
    equipped,
    hands,
    max_clip,
    name,
    price,
    range,
    rof,
    weapon_bridge_id,
    weapon_id,
    weapon_master_id
  ) {
    return {
      char_id,
      concealable,
      current_shots_fired,
      damage,
      dmg_type,
      equipped,
      hands,
      max_clip,
      name,
      price,
      range,
      rof,
      weapon_bridge_id,
      weapon_id,
      weapon_master_id,
    };
  }

  const charWeaponRows = [];
  for (let i = 0; i < charWeapons.length; i++) {
    let damage = 0;
    let range = 0;

    if (
      charWeapons[i].dmg_type === 'melee' ||
      charWeapons[i].dmg_type === 'bow'
    ) {
      damage =
        charDetail.strength + charDetail.cyber_strength + charWeapons[i].damage;
    } else {
      damage = charWeapons[i].damage;
    }

    if (charWeapons[i].dmg_type === 'bow') {
      range =
        (charDetail.strength + charDetail.cyber_strength) *
        charWeapons[i].range;
    } else {
      range = charWeapons[i].range;
    }

    charWeaponRows.push(
      createCharWeaponData(
        charWeapons[i].char_id,
        charWeapons[i].concealable,
        charWeapons[i].current_shots_fired,
        damage,
        charWeapons[i].dmg_type,
        charWeapons[i].equipped,
        charWeapons[i].hands,
        charWeapons[i].max_clip,
        charWeapons[i].name,
        charWeapons[i].price,
        range,
        charWeapons[i].rof,
        charWeapons[i].weapon_bridge_id,
        charWeapons[i].weapon_id,
        charWeapons[i].weapon_master_id
      )
    );
  }

  // sort and monitor changes to charWeaponRows in case of sales.
  const sortedCharWeaponRows = React.useMemo(
    () => stableSort(charWeaponRows, getComparator(order, orderBy)),
    [order, orderBy, charWeaponRows]
  );

  return (
    <>
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
                  return (
                    <React.Fragment key={row.weapon_bridge_id}>
                      <TableRow hover>
                        <TableCell>
                          <WeaponDialog prop={row.name} />
                        </TableCell>
                        <TableCell align="center">{row.damage}</TableCell>
                        <TableCell align="center">{row.range}</TableCell>
                        <TableCell align="center">{row.rof}</TableCell>
                        <TableCell align="center">{row.max_clip}</TableCell>
                        <TableCell align="center">{row.hands}</TableCell>
                        <TableCell align="center">
                          {row.concealable === true ? 'Yes' : 'No'}
                        </TableCell>
                        <TableCell align="center">
                          {euroBuck}
                          {Math.floor(row.price / 4).toLocaleString('en-US')}
                        </TableCell>
                      </TableRow>
                      {row.equipped === true ? (
                        <>
                          <TableRow hover>
                            <TableCell colSpan={3} align="center">
                              {row.name} is Equipped!
                            </TableCell>
                            <TableCell colSpan={3} align="center">
                              <Button
                                variant={
                                  loadStatus === false
                                    ? 'contained'
                                    : 'disabled'
                                }
                                color="secondary"
                                onClick={() => unequipWeapon(row)}
                              >
                                Unequip
                              </Button>
                            </TableCell>
                            <TableCell colSpan={3} align="center">
                              <Button
                                variant={
                                  loadStatus === false
                                    ? 'contained'
                                    : 'disabled'
                                }
                                color="error"
                                onClick={() => sellWeapon(row)}
                              >
                                Sell
                              </Button>
                            </TableCell>
                          </TableRow>
                        </>
                      ) : (
                        <>
                          <TableRow hover>
                            <TableCell colSpan={3} align="center">
                              {row.name} is NOT Equipped!
                            </TableCell>
                            <TableCell colSpan={3} align="center">
                              <Button
                                variant={
                                  loadStatus === false
                                    ? 'contained'
                                    : 'disabled'
                                }
                                color="info"
                                onClick={() => equipWeapon(row)}
                              >
                                Equip
                              </Button>
                            </TableCell>
                            <TableCell colSpan={3} align="center">
                              <Button
                                variant={
                                  loadStatus === false
                                    ? 'contained'
                                    : 'disabled'
                                }
                                color="error"
                                onClick={() => sellWeapon(row)}
                              >
                                Sell
                              </Button>
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}
