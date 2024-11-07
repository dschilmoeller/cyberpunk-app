import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';

import WeaponDialog from '../../Modals/WeaponDialog';

import { getComparator, stableSort, EnhancedTableHead } from './tableFuncs.service';
// TODO
// Give weapon function
// styling for treasure.
export default function GMGiveWeapons({ charDetail, weaponMaster, setPageAlert, loading, setLoading, chuckError }) {
  const euroBuck = `\u20AC$`;

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
      id: 'give',
      numeric: false,
      disablePadding: false,
      label: 'Give',
    },
  ];

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // create weaponMaster data

  function createMasterWeaponData(concealable, damage, dmg_type, hands, max_clip, name, price, range, rof, weapon_master_id, is_treasure) {
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
      weapon_master_id,
      is_treasure,
    };
  }

  // take weaponMaster data and push into array for conversion into rows.
  const weaponMasterRows = [];
  for (let i = 0; i < weaponMaster.length; i++) {
    let damage = 0;
    let range = 0;

    // precalculate strength based damage
    if (weaponMaster[i].dmg_type === 'melee' || weaponMaster[i].dmg_type === 'bow') {
      damage = charDetail.strength + charDetail.cyber_strength + weaponMaster[i].damage;
    } else {
      damage = weaponMaster[i].damage;
    }
    // precalculate strength based range
    if (weaponMaster[i].dmg_type === 'bow') {
      range = (charDetail.strength + charDetail.cyber_strength) * weaponMaster[i].range;
    } else {
      range = weaponMaster[i].range;
    }
    // return finalized weapon data (allows range and damage to sort properly)
    weaponMasterRows.push(
      createMasterWeaponData(
        weaponMaster[i].concealable,
        damage,
        weaponMaster[i].dmg_type,
        weaponMaster[i].hands,
        weaponMaster[i].max_clip,
        weaponMaster[i].name,
        weaponMaster[i].price,
        range,
        weaponMaster[i].rof,
        weaponMaster[i].weapon_master_id,
        weaponMaster[i].is_treasure
      )
    );
  }

  // sort and monitor changes.
  const sortedWeaponMasterRows = React.useMemo(() => stableSort(weaponMasterRows, getComparator(order, orderBy)), [order, orderBy, weaponMaster]);

  return (
    <>
      <h2>Give {charDetail.handle} Weapons</h2>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead headCells={headCells} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
              <TableBody>
                {sortedWeaponMasterRows.map((row) => {
                  return (
                    <TableRow hover key={row.name} sx={row.is_treasure ? { backgroundColor: 'darkgreen' } : {}}>
                      <TableCell>
                        <WeaponDialog prop={row.name} />
                      </TableCell>
                      <TableCell align="left">{row.damage}</TableCell>
                      <TableCell align="left">{row.range}</TableCell>
                      <TableCell align="left">{row.rof}</TableCell>
                      <TableCell align="left">{row.max_clip}</TableCell>
                      <TableCell align="left">{row.hands}</TableCell>
                      <TableCell align="left">{row.concealable === true ? 'Yes' : 'No'}</TableCell>
                      <TableCell align="left">
                        {euroBuck}
                        {row.price.toLocaleString('en-US')}
                      </TableCell>
                      <TableCell align="left">
                        <Button onClick={() => buyWeapon(row)}>Give</Button>
                      </TableCell>
                    </TableRow>
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
