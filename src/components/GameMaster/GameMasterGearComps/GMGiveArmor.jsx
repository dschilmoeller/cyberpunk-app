import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from './tableFuncs.service';

// TODO
// Give armor function
// highlight shields differently
export default function GMGiveArmor({ charDetail, armorMaster, setPageAlert, loading, setLoading, chuckError }) {
  const euroBuck = `\u20AC$`;

  const gmGiveArmor = (obj) => {
    console.log(`obj:`, obj);
  };

  const headCells = headCellsGenerator(['name', 'quality', 'description', 'price', 'give']);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedMasterArmorRows = React.useMemo(() => stableSort(armorMaster, getComparator(order, orderBy)), [order, orderBy, armorMaster]);

  return (
    <>
      <h2>Give {charDetail.handle} Armor</h2>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead headCells={headCells} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
              <TableBody>
                {sortedMasterArmorRows.map((row) => {
                  return (
                    <TableRow hover key={row.armor_master_id}>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.quality}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">
                        {euroBuck}
                        {row.price.toLocaleString('en-US')}
                      </TableCell>
                      <TableCell align="left">
                        <Button onClick={() => gmGiveArmor(row)}>Give</Button>
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
