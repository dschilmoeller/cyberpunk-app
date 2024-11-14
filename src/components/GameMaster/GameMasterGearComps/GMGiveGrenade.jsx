import React from 'react';
import WeaponDialog from '../../Modals/WeaponDialog';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../GeneralAssets/tableFuncs.service';

export default function GMGiveGrenade({ charDetail, grenadeMaster, giveCharacterGear }) {
  const euroBuck = `\u20AC$`;

  const headCells = headCellsGenerator(['name', 'description', 'range', 'price', 'purchase']);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // sort and monitor changes.
  const sortedGrenadeMasterRows = React.useMemo(() => stableSort(grenadeMaster, getComparator(order, orderBy)), [order, orderBy, grenadeMaster]);

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
                      <TableCell align="center">{(charDetail.strength + charDetail.cyber_strength) * 5}</TableCell>
                      <TableCell align="center">
                        {euroBuck}
                        {row.price.toLocaleString('en-US')}
                      </TableCell>
                      <TableCell align="center">
                        <Button onClick={() => giveCharacterGear({ type: 'grenade', data: row.grenade_master_id, charID: charDetail.id })}>
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
