import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Button } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from './tableFuncs.service';

import WeaponDialog from '../../Modals/WeaponDialog';

// TODO
// Remove weapon function
// equip/unequip weapon
export default function GMOwnedWeapons({ charDetail, charWeapons, deleteCharacterGear }) {
  const euroBuck = `\u20AC$`;

  const headCells = headCellsGenerator(['name', 'damage', 'range', 'rof', 'max_clip', 'hands', 'concealable', 'price', 'equipped', 'remove']);

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('equipped');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Produce proper damage and range values for various weapons.
  const charWeaponRows = [];
  for (let i = 0; i < charWeapons.length; i++) {
    let damage = 0;
    let range = 0;

    if (charWeapons[i].dmg_type === 'melee' || charWeapons[i].dmg_type === 'bow') {
      damage = charDetail.strength + charDetail.cyber_strength + charWeapons[i].damage;
    } else {
      damage = charWeapons[i].damage;
    }

    if (charWeapons[i].dmg_type === 'bow') {
      range = (charDetail.strength + charDetail.cyber_strength) * charWeapons[i].range;
    } else {
      range = charWeapons[i].range;
    }

    charWeaponRows.push({
      char_id: charWeapons[i].char_id,
      concealable: charWeapons[i].concealable,
      current_shots_fired: charWeapons[i].current_shots_fired,
      damage,
      dmg_type: charWeapons[i].dmg_type,
      equipped: charWeapons[i].equipped,
      hands: charWeapons[i].hands,
      max_clip: charWeapons[i].max_clip,
      name: charWeapons[i].name,
      price: charWeapons[i].price,
      range,
      rof: charWeapons[i].rof,
      weapon_bridge_id: charWeapons[i].weapon_bridge_id,
      weapon_id: charWeapons[i].weapon_id,
      weapon_master_id: charWeapons[i].weapon_master_id,
    });
  }

  // sort and monitor changes to charWeaponRows in case of sales.
  const sortedCharWeaponRows = React.useMemo(() => stableSort(charWeaponRows, getComparator(order, orderBy)), [order, orderBy]);

  return (
    <>
      <h2>{charDetail.handle}&apos;s Weapons</h2>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead headCells={headCells} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
              <TableBody>
                {sortedCharWeaponRows.map((row) => {
                  return (
                    <TableRow hover key={row.weapon_bridge_id}>
                      <TableCell>
                        <WeaponDialog prop={row.name} />
                      </TableCell>
                      <TableCell align="center">{row.damage}</TableCell>
                      <TableCell align="center">{row.range}</TableCell>
                      <TableCell align="center">{row.rof}</TableCell>
                      <TableCell align="center">{row.max_clip}</TableCell>
                      <TableCell align="center">{row.hands}</TableCell>
                      <TableCell align="center">{row.concealable === true ? 'yes' : 'no'}</TableCell>
                      <TableCell align="center">
                        {euroBuck}
                        {Math.floor(row.price / 4).toLocaleString('en-US')}
                      </TableCell>
                      <TableCell align="center">{row.equipped ? 'Y' : 'N'}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => deleteCharacterGear({ type: 'weapon', data: row.weapon_bridge_id })}>Remove</Button>
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
