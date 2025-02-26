import React from 'react';
import { Box, Paper, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material/';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../../GeneralAssets/tableFuncs.service';
import { charChangeBankRequest, charPurchaseGearRequest } from '../../../../services/shopping.services';
import { moneyMaker } from '../../../../utils/funcs/funcs';
export default function OtherMasterTable({ masterMiscGear, charGear, setCharGear, charDetail, setCharDetail, setPageAlert, loading, setLoading }) {
  const buyMiscGear = async (item) => {
    setLoading(true);
    if (charDetail.bank >= item.price) {
      const bankObj = {
        charID: charDetail.id,
        newBank: Number(charDetail.bank - item.price),
      };
      const gearObj = {
        type: 'Misc',
        charID: charDetail.id,
        gearID: item.misc_gear_master_id,
      };

      try {
        let bankResult = await charChangeBankRequest(bankObj);
        let shopResult = await charPurchaseGearRequest(gearObj);
        if (bankResult === 'OK' && shopResult.char_gear_bridge_id) {
          setCharGear({ ...charGear, misc: [...charGear.misc, shopResult] });
          setCharDetail({ ...charDetail, bank: bankObj.newBank });
          setPageAlert({ open: true, message: 'Item purchased!', severity: 'success' });
        } else {
          setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
        }
      } catch (error) {
        console.error('Error purchasing gear:', error);
        setPageAlert({ open: true, message: 'Something is awry', severity: 'info' });
      }
    } else {
      setPageAlert({ open: true, message: 'Insufficient Funds', severity: 'error' });
    }
    setLoading(false);
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const sortedOtherMasterRows = React.useMemo(() => stableSort(masterMiscGear, getComparator(order, orderBy)), [order, orderBy, masterMiscGear]);

  return (
    <>
      <h2>Buy Other</h2>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'description', 'price', 'buy'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />
              <TableBody>
                {sortedOtherMasterRows.map((row) => {
                  return (
                    <TableRow hover key={row.name}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center">{moneyMaker(row.price)}</TableCell>
                      <TableCell align="center">
                        <Button variant={loading === false ? 'contained' : 'disabled'} color="success" onClick={() => buyMiscGear(row)}>
                          Buy
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
