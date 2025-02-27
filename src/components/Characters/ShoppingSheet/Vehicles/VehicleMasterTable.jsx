import React from 'react';
import { Box, Paper, Button, Table, TableBody, TableCell, TableContainer, TableRow, Tabs, Tab } from '@mui/material/';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../../GeneralAssets/tableFuncs.service';
import { charChangeBankRequest, charChangeNomadVehicleSlotsRequest, charPurchaseGearRequest } from '../../../../services/shopping.services';
import { moneyMaker } from '../../../../utils/funcs/funcs';
import ModVehicleMasterTable from './ModVehicleMasterTable';

// need to pull Nomad Vehicles available, state for using Nomad Vehicle Slot needs to be up one level and passed down here.
export default function VehicleMasterTable({
  useNomadFreebie,
  setUseNomadFreebie,
  masterVehicles,
  charGear,
  setCharGear,
  charDetail,
  setCharDetail,
  setPageAlert,
  loading,
  setLoading,
}) {
  const [nomadDiscount, setNomadDiscount] = React.useState(0);

  const calculateNomadDiscount = () => {
    if (charDetail.nomad > 0 && charDetail.nomad < 5) {
      setNomadDiscount(charDetail.nomad * 10000);
    } else if (charDetail.nomad > 4 && charDetail.nomad < 7) {
      setNomadDiscount(charDetail.nomad * 15000);
    } else if (charDetail.nomad > 6 && charDetail.nomad < 10) {
      setNomadDiscount(charDetail.nomad * 20000);
    } else {
      setNomadDiscount(charDetail.nomad * 40000);
    }
  };

  React.useEffect(() => {
    calculateNomadDiscount();
  }, [charDetail]);

  const buyVehicle = async (item) => {
    setLoading(true);
    const bankObj = {
      charID: charDetail.id,
      newBank: Number(charDetail.bank - item.price),
    };
    const gearObj = {
      type: 'Vehicle',
      charID: charDetail.id,
      gearID: item.vehicle_master_id,
    };
    if (charDetail.bank >= item.price && useNomadFreebie === false) {
      try {
        let bankResult = await charChangeBankRequest(bankObj);
        let shopResult = await charPurchaseGearRequest(gearObj);
        if (bankResult === 'OK' && shopResult.vehicle_bridge_id) {
          setCharGear({ ...charGear, vehicles: [...charGear.vehicles, shopResult] });
          setCharDetail({ ...charDetail, bank: bankObj.newBank });
          setPageAlert({ open: true, message: 'Item purchased!', severity: 'success' });
        } else {
          setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
        }
      } catch (error) {
        console.error('Error buying vehicle:', error);
      }
    } else if (useNomadFreebie === true) {
      try {
        let charObj = {
          charID: charDetail.id,
          newSlotCount: charDetail.nomad_vehicle_slots - 1,
        };
        let charResult = await charChangeNomadVehicleSlotsRequest(charObj);
        let shopResult = await charPurchaseGearRequest(gearObj);
        if (charResult === 'OK' && shopResult.vehicle_bridge_id) {
          setCharGear({ ...charGear, vehicles: [...charGear.vehicles, shopResult] });
          setCharDetail({ ...charDetail, nomad_vehicle_slots: charDetail.nomad_vehicle_slots - 1 });
          setPageAlert({ open: true, message: 'Item purchased!', severity: 'success' });
          setUseNomadFreebie(false);
        } else {
          setPageAlert({ open: true, message: 'Something is awry w/ freebie', severity: 'info' });
        }
      } catch (error) {
        console.error('Error acquiring nomad vehicle:', error);
      }
    } else {
      setPageAlert({ open: true, message: 'Insufficient Funds!', severity: 'error' });
    }
    setLoading(false);
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

  const sortedVehicleMasterRows = React.useMemo(() => stableSort(masterVehicles, getComparator(order, orderBy)), [order, orderBy, masterVehicles]);

  // handle selection between vehicles and mods
  const [selectedShopping, setSelectedShopping] = React.useState('vehicles');
  const handleShoppingSelect = (event, newValue) => {
    setSelectedShopping(newValue);
  };

  return (
    <>
      <Tabs value={selectedShopping} onChange={handleShoppingSelect} indicatorColor="primary" textColor="secondary">
        <Tab value="vehicles" label="Vehicles" />
        <Tab value="mods" label="Vehicle Mods" />
      </Tabs>

      {selectedShopping === 'vehicles' ? (
        <>
          <h2>Buy Vehicle</h2>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
                  <EnhancedTableHead
                    headCells={headCellsGenerator(['name', 'description', 'health', 'seats', 'move', 'mph', 'type', 'price', 'buy'])}
                    order={order}
                    orderBy={orderBy}
                    setOrder={setOrder}
                    setOrderBy={setOrderBy}
                  />
                  <TableBody>
                    {useNomadFreebie === true ? (
                      <>
                        {sortedVehicleMasterRows.map((row) => {
                          if (useNomadFreebie === true && row.price <= nomadDiscount) {
                            return (
                              <TableRow hover key={row.vehicle_master_id}>
                                <TableCell padding="normal">{row.name}</TableCell>
                                <TableCell align="center">{row.description}</TableCell>
                                <TableCell align="center">{row.health}</TableCell>
                                <TableCell align="center">{row.seats}</TableCell>
                                <TableCell align="center">{row.move}</TableCell>
                                <TableCell align="center">{row.mph}</TableCell>
                                <TableCell align="center">{row.type}</TableCell>
                                <TableCell align="center">{moneyMaker(0)}</TableCell>
                                <TableCell align="center">
                                  <Button variant={loading === false ? 'contained' : 'disabled'} color="success" onClick={() => buyVehicle(row)}>
                                    Buy
                                  </Button>
                                </TableCell>
                              </TableRow>
                            );
                          } else {
                            return <React.Fragment key={row.vehicle_master_id}></React.Fragment>;
                          }
                        })}
                      </>
                    ) : (
                      <></>
                    )}

                    {useNomadFreebie === false ? (
                      <>
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
                              <TableCell align="center">{moneyMaker(Math.floor(row.price))}</TableCell>
                              <TableCell align="center">
                                <Button variant={loading === false ? 'contained' : 'disabled'} color="success" onClick={() => buyVehicle(row)}>
                                  Buy
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </>
                    ) : (
                      <></>
                    )}
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
        <ModVehicleMasterTable
          masterVehicles={masterVehicles}
          charGear={charGear}
          setCharGear={setCharGear}
          charDetail={charDetail}
          setCharDetail={setCharDetail}
          setPageAlert={setPageAlert}
          loading={loading}
          setLoading={setLoading}
        />
      ) : (
        <></>
      )}
    </>
  );
}
