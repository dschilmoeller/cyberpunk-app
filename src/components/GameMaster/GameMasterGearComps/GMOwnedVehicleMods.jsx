import * as React from 'react';
import { Button, Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../GeneralAssets/tableFuncs.service';

export default function GMOwnedVehicleMods({ charVehicleMods, deleteCharacterGear }) {
  const euroBuck = `\u20AC$`;
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');
  const sortedCharVehicleModRows = React.useMemo(() => stableSort(charVehicleMods, getComparator(order, orderBy)), [order, orderBy, charVehicleMods]);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'description', 'type', 'price', 'remove'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />
              <TableBody>
                {sortedCharVehicleModRows.map((row) => {
                  if (row.equipped === false) {
                    return (
                      <TableRow hover key={row.char_owned_vehicle_mods_id}>
                        <TableCell padding="normal">{row.name}</TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">{row.type}</TableCell>
                        <TableCell align="center">
                          {euroBuck}
                          {Math.floor(row.price / 4).toLocaleString('en-US')}
                        </TableCell>
                        <TableCell align="center">
                          <Button onClick={() => deleteCharacterGear({ type: 'vehicle_mod', data: row.char_owned_vehicle_mods_id })}>Sell</Button>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}
