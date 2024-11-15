import React from 'react';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../GeneralAssets/tableFuncs.service';

export default function GMGiveArmor({ charDetail, armorMaster, giveCharacterGear }) {
  const euroBuck = `\u20AC$`;

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('price');
  const sortedMasterArmorRows = React.useMemo(() => stableSort(armorMaster, getComparator(order, orderBy)), [order, orderBy, armorMaster]);

  return (
    <>
      <h2>Give {charDetail.handle} Armor</h2>

      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
              <EnhancedTableHead
                headCells={headCellsGenerator(['name', 'quality', 'description', 'price', 'give'])}
                order={order}
                orderBy={orderBy}
                setOrder={setOrder}
                setOrderBy={setOrderBy}
              />
              <TableBody>
                {sortedMasterArmorRows.map((row) => {
                  return (
                    <TableRow hover key={row.armor_master_id} sx={row.is_shield ? { backgroundColor: 'darkgreen' } : {}}>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.quality}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">
                        {euroBuck}
                        {row.price.toLocaleString('en-US')}
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          disabled={row.name === 'No Armor'}
                          onClick={() => giveCharacterGear({ type: 'armor', data: row.armor_master_id, charID: charDetail.id })}
                        >
                          Give
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
