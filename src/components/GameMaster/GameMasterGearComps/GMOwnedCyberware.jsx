import React, { useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Grid, Tabs, Tab } from '@mui/material';
// import Item from '../../Characters/CharacterSheet/Item';

// import Switch from '@mui/material/Switch';
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';

export default function GMOwnedCyberware({ charDetail, charCyberware, deleteCharacterGear }) {
  const euroBuck = `\u20AC$`;

  const [selectedList, setSelectedList] = useState('fashionware');
  const handleTabChange = (event, newValue) => {
    setSelectedList(newValue);
  };

  // const [allowDeleteEquipped, setAllowDeleteEquipped] = useState(false);

  return (
    <>
      <Tabs value={selectedList} onChange={handleTabChange} indicatorColor="primary" textColor="secondary">
        <Tab value="fashionware" label="Fashionware" />
        <Tab value="neuralware" label="Neuralware" />
        <Tab value="cyberoptics" label="Cyberoptics" />
        <Tab value="cyberaudio" label="Cyberaudio" />
        <Tab value="internalware" label="Internalware" />
        <Tab value="externalware" label="Externalware" />
        <Tab value="cyberarm" label="Cyberarm" />
        <Tab value="cyberleg" label="Cyberleg" />
        <Tab value="borgware" label="Borgware (Beta)" />
      </Tabs>

      <Grid container>
        <Grid item xs={12}>
          <h2>{charDetail.handle}&apos;s Cyberware</h2>
        </Grid>
        {/* <Grid item xs={12}>
          <Item>
            Note: This will restore permanent humanity losses. It will not alter slot counts, armor, or health; removing equipped cyberware is NOT
            recommended.
          </Item>
        </Grid> */}
        {/* <Grid item xs={12}>
          <Item>
            <FormGroup sx={{ position: 'flex', alignItems: 'center' }}>
              <FormControlLabel
                control={<Switch checked={allowDeleteEquipped} onChange={(e) => setAllowDeleteEquipped(e.target.checked)} />}
                label="Allow Deleting Equipped Cyberware"
              />
            </FormGroup>
          </Item>
        </Grid> */}
      </Grid>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow hover>
              <TableCell align="left">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Humanity Cost</TableCell>
              <TableCell align="center">Install Requirement</TableCell>
              <TableCell align="center">Street Price</TableCell>
              <TableCell align="center">Equipped</TableCell>
              <TableCell align="center">Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {charCyberware.map((item) => {
              if (item.type === selectedList && item.equipped === false) {
                {
                  /* || (item.type === selectedList && allowDeleteEquipped === true) */
                }
                return (
                  <React.Fragment key={item.owned_cyberware_id}>
                    <TableRow hover>
                      <TableCell align="left">{item.name} </TableCell>
                      <TableCell align="center">{item.description}</TableCell>
                      <TableCell align="center">
                        {item.humanity_loss_min} - {item.humanity_loss_max}
                      </TableCell>
                      <TableCell align="center">{item.install_level}</TableCell>
                      <TableCell align="center">
                        {euroBuck}
                        {Math.floor(item.price / 4).toLocaleString('en-US')}
                      </TableCell>
                      <TableCell align="center">{item.equipped ? 'Y' : 'N'}</TableCell>
                      <TableCell align="center">
                        <Button onClick={() => deleteCharacterGear({ type: 'cyberware', data: item.owned_cyberware_id })}>Remove</Button>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              }
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
