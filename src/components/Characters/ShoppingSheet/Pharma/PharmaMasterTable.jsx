import React from 'react';
import { Box, Paper, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material/';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../../GeneralAssets/tableFuncs.service';
import { charChangeBankRequest, charPurchaseGearRequest, charChangeGearQtyRequest } from '../../../../services/shopping.services';
import { moneyMaker } from '../../../../utils/funcs/funcs';

export default function PharmaMasterTable({
  masterPharma,
  charGear,
  setCharGear,
  charDetail,
  setCharDetail,
  setPageAlert,
  loading,
  setLoading,
  chuckError,
}) {
  const buyPharma = async (item) => {
    setLoading(true);
    const bankObj = {
      charID: charDetail.id,
      newBank: Number(charDetail.bank - item.price),
    };
    if (charDetail.bank >= item.price && charGear.pharma.filter((e) => e.pharma_master_id === item.pharma_master_id).length > 0) {
      const ownedPharma = charGear.pharma.filter((e) => e.pharma_master_id === item.pharma_master_id)[0];
      const gearObj = {
        type: 'Pharma',
        gearID: ownedPharma.char_pharma_bridge_id,
        qty_owned: ownedPharma.qty_owned + 1,
      };
      let bankResult = await charChangeBankRequest(bankObj);
      let shopResult = await charChangeGearQtyRequest(gearObj);
      if (bankResult === 'OK' && shopResult === 'OK') {
        setCharGear({
          ...charGear,
          pharma: charGear.pharma.map((e) =>
            e.char_pharma_bridge_id === ownedPharma.char_pharma_bridge_id ? { ...e, qty_owned: e.qty_owned + 1 } : e
          ),
        });
        setCharDetail({ ...charDetail, bank: bankObj.newBank });
        setPageAlert({ open: true, message: 'Item purchased!', severity: 'success' });
      } else {
        chuckError();
      }
    } else if (charDetail.bank >= item.price && charGear.pharma.filter((e) => e.pharma_master_id === item.pharma_master_id).length <= 0) {
      const gearObj = {
        type: 'Pharma',
        charID: charDetail.id,
        gearID: item.pharma_master_id,
      };
      let bankResult = await charChangeBankRequest(bankObj);
      let shopResult = await charPurchaseGearRequest(gearObj);
      if (bankResult === 'OK' && shopResult.pharma_master_id) {
        setCharGear({ ...charGear, pharma: [...charGear.pharma, shopResult] });
        setCharDetail({ ...charDetail, bank: bankObj.newBank });
        setPageAlert({ open: true, message: 'Item purchased!', severity: 'success' });
      } else {
        chuckError();
      }
    } else {
      setPageAlert({ open: true, message: 'Insufficient Funds!', severity: 'error' });
    }
    setLoading(false);
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

  // sort and monitor changes.
  const sortedPharmaMasterRows = React.useMemo(() => stableSort(masterPharma, getComparator(order, orderBy)), [order, orderBy, masterPharma]);

  return (
    <>
      <h2>Buy Pharmaceuticals</h2>
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
                {sortedPharmaMasterRows.map((row) => {
                  if (row.rank < 3) {
                    return (
                      <TableRow hover key={row.name}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">{moneyMaker(row.price)}</TableCell>
                        <TableCell align="center">
                          <Button variant={loading === false ? 'contained' : 'disabled'} color="success" onClick={() => buyPharma(row)}>
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
