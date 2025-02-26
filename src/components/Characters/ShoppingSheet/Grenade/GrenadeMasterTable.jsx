import React from 'react';
import { Box, Paper, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material/';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../../GeneralAssets/tableFuncs.service';
import { charChangeBankRequest, charPurchaseGearRequest, charChangeGearQtyRequest } from '../../../../services/shopping.services';
import WeaponDialog from '../../../Modals/WeaponDialog';
import { moneyMaker } from '../../../../utils/funcs/funcs';
export default function GrenadeMasterTable({ masterGrenades, charGear, setCharGear, charDetail, setCharDetail, setPageAlert, loading, setLoading }) {
  const buyGrenade = async (item) => {
    setLoading(true);
    const bankObj = {
      charID: charDetail.id,
      newBank: Number(charDetail.bank - item.price),
    };
    if (charDetail.bank >= item.price && charGear.grenades.filter((e) => e.grenade_master_id === item.grenade_master_id).length > 0) {
      // grenade is owned, increase qty_owned by 1
      const ownedGrenade = charGear.grenades.filter((e) => e.grenade_master_id === item.grenade_master_id)[0];
      const gearObj = {
        type: 'Grenade',
        gearID: ownedGrenade.grenade_bridge_id,
        qty_owned: ownedGrenade.qty_owned + 1,
      };
      let bankResult = await charChangeBankRequest(bankObj);
      let shopResult = await charChangeGearQtyRequest(gearObj);
      if (bankResult === 'OK' && shopResult === 'OK') {
        setCharGear({
          ...charGear,
          grenades: charGear.grenades.map((e) => (e.grenade_bridge_id === ownedGrenade.grenade_bridge_id ? { ...e, qty_owned: e.qty_owned + 1 } : e)),
        });
        setCharDetail({ ...charDetail, bank: bankObj.newBank });
        setPageAlert({ open: true, message: 'Item purchased!', severity: 'success' });
      } else {
        setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
      }
    } else if (charDetail.bank >= item.price && charGear.grenades.filter((e) => e.grenade_master_id === item.grenade_master_id).length <= 0) {
      // grenade not owned, insert row.
      const gearObj = {
        type: 'Grenade',
        charID: charDetail.id,
        gearID: item.grenade_master_id,
      };
      let bankResult = await charChangeBankRequest(bankObj);
      let shopResult = await charPurchaseGearRequest(gearObj);
      if (bankResult === 'OK' && shopResult.grenade_bridge_id) {
        setCharGear({ ...charGear, grenades: [...charGear.grenades, shopResult] });
        setCharDetail({ ...charDetail, bank: bankObj.newBank });
        setPageAlert({ open: true, message: 'Item purchased!', severity: 'success' });
      } else {
        setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
      }
    } else {
      setPageAlert({ open: true, message: 'Insufficient Funds!', severity: 'error' });
    }
    setLoading(false);
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

  const sortedGrenadeMasterRows = React.useMemo(() => stableSort(masterGrenades, getComparator(order, orderBy)), [order, orderBy, masterGrenades]);

  return (
    <>
      <h2>Buy Grenades</h2>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'description', 'range', 'price', 'buy'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />
              <TableBody>
                {sortedGrenadeMasterRows.map((row) => {
                  if (row.is_treasure === false) {
                    return (
                      <TableRow hover key={row.name}>
                        <TableCell align="left">
                          <WeaponDialog prop={row.name} />
                        </TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">{(charDetail.strength + charDetail.cyber_strength) * 5} meters</TableCell>
                        <TableCell align="center">{moneyMaker(row.price)}</TableCell>
                        <TableCell align="center">
                          <Button variant={loading === false ? 'contained' : 'disabled'} color="success" onClick={() => buyGrenade(row)}>
                            Buy
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </>
  );
}
