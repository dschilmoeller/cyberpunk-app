import React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../GeneralAssets/tableFuncs.service';
import WeaponDialog from '../../Modals/WeaponDialog';

export default function GMGiveWeapons({ charDetail, weaponMaster, giveCharacterGear }) {
  const euroBuck = `\u20AC$`;

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

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
    weaponMasterRows.push({
      concealable: weaponMaster[i].concealable,
      damage,
      dmg_type: weaponMaster[i].dmg_type,
      hands: weaponMaster[i].hands,
      max_clip: weaponMaster[i].max_clip,
      name: weaponMaster[i].name,
      price: weaponMaster[i].price,
      range,
      rof: weaponMaster[i].rof,
      weapon_master_id: weaponMaster[i].weapon_master_id,
      is_treasure: weaponMaster[i].is_treasure,
    });
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
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'damage', 'range', 'rof', 'max_clip', 'hands', 'concealable', 'price', 'give'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />
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
                        <Button onClick={() => giveCharacterGear({ type: 'weapon', data: row.weapon_master_id, charID: charDetail.id })}>Give</Button>
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
