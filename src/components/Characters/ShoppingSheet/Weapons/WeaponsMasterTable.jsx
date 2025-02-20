import React from 'react';
import { Box, Paper, Button, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material/';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../../GeneralAssets/tableFuncs.service';
import { charChangeBankRequest, charPurchaseGearRequest } from '../../../../services/shopping.services';
import { moneyMaker } from '../../../../utils/funcs/funcs';
import WeaponDialog from '../../../Modals/WeaponDialog';

export default function WeaponsMasterTable({
  masterWeapons,
  charGear,
  setCharGear,
  charDetail,
  setCharDetail,
  setPageAlert,
  loading,
  setLoading,
  chuckError,
}) {
  console.log(`master weapons:`, masterWeapons);

  const buyWeapon = async (item) => {
    setLoading(true);
    if (charDetail.bank >= item.price) {
      const bankObj = {
        charID: charDetail.id,
        newBank: Number(charDetail.bank - item.price),
      };
      const gearObj = {
        type: 'Weapon',
        charID: charDetail.id,
        gearID: item.weapon_master_id,
      };
      try {
        let bankResult = await charChangeBankRequest(bankObj);
        let shopResult = await charPurchaseGearRequest(gearObj);
        if (bankResult === 'OK' && shopResult.weapon_master_id) {
          setCharGear({ ...charGear, weapons: [...charGear.weapons, shopResult] });
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

  function createMasterWeaponData(
    concealable,
    damage,
    description,
    dmg_type,
    hands,
    is_treasure,
    max_clip,
    name,
    price,
    range,
    rof,
    weapon_master_id
  ) {
    return {
      concealable,
      damage,
      description,
      dmg_type,
      hands,
      is_treasure,
      max_clip,
      name,
      price,
      range,
      rof,
      weapon_master_id,
    };
  }

  // take weaponMaster data and push into array for conversion into rows.
  const weaponMasterRows = [];
  for (let i = 0; i < masterWeapons.length; i++) {
    let damage = 0;
    let range = 0;

    // precalculate strength based damage
    if (masterWeapons[i].dmg_type === 'melee' || masterWeapons[i].dmg_type === 'bow') {
      damage = charDetail.strength + charDetail.cyber_strength + masterWeapons[i].damage;
    } else {
      damage = masterWeapons[i].damage;
    }
    // precalculate strength based range
    if (masterWeapons[i].dmg_type === 'bow') {
      range = (charDetail.strength + charDetail.cyber_strength) * masterWeapons[i].range;
    } else {
      range = masterWeapons[i].range;
    }
    // return finalized weapon data (allows range and damage to sort properly)
    weaponMasterRows.push(
      createMasterWeaponData(
        masterWeapons[i].concealable,
        damage,
        masterWeapons[i].description,
        masterWeapons[i].dmg_type,
        masterWeapons[i].hands,
        masterWeapons[i].is_treasure,
        masterWeapons[i].max_clip,
        masterWeapons[i].name,
        masterWeapons[i].price,
        range,
        masterWeapons[i].rof,
        masterWeapons[i].weapon_master_id
      )
    );
  }

  // sort and monitor changes.
  const sortedWeaponMasterRows = React.useMemo(() => stableSort(weaponMasterRows, getComparator(order, orderBy)), [order, orderBy, weaponMasterRows]);

  return (
    <>
      <h2>Buy Weapons</h2>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'damage', 'range', 'rof', 'max_clip', 'hands', 'concealable', 'price', 'purchase'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />
              <TableBody>
                {sortedWeaponMasterRows.map((row) => {
                  if (row.is_treasure === false) {
                    return (
                      <TableRow hover key={row.name}>
                        <TableCell>
                          <WeaponDialog prop={row.name} />
                        </TableCell>
                        <TableCell align="center">{row.damage}</TableCell>
                        <TableCell align="center">{row.range}</TableCell>
                        <TableCell align="center">{row.rof}</TableCell>
                        <TableCell align="center">{row.max_clip}</TableCell>
                        <TableCell align="center">{row.hands}</TableCell>
                        <TableCell align="center">{row.concealable === true ? 'Yes' : 'No'}</TableCell>
                        <TableCell align="center">{moneyMaker(row.price)}</TableCell>
                        <TableCell align="center">
                          <Button variant={loading === false ? 'contained' : 'disabled'} color="success" onClick={() => buyWeapon(row)}>
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
