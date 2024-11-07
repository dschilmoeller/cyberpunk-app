import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Button } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead } from './tableFuncs.service';

export default function GMGiveGearOther({ charDetail, gearMaster, setPageAlert, loading, setLoading, chuckError }) {
  const euroBuck = `\u20AC$`;

  const headCells = [
    {
      id: 'name',
      numeric: false,
      disablePadding: true,
      label: 'Name',
    },
    {
      id: 'description',
      numeric: true,
      disablePadding: false,
      label: 'Description',
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'Price',
    },
    {
      id: 'give',
      numeric: false,
      disablePadding: false,
      label: 'Give',
    },
  ];

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // create OtherGear Data

  function createOtherMasterData(description, misc_gear_master_id, name, price) {
    return {
      description,
      misc_gear_master_id,
      name,
      price,
    };
  }

  // take misc gear data and push into array for conversion into rows.
  const otherMasterRows = [];
  for (let i = 0; i < gearMaster.length; i++) {
    otherMasterRows.push(
      createOtherMasterData(gearMaster[i].description, gearMaster[i].misc_gear_master_id, gearMaster[i].name, gearMaster[i].price)
    );
  }

  // sort and monitor changes.
  const sortedOtherMasterRows = React.useMemo(() => stableSort(otherMasterRows, getComparator(order, orderBy)), [order, orderBy]);

  return (
    <>
      <h2>Give {charDetail.handle} Other Gear</h2>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead headCells={headCells} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
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
                        <Button onClick={() => buyMiscGear(row)}>Give</Button>
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
