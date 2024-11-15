import React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Button } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../GeneralAssets/tableFuncs.service';

export default function GMOtherOwned({ charDetail, charMiscGear, deleteCharacterGear }) {
  const euroBuck = `\u20AC$`;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const sortedCharOtherRows = React.useMemo(() => stableSort(charMiscGear, getComparator(order, orderBy)), [order, orderBy, charMiscGear]);

  return (
    <>
      <h2>{charDetail.handle}&apos;s Misc Gear</h2>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'description', 'price', 'remove'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />
              <TableBody>
                {sortedCharOtherRows.map((row) => {
                  return (
                    <TableRow hover key={row.char_gear_bridge_id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">
                        {euroBuck}
                        {Math.floor(row.price / 4).toLocaleString('en-US')}
                      </TableCell>
                      <TableCell align="center">
                        <Button onClick={() => deleteCharacterGear({ type: 'misc', data: row.char_gear_bridge_id })}>Remove</Button>
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
