import React from 'react';
import { Box, Paper, Button, Table, TableBody, TableCell, TableContainer, TableRow, TableHead } from '@mui/material/';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../../GeneralAssets/tableFuncs.service';
import { charChangeBankRequest, charSellGearRequest } from '../../../../services/shopping.services';
import { updateArmorStatusRequest } from '../../../../services/equip.services';

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

  async function changeArmorEquip(incomingArmor) {
    // setLoading(true);
    const armor = charGear.armor;
    // case 1 - equipping armor
    for (let i = 0; i < armor.length; i++) {
      // find and unequip any other of same armor type
      if (
        (armor[i].equipped === true && armor[i].is_shield === incomingArmor.is_shield) ||
        armor[i].armor_bridge_id === incomingArmor.armor_bridge_id
      ) {
        const armorObj = {
          this_armor_loss: armor[i].this_armor_loss,
          equipped: armor[i].equipped === true ? false : true,
          armor_bridge_id: armor[i].armor_bridge_id,
        };
        try {
          const result = await updateArmorStatusRequest(armorObj);
          if (result === 'OK') {
            setCharGear({
              ...charGear,
              armor: charGear.armor.map((e) =>
                e.armor_bridge_id === incomingArmor.armor_bridge_id
                  ? { ...e, equipped: !e.equipped }
                  : e.is_shield === incomingArmor.is_shield
                    ? { ...e, equipped: false }
                    : e
              ),
            });
          }
        } catch (error) {
          console.error('Error equipping armor:', error);
          chuckError();
        }
      }
    }
    // setLoading(false);
    // const charObj = { charID: equipCharDetails.id };
    // let charArmorResult = await fetchCharArmorRequest(charObj);
    // setCharGear({ ...charGear, armor: charArmorResult });
    // setLoading(false);
  }

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
                          <Button color="secondary" onClick={() => changeArmorEquip(row)}>
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
                          <Button color="info" onClick={() => changeArmorEquip(row)}>
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
