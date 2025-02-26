import React from 'react';
import { Box, Paper, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material/';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../../GeneralAssets/tableFuncs.service';
import { charChangeBankRequest, charSellGearRequest } from '../../../../services/shopping.services';
import { moneyMaker } from '../../../../utils/funcs/funcs';

export default function OtherOwnedTable({ charGear, setCharGear, charDetail, setCharDetail, setPageAlert, loading, setLoading }) {
  const sellOwnedGear = async (item) => {
    setLoading(true);
    let newBank = Number(charDetail.bank + Math.floor(item.price / 4));
    const bankObj = {
      charID: charDetail.id,
      newBank: newBank,
    };
    const itemObj = {
      type: 'Misc',
      gearID: item.char_gear_bridge_id,
    };
    try {
      let bankResult = await charChangeBankRequest(bankObj);
      let sellResult = await charSellGearRequest(itemObj);
      if (bankResult === 'OK' && sellResult === 'OK') {
        setCharGear({ ...charGear, misc: charGear.misc.filter((e) => e.char_gear_bridge_id != item.char_gear_bridge_id) });
        setCharDetail({ ...charDetail, bank: newBank });
        setPageAlert({ open: true, message: 'Gear Sold!', severity: 'success' });
      } else {
        setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
      }
    } catch (error) {
      console.error('Error selling gear:', error);
      setPageAlert({ open: true, message: 'Error selling gear!', severity: 'error' });
    }
    setLoading(false);
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const sortedCharOtherRows = React.useMemo(() => stableSort(charGear.misc, getComparator(order, orderBy)), [order, orderBy, charGear.misc]);

  return (
    <>
      <h2>My Other</h2>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'description', 'price', 'sell'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />
              <TableBody>
                {sortedCharOtherRows.map((row) => {
                  return (
                    <TableRow hover key={row.char_gear_bridge_id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
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
