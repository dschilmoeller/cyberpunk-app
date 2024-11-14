import React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Tabs, Tab } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../GeneralAssets/tableFuncs.service';

import GMGiveVehicleMods from './GMGiveVehicleMods';

export default function GMGiveVehicles({ charDetail, vehicleMaster, vehicleModMaster, giveCharacterGear }) {
  const euroBuck = `\u20AC$`;

  const headCells = headCellsGenerator(['name', 'description', 'health', 'seats', 'move', 'mph', 'type', 'price', 'give']);

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // sort and monitor changes to charvehiclerows in case of sales.
  const sortedVehicleMasterRows = React.useMemo(() => stableSort(vehicleMaster, getComparator(order, orderBy)), [order, orderBy]);

  // handle selection between vehicles and mods
  const [selectedShopping, setSelectedShopping] = React.useState('vehicles');
  const handleShoppingSelect = (event, newValue) => {
    setSelectedShopping(newValue);
  };

  return (
    <>
      <h2>Give {charDetail.handle} Vehicles & Mods</h2>
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
                    {sortedVehicleMasterRows.map((row) => {
                      return (
                        <TableRow hover key={row.vehicle_master_id}>
                          <TableCell padding="normal">{row.name}</TableCell>
                          <TableCell align="center">{row.description}</TableCell>
                          <TableCell align="center">{row.health}</TableCell>
                          <TableCell align="center">{row.seats}</TableCell>
                          <TableCell align="center">{row.move}</TableCell>
                          <TableCell align="center">{row.mph}</TableCell>
                          <TableCell align="center">{row.type}</TableCell>
                          <TableCell align="center">
                            {euroBuck}
                            {Math.floor(row.price).toLocaleString('en-US')}
                          </TableCell>
                          <TableCell align="center">
                            <Button onClick={() => giveCharacterGear({ type: 'vehicle', data: row.vehicle_master_id, charID: charDetail.id })}>
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
      ) : (
        <></>
      )}

      {selectedShopping === 'mods' ? (
        <GMGiveVehicleMods vehicleModMaster={vehicleModMaster} charDetail={charDetail} giveCharacterGear={giveCharacterGear} />
      ) : (
        <></>
      )}
    </>
  );
}
