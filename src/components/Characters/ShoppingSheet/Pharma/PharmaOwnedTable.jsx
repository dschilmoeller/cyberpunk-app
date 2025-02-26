import React from 'react';
import { Box, Paper, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material/';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../../GeneralAssets/tableFuncs.service';
import { charChangeBankRequest, charSellGearRequest, charChangeGearQtyRequest } from '../../../../services/shopping.services';
import { moneyMaker } from '../../../../utils/funcs/funcs';
export default function PharmaOwnedTable({ charGear, setCharGear, charDetail, setCharDetail, setPageAlert, loading, setLoading }) {
  const sellOwnedGear = async (item) => {
    setLoading(true);
    let newBank = Number(charDetail.bank + Math.floor(item.price / 4));
    const bankObj = {
      charID: charDetail.id,
      newBank: newBank,
    };
    const itemObj = {
      type: 'Pharma',
      gearID: item.char_pharma_bridge_id,
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
            pharma: charGear.pharma.map((e) => (e.char_pharma_bridge_id === item.char_pharma_bridge_id ? { ...e, qty_owned: e.qty_owned - 1 } : e)),
          });
          setPageAlert({ open: true, message: 'Pharma Sold!', severity: 'success' });
        }
      } else {
        // Selling last - deletes row in bridge table
        const sellResult = await charSellGearRequest(itemObj);
        if (bankResult === 'OK' && sellResult === 'OK') {
          setCharGear({ ...charGear, pharma: charGear.pharma.filter((e) => e.char_pharma_bridge_id != item.char_pharma_bridge_id) });
          setCharDetail({ ...charDetail, bank: newBank });
          setPageAlert({ open: true, message: 'Pharma Sold!', severity: 'success' });
        } else {
          setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
        }
      }
    } catch (error) {
      console.error('Error selling pharma:', error);
      setPageAlert({ open: true, message: 'Error selling pharma!', severity: 'error' });
    }
    setLoading(false);
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  const sortedCharOtherRows = React.useMemo(() => stableSort(charGear.pharma, getComparator(order, orderBy)), [order, orderBy, charGear.pharma]);

  return (
    <>
      <h2>My Pharmaceuticals</h2>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'description', 'qty_owned', 'price', 'sell'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />
              <TableBody>
                {sortedCharOtherRows.map((row) => {
                  return (
                    <TableRow hover key={row.char_pharma_bridge_id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">{row.qty_owned}</TableCell>
                      <TableCell align="center">{moneyMaker(Math.floor(row.price / 4))}</TableCell>
                      <TableCell align="center">
                        <Button variant={loading === false ? 'contained' : 'disabled'} color="error" onClick={() => sellOwnedGear(row)}>
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
