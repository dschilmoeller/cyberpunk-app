import * as React from 'react';
import { TextField, Button, Table, TableBody, TableCell, TableContainer, TableRow, Grid, Typography } from '@mui/material';

import Item from '../Item';
import CharacterSheetHeaderDialog from '../Modals/CharacterSheetHeaderDialog';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator, handleRequestSort } from '../../../GeneralAssets/tableFuncs.service';
import { inPlayUseConsumable, inPlayBankChange } from '../character.services';

export default function Backpack({ charDetail, setCharDetail, charMiscGear, setCharMiscGear, loading, setLoading, chuckError, setPageAlert }) {
  const euroBuck = `\u20AC$`;

  const UseConsumable = async (stuff, isFood) => {
    setLoading(true);
    const miscObj = {
      char_gear_bridge_id: stuff.char_gear_bridge_id,
    };
    try {
      let result = await inPlayUseConsumable(miscObj);
      if (result === 'OK') {
        setCharMiscGear(charMiscGear.filter((e) => e.char_gear_bridge_id != stuff.char_gear_bridge_id));
        if (isFood) {
          setPageAlert({ open: true, message: 'YUM!', type: 'success' });
        } else {
          setPageAlert({ open: true, message: 'Item used', type: 'success' });
        }
      } else {
        chuckError();
      }
    } catch (error) {
      console.error('Error using consumable:', error);
      chuckError();
    }
    setLoading(false);
  };

  // arbitrary money changes:
  const [bankChange, setBankChange] = React.useState(0);

  const changeMoney = async (change, add) => {
    setLoading(true);
    // turn change absolute, then pos/neg - this will mean adding/subtracting the absolute value,
    // which can be weird if using negative numbers, but the players shouldn't be pulling that shite anyhow.
    if (add === true) {
      change = Math.abs(parseFloat(change));
    } else {
      change = -Math.abs(parseFloat(change));
    }
    const bankObj = {
      charID: charDetail.id,
      bank: parseFloat(charDetail.bank) + change,
    };
    // if adding, limit change to 10000 at a time. Why? 'Cause
    // if removing, cannot remove more than one has. Also if they do some nonsense that results in a positive number (or negative for adding)
    // then call them on it.
    if ((add === true && change > 0 && change < 10001) || (add === false && Math.abs(change) <= charDetail.bank && change < 0)) {
      try {
        let result = await inPlayBankChange(bankObj);
        if (result === 'OK') {
          setCharDetail({
            ...charDetail,
            bank: charDetail.bank + change,
          });
          setPageAlert({ open: true, message: 'Cha-Ching!', severity: 'success' });
          setBankChange(0);
        } else {
          chuckError();
        }
      } catch (error) {
        console.error('Error', error);
        chuckError();
      }
    } else {
      setPageAlert({ open: true, message: 'Nice try.', severity: 'error' });
    }
    setLoading(false);
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const sortedcharMiscGearRows = React.useMemo(() => stableSort(charMiscGear, getComparator(order, orderBy)), [order, orderBy, charMiscGear]);

  return (
    <>
      <Grid container>
        <Grid item xs={12} paddingBottom={4}>
          <Item>
            <CharacterSheetHeaderDialog prop={'Backpack'} />
          </Item>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={6} display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Typography variant="h4">
            Bank: {euroBuck}
            {charDetail.bank.toLocaleString('en-US')}
          </Typography>
        </Grid>

        <Grid item xs={2} display={'flex'} justifyContent={'center'}>
          <Button variant={loading === false ? 'contained' : 'disabled'} color="error" fullWidth onClick={() => changeMoney(bankChange, false)}>
            Spend Eddies
          </Button>
        </Grid>

        <Grid item xs={2} display={'flex'} justifyContent={'center'}>
          <TextField label="Add/Remove Amount" onChange={(e) => setBankChange(e.target.value)} required type="number" value={bankChange} fullWidth />
        </Grid>

        <Grid item xs={2} display={'flex'} justifyContent={'center'}>
          <Button variant={loading === false ? 'contained' : 'disabled'} color="success" fullWidth onClick={() => changeMoney(bankChange, true)}>
            Gain Eddies
          </Button>
        </Grid>
      </Grid>

      <TableContainer>
        <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
          <EnhancedTableHead
            headCells={headCellsGenerator(['name', 'description', 'consume'])}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            setOrder={setOrder}
            setOrderBy={setOrderBy}
          />
          <TableBody>
            {sortedcharMiscGearRows.map((row, i) => {
              return (
                <TableRow hover key={i}>
                  <TableCell padding="normal">{row.name}</TableCell>
                  <TableCell padding="normal">{row.description}</TableCell>
                  <TableCell align="center" padding="normal">
                    {row.name === 'MRE' || row.name === 'Food Stick' || row.name === 'Kibble Pack' ? (
                      <Button disabled={loading} fullWidth onClick={() => UseConsumable(row, true)}>
                        Eat
                      </Button>
                    ) : row.name === 'Personal CarePak' ||
                      row.name === 'Vial of deadly poison' ||
                      row.name === 'Vial of biotoxin' ||
                      row.name === 'Glow Paint' ||
                      row.name === 'Glow Stick' ||
                      row.name === 'Memory Chip' ||
                      row.name === 'Road Flare' ||
                      row.name === 'Antibiotic' ||
                      row.name === 'Rapi-Detox' ||
                      row.name === 'Speedheal' ||
                      row.name === 'Stim' ||
                      row.name === 'Surge' ||
                      row.name === 'Hotel Soap' ? (
                      <Button disabled={loading} fullWidth onClick={() => UseConsumable(row, false)}>
                        Use
                      </Button>
                    ) : (
                      <></>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
