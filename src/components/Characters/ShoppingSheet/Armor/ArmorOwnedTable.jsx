import React from 'react';
import { Box, Paper, Button, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material/';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../../GeneralAssets/tableFuncs.service';
import { charChangeBankRequest, charSellGearRequest } from '../../../../services/shopping.services';

export default function ArmorOwnedTable({ charGear, setCharGear, charDetail, setCharDetail, setPageAlert, chuckError }) {
  const euroBuck = `\u20AC$`;

  const sellArmor = async (item) => {
    let newBank = Number(charDetail.bank + Math.floor(item.price / 4));
    const bankObj = {
      charID: charDetail.id,
      newBank: newBank,
    };
    const itemObj = {
      type: 'Armor',
      gearID: item.armor_bridge_id,
    };
    try {
      let bankResult = await charChangeBankRequest(bankObj);
      let sellResult = await charSellGearRequest(itemObj);
      if (bankResult === 'OK' && sellResult === 'OK') {
        setCharGear({ ...charGear, armor: charGear.armor.filter((e) => e.armor_bridge_id != item.armor_bridge_id) });
        setCharDetail({ ...charDetail, bank: newBank });
        setPageAlert({ open: true, message: 'Armor Sold!', severity: 'success' });
      } else {
        chuckError();
      }
    } catch (error) {
      console.error('Error selling armor:', error);
      setPageAlert({ open: true, message: 'Error selling armor!', severity: 'error' });
    }
  };

  const equipArmor = (incomingArmor) => {
    characterArmor.map((armor) => {
      if (armor.equipped === true) {
        unequipArmor(armor);
      }
    });
    // see equip routes - this one will have all the previous incidences. Refactor that first.
  };

  const unequipArmor = (incomingArmor) => {
    // see equip routes
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');

  const sortedCharArmorRows = React.useMemo(() => stableSort(charGear.armor, getComparator(order, orderBy)), [order, orderBy, charGear.armor]);

  return (
    <>
      <h2>Worn Armor</h2>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Quality</TableCell>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Unequip</TableCell>
                  <TableCell align="center">Street Price</TableCell>
                  <TableCell align="center">Sell</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedCharArmorRows.map((row) => {
                  if (row.equipped === true) {
                    return (
                      <TableRow hover key={row.armor_bridge_id}>
                        <TableCell align="center">{row.name}</TableCell>
                        <TableCell align="center">{row.quality}</TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">
                          <Button color="secondary" onClick={() => unequipArmor(row)}>
                            Unequip
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          {euroBuck}
                          {Math.floor(row.price / 4).toLocaleString('en-US')}
                        </TableCell>
                        <TableCell align="center">
                          <Button color="error" onClick={() => sellArmor(row)}>
                            Sell
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

      <h2>My Armor / Shields</h2>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'quality', 'description', 'equip', 'price', 'sell'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />
              <TableBody>
                {sortedCharArmorRows.map((row) => {
                  if (row.equipped === false) {
                    return (
                      <TableRow hover key={row.armor_bridge_id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell align="center">{row.quality}</TableCell>
                        <TableCell align="center">{row.description}</TableCell>
                        <TableCell align="center">
                          <Button color="info" onClick={() => equipArmor(row)}>
                            Equip
                          </Button>
                        </TableCell>
                        <TableCell align="center">
                          {euroBuck}
                          {Math.floor(row.price / 4).toLocaleString('en-US')}
                        </TableCell>
                        <TableCell align="center">
                          <Button color="error" onClick={() => sellArmor(row)}>
                            Sell
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
