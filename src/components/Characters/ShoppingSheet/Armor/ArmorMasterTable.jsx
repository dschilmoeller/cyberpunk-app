import React from 'react';
import { Box, Paper, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material/';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../../GeneralAssets/tableFuncs.service';
import { charChangeBankRequest, charPurchaseGearRequest } from '../../../../services/shopping.services';
export default function ArmorMasterTable({
  masterArmor,
  charGear,
  setCharGear,
  charDetail,
  setCharDetail,
  setPageAlert,
  loading,
  setLoading,
  chuckError,
}) {
  const euroBuck = `\u20AC$`;

  const buyArmor = async (item) => {
    setLoading(true);
    if (charDetail.bank >= item.price) {
      const bankObj = {
        charID: charDetail.id,
        newBank: Number(charDetail.bank - item.price),
      };
      const gearObj = {
        type: 'Armor',
        charID: charDetail.id,
        gearID: item.armor_master_id,
      };
      try {
        let bankResult = await charChangeBankRequest(bankObj);
        let shopResult = await charPurchaseGearRequest(gearObj);
        if (bankResult === 'OK' && shopResult.armor_bridge_id) {
          setCharGear({ ...charGear, armor: [...charGear.armor, shopResult] });
          setCharDetail({ ...charDetail, bank: bankObj.newBank });
          setPageAlert({ open: true, message: 'Item purchased!', severity: 'success' });
        } else {
          chuckError();
        }
      } catch (error) {
        console.error('Error purchasing gear:', error);
        chuckError();
      }
    } else {
      setPageAlert({ open: true, message: 'Insufficient Funds!', severity: 'error' });
    }
    setLoading(false);
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

  const sortedMasterArmorRows = React.useMemo(() => stableSort(masterArmor, getComparator(order, orderBy)), [order, orderBy, masterArmor]);

  return (
    <>
      <h2>Buy Armor</h2>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'quality', 'description', 'price', 'buy'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />

              <TableBody>
                {sortedMasterArmorRows.map((row) => {
                  return (
                    <TableRow hover key={row.armor_master_id}>
                      <TableCell padding={'normal'}>{row.name}</TableCell>
                      <TableCell align="center">{row.quality}</TableCell>
                      <TableCell align="center">{row.description}</TableCell>
                      <TableCell align="center" style={{ width: '10%' }}>
                        {euroBuck}
                        {row.price.toLocaleString('en-US')}
                      </TableCell>
                      <TableCell align="center">
                        <Button variant={loading ? 'disabled' : 'contained'} color="success" onClick={() => buyArmor(row)}>
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
