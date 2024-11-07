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

export default function GMGiveVehicleMods({ vehicleModMaster, setPageAlert, loading, setLoading, chuckError }) {
  const euroBuck = `\u20AC$`;

  const headCells = headCellsGenerator(['name', 'description', 'type', 'price', 'give']);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedVehicleModMasterRows = React.useMemo(() => stableSort(vehicleModMaster, getComparator(order, orderBy)), [order, orderBy]);

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead headCells={headCells} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
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
                          <Button onClick={() => buyVehicleMod(row)}>Buy</Button>
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
