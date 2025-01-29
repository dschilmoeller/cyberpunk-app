import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Grid, Tabs, Tab } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material/';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../GeneralAssets/tableFuncs.service';
import { updateCharacterRequest, createPharmaceuticalRequest, updatePharmaQtyRequest, fetchCharPharmaRequest } from './Equip.services';

export default function AdvancementPharma({ equipCharDetails, setEquipCharDetails, masterGear, charGear, setCharGear, setPageAlert, chuckError }) {
  const [selectedPharma, setSelectedPharma] = useState('None Selected');
  const [pharmReagentCost, setPharmReagentCost] = useState(0);
  const [dosesToMake, setDosesToMake] = useState(1);
  const [loading, setLoading] = useState(false);

  const setPharma = (pharm) => {
    setSelectedPharma(pharm);
    setPharmReagentCost(pharm.price / 2);
  };

  // first check that a pharmaceutical has been selected,
  // the doses to create is a whole, positive number,
  // and the character has sufficient funds.
  // if all that checks out, reduce character's funds appropriately, then move on.

  const createPharma = async () => {
    setLoading(true);
    if (selectedPharma === 'None Selected') {
      setPageAlert({ open: true, message: 'Please select a pharmaceutical to craft!', severity: 'error' });
    } else if (dosesToMake < 1 || dosesToMake % 1 != 0 || dosesToMake === null) {
      setPageAlert({ open: true, message: 'Please select a postive, whole number of doses to make!', severity: 'error' });
    } else if (equipCharDetails.bank < pharmReagentCost) {
      setPageAlert({ open: true, message: 'Insufficient Funds!', severity: 'error' });
    } else if (pharmReagentCost < 0 || pharmReagentCost % 1 != 0 || pharmReagentCost === null) {
      setPageAlert({ open: true, message: 'Nice try.', severity: 'error' });
    } else if (equipCharDetails.bank >= pharmReagentCost) {
      let statObj = {
        charID: equipCharDetails.id,
        statName: 'bank',
        newRank: equipCharDetails.bank - pharmReagentCost,
      };
      let charObj = { charID: equipCharDetails.id };
      try {
        let bankResult = await updateCharacterRequest(statObj);
        let result = '';

        if (charGear.pharma.filter((e) => e.pharma_master_id === selectedPharma.pharma_master_id).length > 0) {
          let pharmUpdateObj = {
            char_pharma_bridge_id: charGear.pharma.filter((e) => e.pharma_master_id === selectedPharma.pharma_master_id)[0].char_pharma_bridge_id,
            qty_owned: charGear.pharma.filter((e) => e.pharma_master_id === selectedPharma.pharma_master_id)[0].qty_owned + dosesToMake,
          };
          try {
            result = await updatePharmaQtyRequest(pharmUpdateObj);
          } catch (error) {
            console.error('Error updating pharma qty:', error);
            setPageAlert({ open: true, message: 'Error increasing owned pharma count', severity: 'error' });
          }
        } else {
          // new entry
          const pharmaObj = {
            charID: equipCharDetails.id,
            pharma_master_id: selectedPharma.pharma_master_id,
            doses: dosesToMake,
          };
          try {
            result = await createPharmaceuticalRequest(pharmaObj);
          } catch (error) {
            console.error('Error creating new pharmaceutical:', error);
            setPageAlert({ open: true, message: 'Error creating new pharmaceutical', severity: 'error' });
          }
        }

        if (bankResult === 'OK' && result === 'OK') {
          setEquipCharDetails({ ...equipCharDetails, bank: equipCharDetails.bank - pharmReagentCost });
          setPageAlert({ open: true, message: 'Pharmaceuticals Crafted!', severity: 'success' });
          let charPharma = await fetchCharPharmaRequest(charObj);
          console.log(`result char pharma:`, charPharma);
          await setCharGear({ ...charGear, pharma: charPharma });
        } else {
          chuckError();
        }
      } catch (error) {
        console.error('Error creating Pharma:', error);
        setPageAlert({ open: true, message: 'Error generating pharmaceuticals!', severity: 'error' });
      }
      setDosesToMake(0);
      setSelectedPharma('None Selected');
      setPharmReagentCost(0);
    } else {
      chuckError();
    }
    setLoading(false);
  };

  // sortable table reqs.
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  const sortedPharma = React.useMemo(() => stableSort(charGear.pharma, getComparator(order, orderBy)), [order, orderBy, charGear]);

  // Tab Handlers
  const [value, setValue] = useState('owned');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs value={value} onChange={handleChange} centered indicatorColor="primary" textColor="secondary">
        <Tab value="owned" label="Owned" />
        {<Tab disabled={equipCharDetails.med_pharma > 0 ? false : true} value="create" label="Create" />}
      </Tabs>

      {value === 'owned' ? (
        <>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
                  <EnhancedTableHead
                    headCells={headCellsGenerator(['name', 'description', 'rank', 'owned'])}
                    order={order}
                    orderBy={orderBy}
                    setOrder={setOrder}
                    setOrderBy={setOrderBy}
                  />
                  <TableBody>
                    {sortedPharma.map((row) => {
                      if (row.qty_owned > 0) {
                        return (
                          <TableRow hover key={row.char_pharma_bridge_id}>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.description}</TableCell>
                            <TableCell align="left">{row.rank}</TableCell>
                            <TableCell align="left">{row.qty_owned}</TableCell>
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
      ) : (
        <></>
      )}

      {value === 'create' ? (
        <>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <Grid container padding={1}>
              <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                <h2>
                  Create Pharmaceuticals: Intelligence ({equipCharDetails.intelligence + equipCharDetails.cyber_intelligence}) + Pharmaceuticals (
                  {equipCharDetails.med_pharma})
                </h2>
              </Grid>
              <Grid display={'flex'} justifyContent={'center'} item xs={4}>
                Selected Pharmaceutical: {selectedPharma.name}
              </Grid>
              <Grid display={'flex'} justifyContent={'center'} item xs={4}>
                Quantity to make:
                <TextField
                  label="Doses To Create"
                  onChange={(e) => setDosesToMake(Number(e.target.value))}
                  required
                  autoFocus
                  type="number"
                  value={dosesToMake}
                  fullWidth
                />
              </Grid>
              <Grid display={'flex'} justifyContent={'center'} item xs={4}>
                <TextField
                  label="Pharma Reagent Cost"
                  onChange={(e) => setPharmReagentCost(Number(e.target.value))}
                  required
                  type="number"
                  value={pharmReagentCost}
                  fullWidth
                ></TextField>
              </Grid>
              <Grid display={'flex'} justifyContent={'center'} item padding={2} xs={12}>
                <Button
                  variant={selectedPharma != 'None Selected' ? 'contained' : 'disabled'}
                  disabled={loading}
                  color="info"
                  size="large"
                  onClick={() => createPharma()}
                >
                  Craft Pharmaceuticals
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Rank</TableCell>
                      <TableCell>Select</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {masterGear.pharma.map((row) => {
                      if (equipCharDetails.med_pharma >= row.rank) {
                        return (
                          <TableRow hover key={row.pharma_master_id}>
                            <TableCell sx={{ minWidth: 150 }}>{row.name}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.rank}</TableCell>
                            <TableCell>
                              <Button disabled={loading} onClick={() => setPharma(row)}>
                                Select
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
      ) : (
        <></>
      )}
    </>
  );
}
