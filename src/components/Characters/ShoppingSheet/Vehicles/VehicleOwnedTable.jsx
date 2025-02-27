import * as React from 'react';
import { Box, Grid, Switch, Paper, Button, Table, TableBody, TableCell, TableContainer, TableRow, Tabs, Tab } from '@mui/material/';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../../GeneralAssets/tableFuncs.service';
import { charChangeBankRequest, charSellGearRequest } from '../../../../services/shopping.services';
import { moneyMaker } from '../../../../utils/funcs/funcs';
import ModVehicleOwnedTable from './ModVehicleOwnedTable';

export default function VehicleOwnedTable({
  useNomadFreebie,
  setUseNomadFreebie,
  charGear,
  setCharGear,
  charDetail,
  setCharDetail,
  setPageAlert,
  loading,
  setLoading,
}) {
  const sellOwnedVehicle = async (item) => {
    setLoading(true);
    const bankObj = {
      charID: charDetail.id,
      newBank: Number(charDetail.bank + Math.floor(item.price + item.total_mod_cost / 4)),
    };
    const itemObj = {
      type: 'Vehicle',
      gearID: item.vehicle_bridge_id,
    };
    try {
      let bankResult = await charChangeBankRequest(bankObj);
      let sellResult = await charSellGearRequest(itemObj);
      if (bankResult === 'OK' && sellResult === 'OK') {
        setCharGear({ ...charGear, vehicles: charGear.vehicles.filter((e) => e.vehicle_bridge_id != item.vehicle_bridge_id) });
        setCharDetail({ ...charDetail, bank: Number(charDetail.bank + Math.floor(item.price + item.total_mod_cost / 4)) });
        setPageAlert({ open: true, message: 'Vehicle Sold!', severity: 'success' });
      } else {
        setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
      }
    } catch (error) {
      console.error('Error Selling Vehicle:', error);
      setPageAlert({ open: true, message: 'Error Selling Vehicle!', severity: 'error' });
    }

    setLoading(false);
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

  const sortedCharVehicleRows = React.useMemo(
    () => stableSort(charGear.vehicles, getComparator(order, orderBy)),
    [order, orderBy, charGear.vehicles]
  );

  const handleNomadSelection = () => {
    setUseNomadFreebie(!useNomadFreebie);
  };

  // handle selection between vehicles and mods
  const [selectedShopping, setSelectedShopping] = React.useState('vehicles');
  const handleShoppingSelect = (event, newValue) => {
    setSelectedShopping(newValue);
  };

  return (
    <>
      {charDetail.nomad > 0 ? (
        <Grid container display={'flex'} justifyContent={'center'} alignItems={'center'}>
          <Grid item xs={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <h2>Nomad Vehicles Available: {charDetail.nomad_vehicle_slots}</h2>
          </Grid>
          {charDetail.nomad_vehicle_slots ? (
            <Grid item xs={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <h2>Acquire Nomad Vehicle</h2>
              <Switch checked={useNomadFreebie} onChange={handleNomadSelection} inputProps={{ 'aria-label': 'controlled' }} />
            </Grid>
          ) : (
            <Grid item xs={6} display={'flex'} justifyContent={'center'} alignItems={'center'}>
              <h2>No Nomad Vehicles Available.</h2>
            </Grid>
          )}
        </Grid>
      ) : (
        <></>
      )}
      <Grid item xs={12}>
        <h2>My Vehicles</h2>
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
                  <EnhancedTableHead
                    headCells={headCellsGenerator(['name', 'description', 'health', 'seats', 'move', 'mph', 'type', 'price', 'sell'])}
                    order={order}
                    orderBy={orderBy}
                    setOrder={setOrder}
                    setOrderBy={setOrderBy}
                  />
                  <TableBody>
                    {sortedCharVehicleRows.map((row) => {
                      return (
                        <TableRow hover key={row.vehicle_bridge_id}>
                          <TableCell padding="normal">{row.name}</TableCell>
                          <TableCell align="center">{row.description}</TableCell>
                          <TableCell align="center">{row.health}</TableCell>
                          <TableCell align="center">{row.seats + row.extra_seats}</TableCell>
                          <TableCell align="center">{row.move}</TableCell>
                          <TableCell align="center">{row.mph}</TableCell>
                          <TableCell align="center">{row.type}</TableCell>
                          <TableCell align="center">{moneyMaker(Math.floor((row.price + row.total_mod_cost) / 4))}</TableCell>
                          <TableCell align="center">
                            <Button variant={loading === false ? 'contained' : 'disabled'} color="error" onClick={() => sellOwnedVehicle(row)}>
                              Sell
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

      {selectedShopping === 'mods' ? <ModVehicleOwnedTable /> : <></>}
    </>
  );
}
