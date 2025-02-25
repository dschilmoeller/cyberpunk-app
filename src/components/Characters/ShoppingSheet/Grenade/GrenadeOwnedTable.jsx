import React from 'react';
import { Box, Paper, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material/';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../../GeneralAssets/tableFuncs.service';
import { charChangeBankRequest, charSellGearRequest, charChangeGearQtyRequest } from '../../../../services/shopping.services';
import WeaponDialog from '../../../Modals/WeaponDialog';

export default function GrenadeOwnedTable({ charGear, setCharGear, charDetail, setCharDetail, setPageAlert, loading, setLoading, chuckError }) {
  const euroBuck = `\u20AC$`;

  const sellGrenade = async (item) => {
    // need to deal with altering quantity on grenade table - two cases?
    setLoading(true);
    let newBank = Number(charDetail.bank + Math.floor(item.price / 4));
    const bankObj = {
      charID: charDetail.id,
      newBank: newBank,
    };
    const itemObj = {
      type: 'Grenade',
      gearID: item.grenade_bridge_id,
      qty_owned: item.qty_owned - 1,
    };
    try {
      let bankResult = await charChangeBankRequest(bankObj);
      if (item.qty_owned > 1) {
        // reducing current qty owned by 1
        const sellResult = await charChangeGearQtyRequest(itemObj);
        if (bankResult === 'OK' && sellResult === 'OK') {
          setCharGear({
            ...charGear,
            grenades: charGear.grenades.map((e) => (e.grenade_bridge_id === item.grenade_bridge_id ? { ...e, qty_owned: e.qty_owned - 1 } : e)),
          });
          console.log(`grenades:`, charGear);
          setPageAlert({ open: true, message: 'Grenade Sold!', severity: 'success' });
        }
      } else {
        // Selling last - deletes row in bridge table
        const sellResult = await charSellGearRequest(itemObj);
        if (bankResult === 'OK' && sellResult === 'OK') {
          setCharGear({ ...charGear, grenades: charGear.grenades.filter((e) => e.grenade_bridge_id != item.grenade_bridge_id) });
          setCharDetail({ ...charDetail, bank: newBank });
          setPageAlert({ open: true, message: 'Weapon Sold!', severity: 'success' });
        } else {
          chuckError();
        }
      }
    } catch (error) {
      console.error('Error selling grenade:', error);
      setPageAlert({ open: true, message: 'Error selling grenade!', severity: 'error' });
    }
    setLoading(false);
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

  const sortedCharGrenadeRows = React.useMemo(
    () => stableSort(charGear.grenades, getComparator(order, orderBy)),
    [order, orderBy, charGear.grenades]
  );

  return (
    <>
      <h2>My Grenades</h2>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'description', 'range', 'qty_owned', 'price', 'sell'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />
              <TableBody>
                {sortedCharGrenadeRows.map((row) => {
                  return (
                    <TableRow hover key={row.grenade_bridge_id}>
                      <TableCell>
                        <WeaponDialog prop={row.name} />
                      </TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">{5 * (charDetail.strength + charDetail.cyber_strength)} meters</TableCell>
                      <TableCell align="center">{row.qty_owned}</TableCell>
                      <TableCell align="center">
                        {euroBuck}
                        {Math.floor(row.price / 4).toLocaleString('en-US')}
                      </TableCell>
                      <TableCell align="center">
                        <Button variant={loading === false ? 'contained' : 'disabled'} color="error" onClick={() => sellGrenade(row)}>
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
  );
}
