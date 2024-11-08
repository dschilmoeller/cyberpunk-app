import * as React from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Button, Grid, Tabs, Tab } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from './tableFuncs.service';

import GMOwnedVehicleMods from './GMOwnedVehicleMods';

// TODO
// Equip vehicle mods to vehicles
export default function GMOwnedVehicles({ charDetail, charVehicles, charVehicleMods, deleteCharacterGear }) {
  const euroBuck = `\u20AC$`;

  const headCells = headCellsGenerator(['name', 'description', 'health', 'seats', 'move', 'mph', 'type', 'price', 'remove']);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedCharVehicleRows = React.useMemo(() => stableSort(charVehicles, getComparator(order, orderBy)), [order, orderBy]);

  // handle selection between vehicles and mods
  const [selectedShopping, setSelectedShopping] = React.useState('vehicles');
  const handleShoppingSelect = (event, newValue) => {
    setSelectedShopping(newValue);
  };

  return (
    <>
      <Grid item xs={12}>
        <h2>{charDetail.handle}&apos;s Vehicles</h2>
      </Grid>

      <Tabs value={selectedShopping} onChange={handleShoppingSelect} indicatorColor="primary" textColor="secondary">
        <Tab value="vehicles" label="Vehicles" />
        <Tab value="mods" label="Vehicle Mods" />
      </Tabs>

      {selectedShopping === 'vehicles' ? (
        <>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
                  <EnhancedTableHead headCells={headCells} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
                  <TableBody>
                    {sortedCharVehicleRows.map((row) => {
                      return (
                        <TableRow hover key={row.vehicle_bridge_id}>
                          <TableCell padding="normal">{row.name}</TableCell>
                          <TableCell align="center">{row.description}</TableCell>
                          <TableCell align="center">{row.health}</TableCell>
                          <TableCell align="center">{row.seats}</TableCell>
                          <TableCell align="center">{row.move}</TableCell>
                          <TableCell align="center">{row.mph}</TableCell>
                          <TableCell align="center">{row.type}</TableCell>
                          <TableCell align="center">
                            {euroBuck}
                            {Math.floor(row.price / 4 + row.total_mod_cost).toLocaleString('en-US')}
                          </TableCell>
                          <TableCell align="center">
                            <Button onClick={() => deleteCharacterGear({ type: 'vehicle', data: row.vehicle_bridge_id })}>Remove</Button>
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
      ) : (
        <></>
      )}

      {selectedShopping === 'mods' ? <GMOwnedVehicleMods charVehicleMods={charVehicleMods} deleteCharacterGear={deleteCharacterGear} /> : <></>}
    </>
  );
}
