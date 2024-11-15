import React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../GeneralAssets/tableFuncs.service';

export default function GMGiveVehicleMods({ vehicleModMaster, charDetail, giveCharacterGear }) {
  const euroBuck = `\u20AC$`;

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');
  const sortedVehicleModMasterRows = React.useMemo(() => stableSort(vehicleModMaster, getComparator(order, orderBy)), [order, orderBy]);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'description', 'type', 'price', 'give'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />
              <TableBody>
                {sortedVehicleModMasterRows.map((row) => {
                  if (row.type != 'All')
                    return (
                      <TableRow hover key={row.vehicle_mod_master_id}>
                        <TableCell padding="normal">{row.name}</TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">{row.type}</TableCell>
                        <TableCell align="center">
                          {euroBuck}
                          {Math.floor(row.price).toLocaleString('en-US')}
                        </TableCell>
                        <TableCell align="center">
                          <Button onClick={() => giveCharacterGear({ type: 'vehicle_mod', data: row.vehicle_mod_master_id, charID: charDetail.id })}>
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
