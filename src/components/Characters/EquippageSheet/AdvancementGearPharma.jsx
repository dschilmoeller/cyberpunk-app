import React, { useState } from 'react';
import { TextField, Button, Box, Paper, Grid, Tabs, Tab } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material/';
import { getComparator, stableSort, EnhancedTableHead, headCellsGenerator } from '../../GeneralAssets/tableFuncs.service';
import { updateCharacterRequest, createPharmaceuticalRequest, fetchCharPharmaRequest } from './Equip.services';

// TODO : allow reagent cost to be customized.
// TODO : pharma products to have quantity rather than individual entries. Similar to Grenades.

export default function AdvancementPharma({
  equipCharDetails,
  setEquipCharDetails,
  masterGear,
  charGear,
  setCharGear,
  loading,
  setLoading,
  setPageAlert,
  chuckError,
}) {
  // State does what it says on the tin.
  const [selectedPharma, setSelectedPharma] = useState('None Selected');
  const [pharmReagentCost, setPharmReagentCost] = useState(0);
  const [dosesToMake, setDosesToMake] = useState('');

  const setPharma = (pharm) => {
    setSelectedPharma(pharm);
    setPharmReagentCost(pharm.price / 2);
  };

  // first check that a pharmaceutical has been selected, the doses to create is a whole, positive number, and the character has sufficient funds.
  // if all that checks out, reduce character's funds appropriately, then loop through and create pharma entries.

  const createPharma = async () => {
    setLoading(true);
    if (selectedPharma === 'None Selected') {
      setPageAlert({ open: true, message: 'Please select a pharmaceutical to craft!', severity: 'error' });
    } else if (dosesToMake <= 0 || dosesToMake % 1 != 0) {
      setPageAlert({ open: true, message: 'Please select a postive, whole number of doses to make!', severity: 'error' });
    } else if (equipCharDetails.bank < pharmReagentCost) {
      setPageAlert({ open: true, message: 'Insufficient Funds!', severity: 'error' });
    } else if (equipCharDetails.bank >= pharmReagentCost) {
      let statObj = {
        charID: equipCharDetails.id,
        statName: 'bank',
        newRank: equipCharDetails.bank - pharmReagentCost,
      };
      let pharmaObj = {
        charID: equipCharDetails.id,
        pharma_master_id: selectedPharma.pharma_master_id,
      };
      let charObj = { charID: equipCharDetails.id };
      try {
        let bankResult = await updateCharacterRequest(statObj);

        for (let i = 1; i <= dosesToMake; i++) {
          try {
            await createPharmaceuticalRequest(pharmaObj);
          } catch (error) {
            console.error('Error creating pharmaceutical:', error);
          }
        }
        if (bankResult === 'OK') {
          setEquipCharDetails({ ...equipCharDetails, bank: equipCharDetails.bank - pharmReagentCost });
          let charPharma = await fetchCharPharmaRequest(charObj);
          setCharGear({ ...charGear, pharma: charPharma });
        } else {
          chuckError();
        }
      } catch (error) {
        console.error('Error creating Pharma:', error);
        setPageAlert({ open: true, message: 'Error generating pharmaceuticals!', severity: 'error' });
      }
      setDosesToMake('');
      setSelectedPharma('None Selected');
      setPharmReagentCost(0);
      setLoading(false);
    } else {
      chuckError();
    }
  };

  // sortable table reqs.
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  const sortedPharma = React.useMemo(() => stableSort(charGear.pharma, getComparator(order, orderBy)), [order, orderBy]);

  // Tab Handlers
  const [value, setValue] = useState('owned');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs value={value} onChange={handleChange} centered indicatorColor="primary" textColor="secondary">
        <Tab value="owned" label="Owned" />
        {equipCharDetails.med_pharma > 0 ? <Tab value="create" label="Create" /> : <Tab disabled value="create" label="Create" />}
      </Tabs>

      {value === 'owned' && !loading ? (
        <>
          <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={'small'}>
                  <EnhancedTableHead
                    headCells={headCellsGenerator(['name', 'description', 'rank', 'Owned'])}
                    order={order}
                    orderBy={orderBy}
                    setOrder={setOrder}
                    setOrderBy={setOrderBy}
                  />
                  <TableBody>
                    {sortedPharma.map((row) => {
                      return (
                        <TableRow hover key={row.char_pharma_bridge_id}>
                          <TableCell align="left">{row.name}</TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="left">{row.rank}</TableCell>
                          <TableCell align="left">{row.qty_owned}</TableCell>
                        </TableRow>
                      );
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

      {value === 'create' && !loading ? (
        <>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <Grid container padding={1}>
              <Grid item xs={12} display={'flex'} justifyContent={'center'}>
                <h2>
                  Create Pharmaceuticals: Intelligence ({equipCharDetails.intelligence}) + Pharmaceuticals ({equipCharDetails.med_pharma})
                </h2>
              </Grid>
              <Grid display={'flex'} justifyContent={'center'} item xs={4}>
                Selected Pharmaceutical: {selectedPharma.name}
              </Grid>
              <Grid display={'flex'} justifyContent={'center'} item xs={4}>
                Quantity to make:
                <TextField
                  label="Doses To Create"
                  onChange={(e) => setDosesToMake(e.target.value)}
                  required
                  autoFocus
                  type="number"
                  value={dosesToMake}
                  fullWidth
                />
              </Grid>
              <Grid display={'flex'} justifyContent={'center'} item xs={4}>
                Reagent Cost: {pharmReagentCost}
              </Grid>
              <Grid display={'flex'} justifyContent={'center'} item padding={2} xs={12}>
                {selectedPharma != 'None Selected' ? (
                  <Button variant="contained" disabled={loading} color="info" size="large" onClick={() => createPharma()}>
                    Craft Pharmaceuticals
                  </Button>
                ) : (
                  <Button variant="disabled" color="info" size="large">
                    Craft Pharmaceuticals
                  </Button>
                )}
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
