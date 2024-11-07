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

import WeaponDialog from '../../Modals/WeaponDialog';

// TODO
// Give grenade Function
// styling?
export default function GMGiveGrenade({ charDetail, grenadeMaster, setPageAlert, loading, setLoading, chuckError }) {
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
      id: 'range',
      numeric: true,
      disablePadding: false,
      label: 'Range',
    },
    {
      id: 'price',
      numeric: true,
      disablePadding: false,
      label: 'Price',
    },
    {
      id: 'purchase',
      numeric: false,
      disablePadding: false,
      label: 'Purchase',
    },
  ];

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // create master data

  function createMasterGrenadeData(description, grenade_master_id, is_treasure, name, price) {
    return {
      description,
      grenade_master_id,
      is_treasure,
      name,
      price,
    };
  }

  // take master data and push into array for conversion into rows.
  const grenadeMasterRows = [];
  for (let i = 0; i < grenadeMaster.length; i++) {
    grenadeMasterRows.push(
      createMasterGrenadeData(
        grenadeMaster[i].description,
        grenadeMaster[i].grenade_master_id,
        grenadeMaster[i].is_treasure,
        grenadeMaster[i].name,
        grenadeMaster[i].price
      )
    );
  }

  // sort and monitor changes.
  const sortedGrenadeMasterRows = React.useMemo(() => stableSort(grenadeMasterRows, getComparator(order, orderBy)), [order, orderBy, grenadeMaster]);

  return (
    <>
      <h2>Give {charDetail.handle} Grenades</h2>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead headCells={headCells} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
              <TableBody>
                {sortedGrenadeMasterRows.map((row) => {
                  return (
                    <TableRow hover key={row.name}>
                      <TableCell>
                        <WeaponDialog prop={row.name} />
                      </TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">Strength * 5 Meters</TableCell>
                      <TableCell align="center">
                        {euroBuck}
                        {row.price.toLocaleString('en-US')}
                      </TableCell>
                      <TableCell align="center">
                        <Button onClick={() => buyGrenade(row)}>Give</Button>
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
