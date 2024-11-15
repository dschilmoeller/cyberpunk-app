import React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../GeneralAssets/tableFuncs.service';

export default function GMGiveGearOther({ charDetail, gearMaster, giveCharacterGear }) {
  const euroBuck = `\u20AC$`;

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const sortedOtherMasterRows = React.useMemo(() => stableSort(gearMaster, getComparator(order, orderBy)), [order, orderBy]);

  return (
    <>
      <h2>Give {charDetail.handle} Other Gear</h2>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'description', 'price', 'give'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />
              <TableBody>
                {sortedOtherMasterRows.map((row) => {
                  return (
                    <TableRow hover key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">
                        {euroBuck}
                        {row.price.toLocaleString('en-US')}
                      </TableCell>
                      <TableCell align="center">
                        <Button onClick={() => giveCharacterGear({ type: 'misc', data: row.misc_gear_master_id, charID: charDetail.id })}>
                          Give
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
