import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from './tableFuncs.service';

import WeaponDialog from '../../Modals/WeaponDialog';

// TODO
// remove grenades from inventory.
// Quantity?
export default function GMOwnedGrenade({ charDetail, charGrenades, deleteCharacterGear }) {
  const euroBuck = `\u20AC$`;

  const headCells = headCellsGenerator(['name', 'description', 'range', 'price', 'remove']);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // sort and monitor changes to charWeaponRows in case of sales.
  const sortedCharGrenadeRows = React.useMemo(() => stableSort(charGrenades, getComparator(order, orderBy)), [order, orderBy]);

  return (
    <>
      <h2>My Grenades</h2>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead headCells={headCells} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
              <TableBody>
                {sortedCharGrenadeRows.map((row) => {
                  return (
                    <TableRow hover key={row.grenade_bridge_id}>
                      <TableCell>
                        <WeaponDialog prop={row.name} />
                      </TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">{5 * (charDetail.strength + charDetail.cyber_strength)}</TableCell>
                      <TableCell align="center">
                        {euroBuck}
                        {Math.floor(row.price / 4).toLocaleString('en-US')}
                      </TableCell>
                      <TableCell align="center">
                        <Button onClick={() => deleteCharacterGear({ type: 'grenade', data: row.grenade_bridge_id })}>Remove</Button>
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
