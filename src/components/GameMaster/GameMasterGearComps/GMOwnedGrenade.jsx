import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Button } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../GeneralAssets/tableFuncs.service';

import WeaponDialog from '../../Modals/WeaponDialog';
export default function GMOwnedGrenade({ charDetail, charGrenades, deleteCharacterGear }) {
  const euroBuck = `\u20AC$`;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');
  const sortedCharGrenadeRows = React.useMemo(() => stableSort(charGrenades, getComparator(order, orderBy)), [order, orderBy]);

  return (
    <>
      <h2>{charDetail.handle}&apos; Grenades</h2>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'description', 'range', 'price', 'remove'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />
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
