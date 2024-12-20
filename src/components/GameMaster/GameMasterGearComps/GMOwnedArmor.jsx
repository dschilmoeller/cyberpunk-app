import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Button } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../GeneralAssets/tableFuncs.service';
// TODO
// show character total armor
// show character total shielding
// equip / remove armor & shields.
// handle auto-equipping 'no armor'
export default function GMOwnedArmor({ charDetail, charArmor, deleteCharacterGear }) {
  const euroBuck = `\u20AC$`;

  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('equipped');
  const sortedCharArmorRows = React.useMemo(() => stableSort(charArmor, getComparator(order, orderBy)), [order, orderBy, charArmor]);

  return (
    <>
      <h2>{charDetail.handle} - Armor</h2>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'quality', 'description', 'price', 'equipped', 'remove'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />
              <TableBody>
                {sortedCharArmorRows.map((row) => {
                  return (
                    <TableRow hover key={row.armor_bridge_id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="center">{row.quality}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">
                        {euroBuck}
                        {Math.floor(row.price / 4).toLocaleString('en-US')}
                      </TableCell>
                      <TableCell align="center">{row.equipped ? 'Y' : 'N'}</TableCell>
                      <TableCell align="center">
                        <Button
                          disabled={row.name === 'No Armor' || row.equipped === true}
                          onClick={() => deleteCharacterGear({ type: 'armor', data: row.armor_bridge_id })}
                        >
                          Remove
                        </Button>
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
